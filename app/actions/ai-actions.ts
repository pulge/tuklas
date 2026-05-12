"use server";

import { generateCoverLetter } from "@/lib/llm";
import { resolveLLMConfig } from "@/lib/llm-config";
import { logActivity } from "@/lib/logger";
import { revalidatePath } from "next/cache";

import { profileRepository } from "@/lib/db/sqlite/profile";

/**
 * AI-powered CV cleaning action.
 */
export async function cleanCvTextAction(rawText: string) {
    if (rawText.length > 50000) {
      return { error: "Text is too long (max 50,000 characters)." };
    }

    const llmResult = await resolveLLMConfig({ temperature: 0.3 });
    if ("error" in llmResult) return { error: llmResult.error };
    const { config: llmConfig, profile } = llmResult;

    const defaultPrompt = `You are an AI specialized in parsing and cleaning up resume text extracted from PDFs.
The following text is a raw extraction from a PDF resume. It might contain formatting artifacts, repetitive headers, or broken lines.
Please clean it up into a professional, structured plain text version that preserves all key information (Name, Contact, Experience, Skills, Education) but removes noise.`;

    const profilePrefs = profile?.preferences ? JSON.parse(profile.preferences) : {};
    const basePrompt = profilePrefs.resume_prompt || defaultPrompt;

    const finalPrompt = `${basePrompt}

RAW TEXT:
${rawText}

CLEANED VERSION:`;

    try {
      const cleanedText = await generateCoverLetter(finalPrompt, llmConfig);
      await logActivity({ 
        action: 'ai_generation', 
        status: 'success', 
        details: { 
          type: 'cv_clean',
          charCount: cleanedText.length,
          model: llmConfig.model,
          provider: llmConfig.provider,
          source: 'local'
        } 
      });
      
      revalidatePath('/profile');
      return { content: cleanedText };
    } catch (err: unknown) {
      console.error("cleanCvTextAction error:", err);
      await logActivity({ 
        action: 'ai_generation', 
        status: 'error', 
        details: { 
          type: 'cv_clean',
          error: err instanceof Error ? err.message : String(err) 
        } 
      });
      return { error: err instanceof Error ? err.message : "Failed to clean CV text" };
    }
}

/**
 * Extracts text from a PDF buffer using unpdf.
 */
export async function extractCVTextAction(fileBuffer: ArrayBuffer) {
    try {
      const MAX_SIZE_BYTES = 5 * 1024 * 1024;
      if (fileBuffer.byteLength === 0) return { error: "File appears to be empty." };
      if (fileBuffer.byteLength > MAX_SIZE_BYTES) return { error: "File exceeds the 5MB limit." };

      const { extractText } = await import("unpdf");
      const buffer = new Uint8Array(fileBuffer);
      
      const result = await extractText(buffer, { mergePages: true });
      const text = result?.text || "";

      await logActivity({ action: 'cv_extract', status: 'success', details: { byteLength: fileBuffer.byteLength, charCount: text.length } });
      return { content: text };
    } catch (err: unknown) {
      console.error("PDF Extraction error:", err);
      await logActivity({ action: 'cv_extract', status: 'error', details: { error: err instanceof Error ? err.message : String(err) } });
      return { error: err instanceof Error ? err.message : "Failed to extract PDF text" };
    }
}

/**
 * AI-powered keyword generation from CV text.
 */
export async function generateKeywordsFromCvAction(cvText: string) {
    if (cvText.length > 50000) {
      return { error: "Resume text is too long (max 50,000 characters)." };
    }

    const llmResult = await resolveLLMConfig({ temperature: 0.3 });
    if ("error" in llmResult) return { error: llmResult.error };
    const { config: llmConfig } = llmResult;

    const prompt = `Extract exactly 10 relevant job search keywords (such as roles, skills, technologies, industries) from the following resume.
Return ONLY a comma-separated list of these keywords without any extra text, numbers, bullet points, or explanation.

RESUME:
${cvText}`;

    try {
      const keywordsString = await generateCoverLetter(prompt, llmConfig);
      
      const keywords = keywordsString
        .split(/[\n,]/)
        .map(k => k.replace(/[.\d\-\*]/g, '').trim())
        .filter(k => k.length > 1);

      if (keywords.length === 0) {
        return { error: "AI generated an empty keyword list. Try refining your CV text." };
      }

      const currentProfile = await profileRepository.get();
      const currentPrefs = currentProfile?.preferences ? JSON.parse(currentProfile.preferences) : {};
      const existingKeywords = (Array.isArray(currentPrefs.keywords) ? currentPrefs.keywords : []) as string[];
      const MAX_KEYWORDS = 50;
      const mergedKeywords = Array.from(new Set([...existingKeywords, ...keywords])).slice(0, MAX_KEYWORDS);

      const mergedPrefs = {
        ...currentPrefs,
        keywords: mergedKeywords
      };

      await profileRepository.update({
        preferences: JSON.stringify(mergedPrefs)
      });

      await logActivity({
        action: 'ai_generation',
        status: 'success',
        details: {
          type: 'keyword_generation',
          keywordCount: keywords.length,
          model: llmConfig.model,
          provider: llmConfig.provider,
          source: 'local'
        }
      });
      
      revalidatePath('/profile');
      return { keywords };
    } catch (err: unknown) {
      console.error("generateKeywordsFromCvAction error:", err);
      await logActivity({
        action: 'ai_generation',
        status: 'error',
        details: {
          type: 'keyword_generation',
          error: err instanceof Error ? err.message : String(err)
        }
      });
      return { error: err instanceof Error ? err.message : "Failed to generate keywords" };
    }
}

/**
 * Updates AI-specific preferences for a user profile.
 */
export async function updateProfileAIConfig(aiPrefs: Record<string, unknown>) {
    const ALLOWED_AI_PREF_KEYS = new Set(['provider', 'model', 'gemini_api_key', 'openrouter_api_key']);
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(aiPrefs)) {
      if (ALLOWED_AI_PREF_KEYS.has(key)) {
        sanitized[key] = value;
      }
    }

    const profile = await profileRepository.get();
    const currentPrefs = profile?.preferences ? JSON.parse(profile.preferences) : {};
    const updatedPrefs = {
      ...currentPrefs,
      ai_preferences: sanitized
    };

    await profileRepository.update({
      preferences: JSON.stringify(updatedPrefs)
    });

    revalidatePath("/profile");
    revalidatePath("/setup");
    return { success: true };
}
