"use server";

import type { LLMProvider } from "@/lib/llm";
import { integrationRepository } from "@/lib/db/sqlite/integrations";

export type ModelOption = {
  id: string;
  name: string;
};

export async function getAvailableModelsAction(
  provider: LLMProvider
): Promise<{ models?: ModelOption[]; error?: string; missingKey?: boolean }> {
  const activeKey = await integrationRepository.get(provider);

  if (provider === "gemini") {
    if (!activeKey) return { missingKey: true, error: "Missing Gemini API Key" };
    
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${activeKey}`,
        { method: "GET" }
      );
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) return { missingKey: true, error: "Invalid Gemini API Key" };
        throw new Error(`Gemini API error: ${res.status}`);
      }
      
      const data = await res.json() as { 
        models?: Array<{ name: string; displayName: string; supportedGenerationMethods: string[] }> 
      };
      
      const models = data.models
        ?.filter(m => m.supportedGenerationMethods?.includes("generateContent"))
        ?.map(m => ({
          id: m.name.replace("models/", ""),
          name: m.displayName || m.name.replace("models/", ""),
        })) || [];
        
      return { models };
    } catch (e) {
      console.error("[Gemini Models Error]", e);
      return { error: "Failed to fetch Gemini models." };
    }
  }

  if (provider === "openrouter") {
    if (!activeKey) return { missingKey: true, error: "Missing OpenRouter API Key" };
    
    try {
      const res = await fetch("https://openrouter.ai/api/v1/models", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${activeKey}`,
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "Tuklas",
        }
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) return { missingKey: true, error: "Invalid OpenRouter API Key" };
        throw new Error(`OpenRouter API error: ${res.status}`);
      }
      
      const data = await res.json() as { data?: Array<{ id: string; name: string }> };
      const models = data.data?.map(m => ({
        id: m.id,
        name: m.name || m.id,
      })) || [];
      
      models.sort((a, b) => a.name.localeCompare(b.name));
      
      return { models };
    } catch (e) {
      console.error("[OpenRouter Models Error]", e);
      return { error: "Failed to fetch OpenRouter models." };
    }
  }

  return { models: [] };
}

export type TokenStatusResponse = {
  status: 'valid' | 'invalid' | 'missing' | 'error' | 'loading';
  source: 'user' | 'admin' | 'none';
  error?: string;
};

/**
 * Validates the currently active token for a provider.
 */
export async function validateActiveEngineTokenAction(
  provider: LLMProvider
): Promise<TokenStatusResponse> {
  try {
    const key = await integrationRepository.get(provider);
    if (!key) {
      return { status: 'missing', source: 'none' };
    }

    const isValid = await testToken(provider, key);
    return { 
      status: isValid ? 'valid' : 'invalid', 
      source: 'user',
      error: !isValid ? `Invalid ${provider} key.` : undefined
    };
  } catch {
    return { status: 'error', source: 'none', error: 'Failed to validate token' };
  }
}

async function testToken(provider: LLMProvider, key: string): Promise<boolean> {
  try {
    if (provider === "gemini") {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`,
        { method: "GET" }
      );
      return res.ok;
    }

    if (provider === "openrouter") {
      const res = await fetch("https://openrouter.ai/api/v1/models", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${key}`,
          "X-Title": "Tuklas Status Check",
        }
      });
      return res.ok;
    }
  } catch (e) {
    console.error(`[Token Test Error] ${provider}:`, e);
  }
  return false;
}
