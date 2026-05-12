import { useMemo } from 'react';

/**
 * Safely access nested object properties using a dot-notation string path (e.g., "job.title").
 */
const getNestedValue = (obj: unknown, path: string): unknown => {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
};

/**
 * A highly reusable hook for client-side searching across arrays of objects.
 * 
 * @param items The array of objects to filter.
 * @param query The search query string.
 * @param searchKeys An array of object keys (supports dot notation) to search against.
 * @returns The filtered array of objects.
 */
export function useSearch<T>(items: T[], query: string, searchKeys: string[]): T[] {
  const filteredItems = useMemo(() => {
    if (!query || query.trim() === '') {
      return items;
    }

    const trimmedQuery = query.toLowerCase().trim();
    if (!trimmedQuery) return items;

    const queryTokens = trimmedQuery.split(/\s+/);

    return items.filter((item) => {
      // Every token must be found in at least one of the search keys
      return queryTokens.every((token) => {
        return searchKeys.some((key) => {
          const val = getNestedValue(item, key);
          if (val === null || val === undefined) return false;

          const stringVal = String(val).toLowerCase();
          return stringVal.includes(token);
        });
      });
    });
  }, [items, query, searchKeys]);

  return filteredItems;
}
