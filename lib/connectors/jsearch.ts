import { parseRelativeDate } from './utils';
import { ParsedJob } from './types';

/**
 * JSearch API connector via RapidAPI.
 * Aggregates job listings from Google for Jobs (which indexes Indeed, LinkedIn,
 * JobStreet, and hundreds of other boards) — bypasses all scraping blocks.
 *
 * The API key is stored per-user in the `integrations` table (service: 'rapidapi')
 * and passed in by the caller. Do NOT read from process.env here.
 *
 * Sign up: https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
 * Free tier: 200 requests/month (sufficient for personal use).
 */
export async function scrapeJSearch(
  keywords: string | string[],
  location: string = 'Philippines',
  apiKey: string,
  numPages: number = 1,
): Promise<ParsedJob[]> {
  // Use 'OR' logic for multiple keywords to maximize results
  const keywordQuery = Array.isArray(keywords)
    ? (keywords.length > 1 ? `(${keywords.join(' OR ')})` : keywords[0])
    : keywords;

  const query = location
    ? `${keywordQuery} in ${location}`
    : keywordQuery;

  const url = new URL('https://jsearch.p.rapidapi.com/search');
  url.searchParams.set('query', query);
  url.searchParams.set('num_pages', String(numPages));
  url.searchParams.set('date_posted', 'all');
  // Bias results toward PH by setting country code
  url.searchParams.set('country', 'ph');

  const res = await fetch(url.toString(), {
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'jsearch.p.rapidapi.com',
    },
  });

  if (!res.ok) {
    let bodyText = await res.text().catch(() => '');
    try {
      const parsed = JSON.parse(bodyText);
      if (parsed.message) bodyText = parsed.message;
    } catch {
      // ignore JSON parse error
    }
    throw new Error(`JSearch fetch failed: ${res.status} — ${bodyText.substring(0, 200)}`);
  }

  const data = await res.json();

  if (!Array.isArray(data?.data)) {
    throw new Error(`JSearch returned unexpected shape: ${JSON.stringify(data).substring(0, 200)}`);
  }

  interface JSearchJob {
    job_title?: string;
    employer_name?: string;
    job_apply_link?: string;
    job_google_link?: string;
    job_city?: string;
    job_country?: string;
    job_min_salary?: number;
    job_max_salary?: number;
    job_salary_currency?: string;
    job_salary_period?: string;
    job_description?: string;
    job_posted_at_datetime_utc?: string;
    job_posted_at_timestamp?: number;
  }

  return (data.data as JSearchJob[]).map((job) => ({
    title: job.job_title ?? 'Unknown Title',
    company: job.employer_name ?? 'Unknown Company',
    platform: 'jsearch' as const,
    url: job.job_apply_link ?? job.job_google_link ?? undefined,
    location: [job.job_city, job.job_country].filter(Boolean).join(', ') || undefined,
    salary:
      job.job_min_salary && job.job_max_salary
        ? `${job.job_salary_currency ?? 'PHP'} ${job.job_min_salary}–${job.job_max_salary} ${job.job_salary_period ?? ''}`
        : undefined,
    description: job.job_description?.substring(0, 500) ?? undefined,
    postedAt: parseRelativeDate(job.job_posted_at_datetime_utc) || 
              (job.job_posted_at_timestamp ? new Date(job.job_posted_at_timestamp * 1000).toISOString() : undefined),
  }));
}
