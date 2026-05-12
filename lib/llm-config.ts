import type { LLMConfig } from "@/lib/llm";
import type { Profile } from "@/types/profile";

const DEFAULT_MODELS: Record<string, string> = {
  gemini: "gemini-2.0-flash",
  openrouter: "anthropic/claude-3-haiku",
};

/**
 * Resolves the active LLM configuration for the given user by reading their
 * AI preferences from the profile table and fetching the relevant credentials
 * from the integrations table.
 *
 * Returns an LLMConfig ready to be passed to `generateCoverLetter`, and the 
 * fetched profile, or an error string if a required key is missing.
 */
export async function resolveLLMConfig(
  overrides?: Partial<Pick<LLMConfig, "temperature" | "maxTokens">>,
): Promise<{ config: LLMConfig; profile: Profile; isBYOK: boolean } | { error: string }> {
  const { profileRepository } = await import('@/lib/db/sqlite/profile');
  const profile = await profileRepository.get();
  
  if (!profile) return { error: "Profile not found" };

  const userAiPrefs = profile?.preferences ? JSON.parse(profile.preferences).ai_preferences : {};

  const providerRaw = (userAiPrefs?.provider?.trim() || "gemini") as string;
  let provider = providerRaw as LLMConfig["provider"];
  
  const supportedProviders: LLMConfig["provider"][] = ["gemini", "openrouter"];
  if (!supportedProviders.includes(provider)) {
    provider = "gemini";
  }

  const model = (userAiPrefs?.model?.trim() || DEFAULT_MODELS[provider] || DEFAULT_MODELS.gemini).trim();

  let apiKey: string | undefined;
  let userModel: string | undefined;
  let isBYOK = false;

  try {
    const { integrationRepository } = await import('@/lib/db/sqlite/integrations');
    const key = await integrationRepository.get(provider);
    if (key) {
      apiKey = key;
      isBYOK = true;
    }
  } catch (err) {
    console.error("[resolveLLMConfig] Failed to fetch keys", err);
  }

  if (!apiKey) {
    return {
      error: `No API key configured for ${provider}. Please add one in Integrations.`,
    };
  }

  return {
    config: { 
      provider, 
      model: userModel || model, 
      apiKey, 
      ...overrides 
    },
    profile,
    isBYOK
  };
}
