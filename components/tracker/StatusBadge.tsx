"use client";

import type { ApplicationStatus } from "@/types/application";
import type { JobStatus } from "@/types/job";

type Status = JobStatus | ApplicationStatus;

const styles: Record<Status, string> = {
  new: "text-admin-heading bg-admin-bg border border-admin-border-strong",
  existing: "text-admin-muted bg-admin-surface",
  skipped: "text-admin-muted bg-admin-surface-hover",
  applied: "text-admin-accent bg-admin-accent/10",
  interview: "text-admin-success bg-admin-success/10",
  offer: "text-admin-success bg-admin-success/10",
  rejected: "text-admin-danger bg-admin-danger/10",
};

const labels: Record<Status, string> = {
  new: "New",
  existing: "Existing",
  skipped: "Skipped",
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center px-2.5 py-1 rounded-none text-[10px] font-black uppercase tracking-widest ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
