/**
 * JobConnector API Version
 *
 * Increment this when a breaking change is made to the JobConnector interface.
 * Connectors built against an older apiVersion will be refused by the registry.
 *
 * Current: 1
 * History: (none — this is the initial release)
 */
export const CONNECTOR_API_VERSION = 1 as const;

export interface JobConnector {
  /** Unique slug. Lowercase, hyphenated. e.g. "jobstreet-ph" */
  id: string

  /** Human-readable display name. e.g. "JobStreet Philippines" */
  name: string

  /**
   * Which JobConnector spec this connector implements.
   * Must equal CONNECTOR_API_VERSION or the registry will refuse to load it.
   */
  apiVersion: typeof CONNECTOR_API_VERSION

  /** Connector's own semver release. Independent of apiVersion. e.g. "1.0.0" */
  version: string

  /** Sender domains used to route inbound emails to this connector. */
  senderDomains: string[]

  /**
   * Parse a raw job alert email (HTML string) and return structured jobs.
   * Return an empty array if no jobs are found — never throw.
   * On parse failure, return jobs with only the fields you could extract;
   * the ingest layer will store the raw HTML as a fallback.
   */
  parseEmail(html: string): ParsedJob[]

  /**
   * Optional. Implement only for platforms with no email alert support or for manual fallback.
   * Must return the same ParsedJob[] shape as parseEmail.
   * Must handle its own rate limiting and error recovery.
   */
  scrape?(keywords: string, location?: string): Promise<ParsedJob[]>

  /**
   * Markdown string rendered in /profile under "Alert Setup".
   * Should walk the user through subscribing to job alerts
   * on this platform so emails reach the ingest endpoint.
   */
  alertSetupGuide: string
}

export interface ParsedJob {
  // --- Required ---
  title: string
  company: string
  platform: string         // matches connector id

  // --- Strongly recommended ---
  url?: string
  location?: string
  description?: string
  salary?: string
  postedAt?: string        // ISO 8601 string or null

  // --- Internal ---
  /**
   * Set to true by the connector when parsing partially failed.
   * The ingest layer will attach the raw HTML and flag for manual review.
   */
  parseWarning?: boolean
}
