import { CONNECTOR_API_VERSION, JobConnector, ParsedJob } from './types';
import { JobStreetConnector } from './jobstreet';
import { IndeedConnector } from './indeed';
import { LinkedInConnector } from './linkedin';

/**
 * Registry of all available job platform connectors.
 * In v2, this will be dynamically populated from the database/plugin system.
 */
export const CONNECTORS: JobConnector[] = [
  JobStreetConnector,
  IndeedConnector,
  LinkedInConnector,
].filter((c): c is JobConnector => {
  if (c.apiVersion !== CONNECTOR_API_VERSION) {
    console.error(
      `[Tuklas] Connector "${c.id}" targets apiVersion ` +
      `${c.apiVersion} but core expects ${CONNECTOR_API_VERSION}. ` +
      `Skipping — see CONNECTOR_VERSIONING.md for migration steps.`
    );
    return false;
  }
  return true;
});

/**
 * Finds a connector by its unique ID.
 */
export function getConnectorById(id: string): JobConnector | undefined {
  return CONNECTORS.find(c => c.id === id);
}

/**
 * Finds a connector by its sender domain (used for email ingestion).
 */
export function getConnectorByDomain(domain: string): JobConnector | undefined {
  const lowerDomain = domain.toLowerCase();
  return CONNECTORS.find(c => 
    c.senderDomains.some(sd => {
      const lowerSD = sd.toLowerCase();
      return lowerDomain === lowerSD || lowerDomain.endsWith('.' + lowerSD);
    })
  );
}

/**
 * Entry point for email ingestion. Routes raw HTML to the correct parser.
 */
export function parseEmailAlert(sender: string, html: string): ParsedJob[] {
  const domain = sender.split('@')[1];
  if (!domain) return [];

  const connector = getConnectorByDomain(domain);
  if (!connector) {
    console.warn(`[Tuklas] No connector found for sender domain: ${domain}`);
    return [];
  }

  return connector.parseEmail(html);
}

export async function scrapeJobs(keywords: string, location?: string) {
  if (!process.env.ENABLE_DIRECT_SCRAPE) {
    const { scrapeJSearch } = await import('./jsearch');
    const { integrationRepository } = await import('@/lib/db/sqlite/integrations');
    const apiKey = await integrationRepository.get('rapidapi');
    if (!apiKey) throw new Error("RapidAPI key not configured");
    return scrapeJSearch(keywords, location || 'Philippines', apiKey);
  }
  // direct platform scrapers
  return [];
}
