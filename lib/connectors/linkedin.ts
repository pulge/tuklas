import * as cheerio from 'cheerio';
import { CONNECTOR_API_VERSION, JobConnector, ParsedJob } from './types';

/**
 * LinkedIn Connector
 */
export const LinkedInConnector: JobConnector = {
  id: 'linkedin',
  name: 'LinkedIn',
  apiVersion: CONNECTOR_API_VERSION,
  version: '1.0.0',
  senderDomains: ['linkedin.com'],
  alertSetupGuide: 'Turn on "Job Alerts" in your LinkedIn settings and ensure they are sent to your synced Gmail inbox.',

  parseEmail(html: string): ParsedJob[] {
    const $ = cheerio.load(html);
    const jobs: ParsedJob[] = [];

    // LinkedIn alerts often use links with /jobs/view/ or /comm/jobs/view/
    $('a').each((_, el) => {
      const link = $(el);
      const text = link.text().trim();
      const href = link.attr('href') || '';

      if (href.includes('/jobs/view/') || href.includes('/comm/jobs/view/')) {
        // We only want links that look like titles (not "View all" or similar)
        if (text.length > 5 && !text.toLowerCase().includes('view')) {
          // LinkedIn emails usually have the company name in a following span or a specific sibling container
          // Heuristic: Check common LinkedIn email patterns
          let company = 'Unknown Company';
          
          // Pattern A: Company is usually the text of the next sibling span or in a container nearby
          const container = link.closest('td, div');
          const possibleCompany = container.find('span, p').filter((_, e) => {
            const t = $(e).text().trim();
            return t.length > 0 && t !== text && !t.includes('Alert');
          }).first().text().trim();

          if (possibleCompany) company = possibleCompany;

          // Clean up URL
          const url = new URL(href);
          url.searchParams.delete('refId');
          url.searchParams.delete('trackingId');

          // Deduplicate based on URL
          if (!jobs.find(j => j.url === url.toString())) {
            jobs.push({
              title: text,
              company: company,
              platform: 'linkedin',
              url: url.toString(),
            });
          }
        }
      }
    });

    return jobs;
  },

  async scrape(): Promise<ParsedJob[]> {
    if (process.env.ENABLE_DIRECT_SCRAPE !== 'true') return [];
    // LinkedIn scraping is not implemented — strict auth/anti-bot
    return [];
  }
};
