import { ParsedJob } from '@/lib/connectors/types';
import { jobRepository } from '@/lib/db/sqlite/jobs';
import { randomUUID } from 'crypto';

/**
 * Common ingestion logic that deduplicates jobs and inserts new ones.
 * Used by both manual scraping and background email ingestion.
 */
export async function ingestJobs(
  jobs: ParsedJob[]
): Promise<{ inserted: number; skipped: number }> {
  if (jobs.length === 0) return { inserted: 0, skipped: 0 };

  // 1. Fetch existing job keys to deduplicate
  const existing = await jobRepository.getJobs();
  const existingKeys = new Set(
    existing.map(j => `${j.title}|${j.company}|${j.platform}`)
  );

  // 2. Filter out already existing jobs
  const newJobs = jobs.filter(
    j => !existingKeys.has(`${j.title}|${j.company}|${j.platform}`)
  );

  if (newJobs.length > 0) {
    // 3. Move existing 'new' jobs to 'existing' status
    for (const job of existing) {
      if (job.status === 'new') {
        await jobRepository.updateJobStatus(job.id, 'existing');
      }
    }

    // 4. Create new jobs
    for (const j of newJobs) {
      await jobRepository.insertJob({
        id: randomUUID(),
        title: j.title,
        company: j.company,
        platform: j.platform,
        url: j.url || null,
        location: j.location || null,
        salary: j.salary || null,
        description: j.description || null,
        postedAt: j.postedAt || null,
        status: 'new'
      });
    }
  }

  return {
    inserted: newJobs.length,
    skipped: jobs.length - newJobs.length
  };
}
