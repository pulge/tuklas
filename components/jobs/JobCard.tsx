"use client";

import React from "react";
import { Job } from "@/types/job";
import { formatRelativeTime, getJobSource } from "@/utils/format";

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onClick: () => void;
  showDetailOnMobile?: boolean;
  isMultiSelected?: boolean;
  onMultiSelectToggle?: (checked: boolean) => void;
}

export function JobCard({ 
  job, 
  isSelected, 
  onClick, 
  isMultiSelected = false, 
  onMultiSelectToggle 
}: JobCardProps) {


  return (
    <div
      onClick={onClick}
      className={`relative flex items-center gap-4 p-4 border-2 transition-all cursor-pointer group ${isSelected
        ? "border-admin-accent bg-admin-surface-hover shadow-[4px_4px_0px_0px_rgba(var(--admin-accent-rgb),1)]"
        : job.status === "applied"
            ? "border-admin-success/30 bg-admin-surface hover:border-admin-success"
            : job.status === "skipped"
              ? "border-admin-danger/30 bg-admin-surface hover:border-admin-danger"
              : "border-admin-border-strong bg-admin-surface hover:border-admin-warning/50"
        }`}
    >
      {/* Status Indicator Bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${job.status === "applied"
            ? "bg-admin-success"
            : job.status === "skipped"
              ? "bg-admin-danger"
              : "bg-admin-warning"
          }`}
      />

      {/* Multi-select Checkbox - Visible on hover or when selected */}
      <div 
        className={`absolute left-3 top-3 z-10 transition-opacity duration-200 ${
          isMultiSelected ? "opacity-100" : "opacity-30 sm:opacity-0 group-hover:opacity-100"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={isMultiSelected}
          onChange={(e) => onMultiSelectToggle?.(e.target.checked)}
          className="w-4 h-4 cursor-pointer accent-admin-accent border-2 border-admin-border-strong rounded-none"
        />
      </div>

      <div
        className={`w-12 h-12 flex items-center justify-center shrink-0 border-2 border-admin-border-strong transition-colors ${isSelected
          ? "bg-admin-accent text-admin-contrast"
          : job.status === "applied"
              ? "bg-admin-success text-admin-contrast"
              : job.status === "skipped"
                ? "bg-admin-danger text-admin-contrast"
                : "bg-admin-primary text-admin-contrast"
          }`}
      >
        <span className="font-black text-lg">{job.company.charAt(0)}</span>
      </div>

      <div className="flex-1 min-w-0 pr-16">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-xs font-black text-admin-heading truncate uppercase tracking-tight">
            {job.title}
          </h3>
          {job.status === "new" ? (
            <span className="px-1.5 py-0.5 bg-admin-warning text-[8px] font-black text-admin-primary uppercase tracking-tighter animate-pulse shadow-[0_0_8px_rgba(var(--admin-warning-rgb),0.4)]">
              NEW
            </span>
          ) : job.status !== "existing" && (
            <span
              className={`px-1.5 py-0.5 text-[8px] font-black uppercase tracking-tighter ${job.status === "applied"
                  ? "bg-admin-success text-admin-contrast"
                  : job.status === "skipped"
                    ? "bg-admin-danger text-admin-contrast"
                    : "bg-admin-muted text-admin-contrast"
                }`}
            >
              {job.status}
            </span>
          )}
        </div>
        <p className="text-[10px] text-admin-muted font-bold truncate opacity-70 uppercase tracking-wider">
          {job.company}
        </p>
      </div>

      <div className="absolute top-4 right-4 text-[9px] font-black opacity-30 uppercase text-right">
        {formatRelativeTime(job.scraped_at || undefined)}
      </div>

      <div className="absolute bottom-3 right-4">
        <span className="text-[8px] font-black uppercase tracking-widest text-admin-muted opacity-50 border border-admin-border-strong px-1.5 py-0.5">
          {getJobSource(job.platform, job.url)}
        </span>
      </div>
    </div>
  );
}
