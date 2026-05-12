import * as cheerio from 'cheerio';
import { CONNECTOR_API_VERSION, JobConnector, ParsedJob } from './types';
import { parseRelativeDate } from './utils';

/**
 * [Platform Name] Connector Template
 * 
 * Follow this template when adding new job platform connectors.
 * Standards:
 * - Use standard ParsedJob fields (title, company, platform, url, location, description, salary, postedAt)
 * - Map short excerpts/snippets to the 'description' field.
 * - Always use the global CONNECTOR_API_VERSION.
 * - Clean URLs by stripping tracking/referral parameters.
 */
export const PlatformConnector: JobConnector = {
  id: 'platform-id',
  name: 'Platform Name',
  apiVersion: CONNECTOR_API_VERSION,
  version: '1.0.0',
  senderDomains: ['platform.com'],
  alertSetupGuide: 'Instructions for the user on how to set up email alerts for this platform.',

  parseEmail(html: string): ParsedJob[] {
    const $ = cheerio.load(html);
    const jobs: ParsedJob[] = [];

    // Standard extraction logic
    // 1. Target the main job card/container
    $('.job-card').each((_, el) => {
      const container = $(el);
      
      const title = container.find('.title').text().trim();
      const company = container.find('.company').text().trim();
      const url = container.find('a').attr('href');
      
      // Optional but recommended fields
      const location = container.find('.location').text().trim() || undefined;
      const salary = container.find('.salary').text().trim() || undefined;
      const description = container.find('.snippet').text().trim() || undefined; // Map snippet to description
      const dateText = container.find('.date').text().trim();

      if (title && company) {
        jobs.push({
          title,
          company,
          platform: 'platform-id',
          url: url ? url.split('?')[0] : undefined, // Clean tracking params
          location,
          salary,
          description,
          postedAt: parseRelativeDate(dateText),
        });
      }
    });

    return jobs;
  },

  async scrape(): Promise<ParsedJob[]> {
    // Optional: Implement if the platform supports direct search scraping
    // Must return the same ParsedJob[] shape as parseEmail.
    return [];
  }
};
