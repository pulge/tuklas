/**
 * Parses relative date strings like "3 days ago", "2h ago", "Posted 30+ days ago"
 * into an ISO 8601 string.
 */
export function parseRelativeDate(relativeStr: string | null | undefined): string | undefined {
  if (!relativeStr || relativeStr.trim() === '') return undefined;

  // 1. Check if it's already a valid absolute date string (e.g. ISO from JSearch)
  const asDate = new Date(relativeStr);
  if (!isNaN(asDate.getTime())) {
    return asDate.toISOString();
  }

  const now = new Date();
  const lower = relativeStr.toLowerCase();

  // 2. Extract number and unit
  // Matches "3 days", "2h", "1 month", "24 hours", "30+ days", etc.
  const match = lower.match(/(\d+)\+?\s*(min|hour|hr|day|wk|week|month|yr|year)s?/i);
  
  if (!match) {
    if (lower.includes('today') || lower.includes('just now')) return now.toISOString();
    if (lower.includes('yesterday')) {
      now.setDate(now.getDate() - 1);
      return now.toISOString();
    }
    return undefined;
  }
  
  const num = parseInt(match[1]);
  const unit = match[2].toLowerCase();
  
  if (unit.startsWith('min')) {
    now.setMinutes(now.getMinutes() - num);
  } else if (unit.startsWith('hour') || unit === 'hr') {
    now.setHours(now.getHours() - num);
  } else if (unit.startsWith('day')) {
    now.setDate(now.getDate() - num);
  } else if (unit.startsWith('wk') || unit.startsWith('week')) {
    now.setDate(now.getDate() - num * 7);
  } else if (unit.startsWith('month')) {
    now.setMonth(now.getMonth() - num);
  } else if (unit.startsWith('yr') || unit.startsWith('year')) {
    now.setFullYear(now.getFullYear() - num);
  }
  
  return now.toISOString();
}
