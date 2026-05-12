/**
 * Rate limits expensive ingestion operations.
 * In OSS mode, rate limits are disabled by default.
 */
export async function checkRateLimit() {
  return { allowed: true, secondsLeft: 0 };
}
