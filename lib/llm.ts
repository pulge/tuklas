/**
 * Tuklas LLM Abstraction Layer
 * Supports switching between cloud AI providers (Gemini, OpenRouter).
 * API keys and provider config are passed explicitly by the caller — never read from process.env here.
 */

export type LLMProvider = "gemini" | "openrouter";

export interface LLMConfig {
  provider: LLMProvider;
  model: string;
  /** API key for cloud providers (Gemini, OpenRouter) */
  apiKey?: string;
  temperature?: number;
  maxTokens?: number;
}

// ---------------------------------------------------------------------------
// User-friendly error formatting
// ---------------------------------------------------------------------------

/**
 * Translates raw HTTP error responses from AI providers into concise,
 * actionable messages safe to show in a production toast/UI.
 */
function formatProviderError(
  provider: string,
  status: number,
  rawBody: string,
): string {
  const label = provider.charAt(0).toUpperCase() + provider.slice(1);

  // Try to extract the nested error message for logging
  let detail = "";
  try {
    const parsed = JSON.parse(rawBody) as { error?: { message?: string } };
    detail = parsed?.error?.message ?? "";
  } catch {
    // raw body wasn't JSON – that's fine
  }

  // Log full detail server-side so it's available in prod logs
  console.error(`[${label} API ${status}]`, detail || rawBody);

  switch (true) {
    case status === 429:
      return (
        `${label} rate limit exceeded. ` +
        "Your free-tier quota may be exhausted — wait a minute and retry, " +
        "upgrade your plan, or switch to a different AI provider in Integrations."
      );

    case status === 401 || status === 403:
      return (
        `${label} rejected your API key (${status}). ` +
        "Please verify or re-enter it on the Integrations page."
      );

    case status === 404:
      return (
        `${label} model not found. ` +
        "The configured model may have been retired. " +
        "Update your model selection in AI Configuration."
      );

    case status >= 500:
      return (
        `${label} is experiencing server issues (${status}). ` +
        "This is on their end — please try again shortly."
      );

    default:
      // Keep it short but include the status code for debugging
      return `${label} request failed (${status}). ${detail || "Check your AI configuration and try again."}`;
  }
}

/**
 * Generate text using the specified provider configuration.
 * All credentials must be supplied by the caller — this function is config-pure.
 */
export async function generateCoverLetter(
  prompt: string,
  config: LLMConfig,
): Promise<string> {
  console.log(`[LLM] Using provider: ${config.provider}, model: ${config.model}`);

  switch (config.provider) {
    case "gemini":
      return await callGemini(prompt, config);
    case "openrouter":
    default:
      return await callOpenRouter(prompt, config);
  }
}

async function callGemini(prompt: string, config: LLMConfig) {
  if (!config.apiKey) throw new Error("Gemini API key is not configured. Add it in Integrations.");

  try {
    // Ensure the model name is correctly formatted for the URL path.
    // The API expects either "models/name" or just "name" depending on the version, 
    // but the path pattern is /v1beta/models/{model}:generateContent.
    const modelPath = config.model.startsWith("models/") ? config.model.replace("models/", "") : config.model;
    const cleanModel = modelPath.trim();
    const cleanKey = config.apiKey.trim();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${cleanKey}`;
    
    console.log(`[Gemini] Request URL: ${url.replace(/key=.*$/, "key=HIDDEN")}`);
    const response = await fetch(
      url,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: config.temperature ?? 0.7,
            maxOutputTokens: config.maxTokens ?? 1000,
          },
        }),
      },
    );

    const text = await response.text();
    if (!response.ok) {
      throw new Error(formatProviderError("Gemini", response.status, text));
    }

    if (!text) throw new Error("Gemini returned an empty response.");

    try {
      const data = JSON.parse(text) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!content) throw new Error("Gemini returned an empty content field.");
      return content;
    } catch {
      throw new Error(`Failed to parse Gemini response: ${text}`);
    }
  } catch (error) {
    console.error("[Gemini Error]", error);
    throw error instanceof Error ? error : new Error("Gemini API call failed.");
  }
}

async function callOpenRouter(prompt: string, config: LLMConfig) {
  if (!config.apiKey)
    throw new Error("OpenRouter API key is not configured. Add it in Integrations.");

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey.trim()}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Tuklas",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: config.model,
        messages: [{ role: "user", content: prompt }],
        temperature: config.temperature ?? 0.7,
      }),
    });

    const text = await response.text();
    if (!response.ok) {
      throw new Error(formatProviderError("OpenRouter", response.status, text));
    }

    if (!text) throw new Error("OpenRouter returned an empty response.");

    try {
      const data = JSON.parse(text) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new Error("OpenRouter returned an empty content field.");
      return content;
    } catch {
      throw new Error(`Failed to parse OpenRouter response: ${text}`);
    }
  } catch (error) {
    console.error("[OpenRouter Error]", error);
    throw error instanceof Error ? error : new Error("OpenRouter API call failed.");
  }
}

