import * as cheerio from 'cheerio';
import { CONNECTOR_API_VERSION, JobConnector, ParsedJob } from './types';
import { parseRelativeDate } from './utils';

/**
 * Indeed Connector
 */
export const IndeedConnector: JobConnector = {
  id: 'indeed',
  name: 'Indeed',
  apiVersion: CONNECTOR_API_VERSION,
  version: '1.0.0',
  senderDomains: ['indeed.com'],
  alertSetupGuide: 'Perform a job search on Indeed, click "Get new jobs for this search by email", and confirm your subscription.',

  parseEmail(html: string): ParsedJob[] {
    const $ = cheerio.load(html);
    const jobs: ParsedJob[] = [];

    // Each job is wrapped in an <a> block with href containing /rc/clk/dl or /pagead/clk/dl
    // Structure inside each <a>:
    //   <h2> → job title (via nested <a>)
    //   next <tr> → company name (first <td> with padding:0 12px 0 0)
    //   next <tr> → location (plain td, color:#2d2d2d)
    //   salary <tr> → optional, inside bgcolor="#f3f2f1" table
    //   snippet <tr> → color:#767676, font-size:14px
    //   date <tr> → color:#767676, font-size:12px

    $('a[href*="/rc/clk/dl"], a[href*="/pagead/clk/dl"]').each((_, el) => {
      const wrapper = $(el);

      // Skip nested anchors — only process the outer block-level <a>
      if (wrapper.css('display') !== 'block' && wrapper.attr('style')?.includes('display:block') === false) {
        // Filter: only the outer <a style="display:block"> wraps the whole card
        if (!wrapper.attr('style')?.includes('display:block')) return;
      }

      // Title: text inside the <h2> inside this <a>
      const title = wrapper.find('h2').first().text().trim();
      if (!title) return;

      // URL: extract jk param from href for a clean Indeed URL
      const href = wrapper.attr('href') || '';
      const jkMatch = href.match(/jk=([a-f0-9]+)/);
      const url = jkMatch
        ? `https://ph.indeed.com/viewjob?jk=${jkMatch[1]}`
        : href.split('?')[0];

      // Company: first <td> with padding style "0 12px 0 0" inside the company row
      const company = wrapper
        .find('td[style*="padding:0 12px 0 0"]')
        .first()
        .text()
        .trim() || 'Unknown Company';

      // Location: <td> with color:#2d2d2d and font-size:14px that comes after the company row
      // It's the standalone td that is NOT inside a nested table (no child table)
      let location: string | undefined;
      wrapper.find('td').each((_, td) => {
        const style = $(td).attr('style') || '';
        const text = $(td).text().trim();
        if (
          style.includes('color:#2d2d2d') &&
          style.includes('font-size:14px') &&
          !style.includes('padding:0 12px') &&
          $(td).children('table').length === 0 &&
          $(td).children('img').length === 0 &&
          text.length > 0 &&
          text !== 'Easily apply' &&
          text !== 'Responsive employer'
        ) {
          location = text;
          return false; // break
        }
      });

      // Salary: text inside bgcolor="#f3f2f1" table
      const salary = wrapper
        .find('table[bgcolor="#f3f2f1"] td')
        .first()
        .text()
        .trim() || undefined;

      // Description (Snippet): <td> with color:#767676 and font-size:14px
      const description = wrapper
        .find('td[style*="color:#767676"][style*="font-size:14px"]')
        .first()
        .text()
        .trim() || undefined;

      // Date: <td> with color:#767676 and font-size:12px
      const dateText = wrapper
        .find('td[style*="color:#767676"][style*="font-size:12px"]')
        .first()
        .text()
        .trim();

      jobs.push({
        title,
        company,
        platform: 'indeed',
        url,
        location,
        salary,
        description,
        postedAt: parseRelativeDate(dateText),
      });
    });

    return jobs;
  },

  async scrape(keywords: string, location?: string): Promise<ParsedJob[]> {
    if (process.env.ENABLE_DIRECT_SCRAPE !== 'true') return [];
    return scrapeIndeed(keywords, location);
  }
};

export async function scrapeIndeed(keywords: string, location = 'Philippines'): Promise<ParsedJob[]> {
  const params = new URLSearchParams({ q: keywords, l: location });
  const res = await fetch(`https://ph.indeed.com/jobs?${params}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });

  if (!res.ok) throw new Error(`Indeed fetch failed: ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);
  const jobs: ParsedJob[] = [];

  $('[data-jk]').each((_, el) => {
    const title = $(el).find('[data-testid="job-title"]').text().trim();
    const company = $(el).find('[data-testid="company-name"]').text().trim();
    const location = $(el).find('[data-testid="text-location"]').text().trim();
    const id = $(el).attr('data-jk');
    const dateText = $(el).find('.date, [data-testid="myJobsStateDate"]').text().trim();

    if (title && company) {
      jobs.push({
        title,
        company,
        platform: 'indeed',
        url: id ? `https://ph.indeed.com/viewjob?jk=${id}` : undefined,
        location,
        postedAt: parseRelativeDate(dateText),
      });
    }
  });

  return jobs;
}
