"use server";

import { revalidatePath } from "next/cache";
import { JobStatus, manualJobSchema } from "@/types/job";
import { logActivity } from "@/lib/logger";
import { jobRepository } from "@/lib/db/sqlite/jobs";
import { randomUUID } from "crypto";

export async function skipJob(id: string) {
  try {
    await jobRepository.updateJobStatus(id, "skipped");
    await logActivity({ action: 'application_status_update', status: 'success', details: { jobId: id, status: 'skipped' } });
    revalidatePath("/jobs");
    return { success: true };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}

export async function updateJobStatus(id: string, status: JobStatus) {
  try {
    await jobRepository.updateJobStatus(id, status);
    await logActivity({ action: 'application_status_update', status: 'success', details: { jobId: id, status } });
    revalidatePath("/jobs");
    return { success: true };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}

export async function deleteJobs(ids: string[]) {
  try {
    for (const id of ids) {
      await jobRepository.deleteJob(id);
    }
    await logActivity({ action: 'application_status_update', status: 'success', details: { action: 'delete', count: ids.length } });
    revalidatePath("/jobs");
    return { success: true };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}

export async function bulkUpdateJobStatus(ids: string[], status: JobStatus) {
  try {
    for (const id of ids) {
      await jobRepository.updateJobStatus(id, status);
    }
    await logActivity({ action: 'application_status_update', status: 'success', details: { action: 'bulk_update', status, count: ids.length } });
    revalidatePath("/jobs");
    return { success: true };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}

export async function createManualJob(formData: unknown) {
  const result = manualJobSchema.safeParse(formData);
  if (!result.success) {
    return { error: "Invalid form data: " + result.error.issues[0].message };
  }

  const data = result.data;

  try {
    await jobRepository.insertJob({
      id: randomUUID(),
      title: data.title,
      company: data.company,
      location: data.location || null,
      url: data.url || null,
      description: data.description || null,
      salary: data.salary || null,
      platform: data.platform || "manual",
      status: "new",
    });

    await logActivity({ action: 'scrape', status: 'success', details: { type: 'manual_job', title: data.title } });
    revalidatePath("/jobs");
    return { success: true };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}
