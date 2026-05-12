import * as cheerio from 'cheerio';
import { CONNECTOR_API_VERSION, JobConnector, ParsedJob } from './types';
import { parseRelativeDate } from './utils';

/**
 * JobStreet Philippines Connector
 */
export const JobStreetConnector: JobConnector = {
  id: 'jobstreet',
  name: 'JobStreet PH',
  apiVersion: CONNECTOR_API_VERSION,
  version: '1.1.0',
  senderDomains: ['jobstreet.com', 'jobstreet.com.ph', 'ph.jobstreet.com'],
  alertSetupGuide: 'Search for your desired role on JobStreet PH, click "Create Alert", and set it to send to your dedicated Gmail account.',

  parseEmail(html: string): ParsedJob[] {
    const $ = cheerio.load(html);
    const jobs: ParsedJob[] = [];

    // Keywords that indicate a link is NOT a job post
    const EXCLUDED_KEYWORDS = [
      'unsubscribe', 'privacy policy', 'terms of use',
      'manage alerts', 'preferences', 'feedback', 'help center',
      'cookie policy', 'job preferences', 'edit frequency',
      'edit this alert', 'view all matching jobs', 'explore now',
      'matching jobs', 'career advice', 'account settings', 'view more jobs', 'explore career advice',
      'jobstreet profile', 'update your profile', 'view job'
    ];

    $('a').each((_, el) => {
      const wrapper = $(el);
      const href = wrapper.attr('href') || '';

      // Only process links that look like job details
      if (!href.includes('/job/') && !href.includes('job_id=') && !href.includes('url.jobstreet.com')) return;

      // TARGET TITLE: Look for the underlined div (Latest SEEK template)
      const titleEl = wrapper.find('div[style*="text-decoration:underline"]').first();
      let title = '';

      if (titleEl.length) {
        title = titleEl.text().trim();
      }

      // FALLBACK TITLE: Bold 18px cell is a strong indicator
      if (!title) {
        title = wrapper.find('td[style*="font-size:18px"], div[style*="font-size:18px"]').first().text().trim();
      }

      // FALLBACK TITLE 2: Old simple links where the text of the link IS the title
      let isSimpleLink = false;
      if (!title) {
        const rawText = wrapper.text().trim();
        // If the text is reasonably short, it's likely just a text link, not a wrapper around a whole card
        if (rawText.length > 5 && rawText.length < 100 && !rawText.includes('₱')) {
          title = rawText;
          isSimpleLink = true;
        }
      }

      // Filter out empty titles or common footer links
      if (!title || EXCLUDED_KEYWORDS.some(k => title.toLowerCase().includes(k))) return;

      let company = 'Unknown Company';
      let location: string | undefined;
      let salary: string | undefined;

      if (!isSimpleLink) {
        // TARGET COMPANY: It's usually the TD with font-size:14px following the title
        let foundCompany = wrapper.find('td[style*="padding-bottom:12px"]').first().text().trim();

        // FALLBACK COMPANY: Search for the 14px/21px line-height text that isn't title/location/salary
        if (!foundCompany || foundCompany === title || foundCompany === 'Unknown Company') {
          const companyEl = wrapper.find('td[style*="font-size:14px"][style*="line-height:21px"]').first();
          if (companyEl.length) {
            foundCompany = companyEl.text().trim();
          }
        }

        if (foundCompany && foundCompany !== title) {
          company = foundCompany;
        }

        // TARGET LOCATION and SALARY
        wrapper.find('div[style*="line-height:21px"], td[style*="line-height:21px"]').each((_, div) => {
          const text = $(div).text().trim();
          if (!text || text === title || text === company) return;

          if (text.includes('₱') || text.toLowerCase().includes('per month')) {
            salary = text;
          } else if (!location && (text.includes(',') || /Manila|City|Province|Region|Island/i.test(text))) {
            location = text;
          }
        });

        // CLEANUP concatenated strings (e.g. "TitleCompanyLocationSalary")
        if (title.includes('₱') || title.length > 100) {
          const parts = title.split('₱');
          if (parts.length > 1) {
            const mainPart = parts[0];
            if (company !== 'Unknown Company' && mainPart.includes(company)) {
              title = mainPart.split(company)[0].trim();
            } else {
              title = mainPart.slice(0, 60).trim();
            }
          }
        }

        if (company !== 'Unknown Company' && title.includes(company)) {
          title = title.split(company)[0].trim();
        }
      } else {
        // Handle Simple Link Company Extraction
        const container = wrapper.closest('td, div, table');
        let foundCompany = container.find('[data-automation="jobCompany"]').first().text().trim();

        if (!foundCompany) {
          foundCompany = container.find('span, div, p').filter((_, e) => {
            const t = $(e).text().trim();
            return t.length > 0 && t !== title && t.length < 50;
          }).first().text().trim();
        }

        if (foundCompany) company = foundCompany;
      }

      if (!jobs.find(j => j.title === title && j.company === company)) {
        jobs.push({
          title: title || 'Unknown Title',
          company: company,
          platform: 'jobstreet',
          url: href,
          location,
          salary,
          description: location ? `Location: ${location}` : undefined
        });
      }
    });

    return jobs;
  },

  async scrape(keywords: string, location?: string): Promise<ParsedJob[]> {
    if (process.env.ENABLE_DIRECT_SCRAPE !== 'true') return [];
    return scrapeJobStreet(keywords, location);
  }
};

/**
 * Scrapes JobStreet Philippines search results using the SSR'd HTML page.
 * Updated for SEEK-integrated JobStreet (2026).
 */
export async function scrapeJobStreet(
  keywords: string,
  location?: string,
): Promise<ParsedJob[]> {
  const query = encodeURIComponent(keywords);
  const loc = location ? encodeURIComponent(location) : '';

  // New SEEK-based URL format
  const url = `https://www.jobstreet.com.ph/jobs?keywords=${query}&location=${loc}`;

  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });

  if (!res.ok) throw new Error(`JobStreet fetch failed: ${res.status}`);

  const html = await res.text();
  const $ = cheerio.load(html);
  const jobs: ParsedJob[] = [];

  // Updated selectors for SEEK-based JobStreet
  $('[data-automation="jobCard"]').each((_, el) => {
    const card = $(el);

    const titleEl = card.find('[data-automation="jobTitle"]').first();
    const title = titleEl.text().trim();

    const companyEl = card.find('[data-automation="jobCompany"]').first();
    const company = companyEl.text().trim();

    const locationEl = card.find('[data-automation="jobLocation"]').first();
    const jobLocation = locationEl.text().trim();

    const salaryEl = card.find('[data-automation="jobSalary"]').first();
    const salary = salaryEl.text().trim() || undefined;

    const href = titleEl.attr('href') || '';
    const jobUrl = href.startsWith('http') ? href : `https://www.jobstreet.com.ph${href}`;

    // Date
    const dateEl = card.find('[data-automation="jobListingDate"]').first();
    const dateText = dateEl.text().trim();

    if (title && company) {
      jobs.push({
        title,
        company,
        platform: 'jobstreet',
        url: jobUrl.split('?')[0],
        location: jobLocation,
        salary,
        postedAt: parseRelativeDate(dateText),
      });
    }
  });

  return jobs;
}
