"use server";

import { jobRepository } from "@/lib/db/sqlite/jobs";
import { generateCoverLetter } from "@/lib/llm";
import { resolveLLMConfig } from "@/lib/llm-config";
import { logActivity } from "@/lib/logger";
import { profileRepository } from "@/lib/db/sqlite/profile";
import { coverLetterRepository } from "@/lib/db/sqlite/cover-letters";
import { randomUUID } from "crypto";

export async function generateCoverLetterAction(jobId: string) {
  try {
    const profile = await profileRepository.get();
    if (!profile || (!profile.resumeCleaned && !profile.resumeRaw)) {
      return { error: "No Resume found. Please add your Resume in the Profile page first." };
    }

    const llmResult = await resolveLLMConfig();
    if ("error" in llmResult) {
      await logActivity({ action: 'ai_generation', status: 'error', details: { error: llmResult.error } });
      return { error: llmResult.error };
    }
    const { config: llmConfig } = llmResult;

    const job = await jobRepository.getJob(jobId);
    if (!job) return { error: "Job not found" };

    const defaultPrompt = `Write a tailored cover letter body for this role based strictly on the provided CV and Job Description.
Requirements:
- Professional, concise, and specific to the company.
- Highlight 2-3 key matches between the candidate's experience and the job requirements.
- NO fabrications or hallucinated experience.
- Output plain text only. 
- Maximum 3 short, punchy paragraphs. 
- DO NOT include headers, salutations, or sign-offs (e.g., no "Dear Hiring Manager" or "Sincerely"). 
- Return ONLY the body paragraphs.`;

    let customPrompt = null;
    if (profile.preferences) {
      try {
        const prefs = JSON.parse(profile.preferences);
        customPrompt = prefs.cover_letter_prompt;
      } catch {}
    }
    const basePrompt = customPrompt || defaultPrompt;

    const finalPrompt = `
${basePrompt}

---
CANDIDATE CV:
${profile.resumeCleaned || profile.resumeRaw}

---
JOB TITLE: ${job.title}
COMPANY: ${job.company}
PLATFORM: ${job.platform}
JOB DESCRIPTION:
${job.description || "No description provided."}
`;

    const rawContent = await generateCoverLetter(finalPrompt, llmConfig);

    await coverLetterRepository.upsert({
      id: randomUUID(),
      jobId,
      content: rawContent,
      rawContent: rawContent,
      modelUsed: llmConfig.model,
      generatedAt: new Date().toISOString(),
      edited: false
    });

    await logActivity({ action: 'ai_generation', status: 'success', details: { type: 'cover_letter', model: llmConfig.model } });
    return { content: rawContent };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "An unknown error occurred" };
  }
}

export async function saveCoverLetterAction(jobId: string, content: string) {
  try {
    if (!content || content.length > 20000) {
      return { error: "Cover letter content must be between 1 and 20,000 characters." };
    }

    await coverLetterRepository.upsert({
      id: randomUUID(),
      jobId,
      content,
      edited: true
    });
    return { success: true };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "An unknown error occurred" };
  }
}
