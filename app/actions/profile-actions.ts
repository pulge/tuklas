"use server";

import { logActivity } from "@/lib/logger";
import { revalidatePath } from "next/cache";
import { profileRepository } from "@/lib/db/sqlite/profile";
import { writeFile, mkdir } from 'fs/promises';
import { homedir } from 'os';
import { join } from 'path';

export async function uploadResume(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) throw new Error("No file uploaded");

    const dir = join(homedir(), '.tuklas', 'uploads');
    await mkdir(dir, { recursive: true });
    
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(join(dir, file.name), buffer);

    await logActivity({ action: 'cv_extract', status: 'success', details: { type: 'resume_upload' } });
    revalidatePath("/profile");
    return { success: true, filename: file.name };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}

export async function updateProfileCv(cvText: string, filename?: string) {
  try {
    const profile = await profileRepository.get();
    const currentPrefs = profile?.preferences ? JSON.parse(profile.preferences) : {};
    const updatedPrefs = {
      ...currentPrefs,
      cv_filename: filename
    };

    await profileRepository.update({
      resumeRaw: cvText,
      preferences: JSON.stringify(updatedPrefs)
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}

const ALLOWED_PREF_KEYS = new Set([
  'keywords', 'location', 'salary_floor', 'active_connectors',
  'ai_preferences', 'connector_credentials', 'resume_prompt',
  'cover_letter_prompt', 'pipeline_toggles', 'pipelines', 'cv_filename',
]);

export async function updateProfilePreferences(newPrefs: Record<string, unknown>) {
  try {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(newPrefs)) {
      if (ALLOWED_PREF_KEYS.has(key)) {
        sanitized[key] = value;
      }
    }

    if (Object.keys(sanitized).length === 0) {
      throw new Error("No valid preference keys provided.");
    }

    const profile = await profileRepository.get();
    const currentPrefs = profile?.preferences ? JSON.parse(profile.preferences) : {};
    const mergedPrefs = {
      ...currentPrefs,
      ...sanitized
    };

    await profileRepository.update({
      preferences: JSON.stringify(mergedPrefs)
    });

    if (sanitized.pipelines) {
      await logActivity({
        action: 'pipeline_toggle',
        status: 'success',
        details: { pipelines: sanitized.pipelines }
      });
    }

    revalidatePath("/profile");
    return { success: true };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}
