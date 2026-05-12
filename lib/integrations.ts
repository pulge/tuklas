export type IntegrationService = 'rapidapi' | 'gemini' | 'openrouter' | 'gmail';

export const AI_SERVICES: IntegrationService[] = ['gemini', 'openrouter'];

/**
 * Checks if at least one AI service is configured.
 */
export function isAIReady(integrations: Partial<Record<IntegrationService, Record<string, string>>>): boolean {
  return AI_SERVICES.some(s => !!integrations[s]);
}
