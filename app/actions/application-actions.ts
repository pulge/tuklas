"use server";

import type { ApplicationStatus } from "@/types/application";

import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/logger";
import { applicationRepository } from "@/lib/db/sqlite/applications";
import { jobRepository } from "@/lib/db/sqlite/jobs";
import { randomUUID } from "crypto";

export async function createApplication(jobId: string) {
    try {
      await applicationRepository.insertApplication({
        id: randomUUID(),
        jobId,
        status: "applied",
        appliedAt: new Date().toISOString()
      });

      await jobRepository.updateJobStatus(jobId, "applied");

      revalidatePath("/jobs");
      revalidatePath("/applications");
      return { success: true };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) };
    }
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
    try {
      await applicationRepository.updateApplication(id, { status });
      await logActivity({ action: 'application_status_update', status: 'success', details: { applicationId: id, status } });
      revalidatePath("/applications");
      return { success: true };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) };
    }
}

export async function updateApplicationDetails(id: string, details: { notes?: string; interview_at?: string }) {
    try {
      await applicationRepository.updateApplication(id, {
        notes: details.notes,
      });
      revalidatePath("/applications");
      return { success: true };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) };
    }
}

export async function deleteApplications(ids: string[]) {
    try {
      for (const id of ids) {
        await applicationRepository.deleteApplication(id);
      }
      await logActivity({ action: 'application_status_update', status: 'success', details: { action: 'delete', count: ids.length } });
      revalidatePath("/applications");
      return { success: true };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) };
    }
}
export async function bulkUpdateApplicationStatus(ids: string[], status: ApplicationStatus) {
    try {
      for (const id of ids) {
        await applicationRepository.updateApplication(id, { status });
      }
      await logActivity({ action: 'application_status_update', status: 'success', details: { action: 'bulk_update', status, count: ids.length } });
      revalidatePath("/applications");
      return { success: true };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) };
    }
}
