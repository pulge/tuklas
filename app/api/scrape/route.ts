import { scrapeJobs } from '@/lib/connectors';
import { ingestJobs } from '@/lib/data/ingest-jobs';
import { NextResponse } from 'next/server';
import { logActivity } from '@/lib/logger';

export async function POST(req: Request) {
  try {
    const { keywords, location } = await req.json();

    if (!keywords || keywords.length === 0) {
      return NextResponse.json({ error: 'Keywords are required' }, { status: 400 });
    }

    // Use our refactored scrapeJobs helper which already resolves the API key
    const jobs = await scrapeJobs(keywords, location);

    const { inserted, skipped } = await ingestJobs(jobs);

    await logActivity({
      action: 'scrape',
      status: 'success',
      details: {
        keywords,
        location,
        found: jobs.length,
        inserted,
        skipped
      }
    });

    return NextResponse.json({
      inserted,
      total: jobs.length,
      skipped,
      details: [{ name: 'JSearch', count: jobs.length }],
      remaining: 'unmetered',
    });
  } catch (error: unknown) {
    console.error('Scrape error:', error);
    const msg = error instanceof Error ? error.message : 'Internal server error';

    await logActivity({
      action: 'scrape',
      status: 'error',
      details: { error: msg }
    });

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
