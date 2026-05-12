/**
 * Masks a sensitive string, showing only asterisks and the last 4 characters.
 * Useful for UI display of API keys and secrets.
 */
export function maskValue(value: string | undefined | null): string {
  if (!value) return '';
  if (value.length <= 4) return '••••••••••••••••';
  const last4 = value.slice(-4);
  return `••••••••••••••••${last4}`;
}

/**
 * Checks if a string is currently masked.
 */
export function isMasked(value: string | undefined | null): boolean {
  if (!value) return false;
  return value.startsWith('••••••••••••••••');
}

/**
 * Masks sensitive values in a configuration object for UI display.
 */
export function maskConfig(config: Record<string, string>): Record<string, string> {
  const masked: Record<string, string> = {};
  for (const [key, value] of Object.entries(config)) {
    if (value && (
      key.toLowerCase().includes('key') || 
      key.toLowerCase().includes('secret') || 
      key.toLowerCase().includes('token')
    )) {
      masked[key] = maskValue(value);
    } else {
      masked[key] = value;
    }
  }
  return masked;
}
