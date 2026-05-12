import React from "react";
import { JobCard } from "@/components/jobs/JobCard";
import type { Job } from "@/types/job";

interface JobListProps {
  jobs: Job[];
  selectedJobId?: string;
  onJobSelect?: (job: Job) => void;
}

export function JobList({ jobs, selectedJobId, onJobSelect }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-admin-border-strong rounded-none bg-admin-surface">
        <p className="text-sm text-admin-muted">
          No jobs yet. Add one manually or wait for email alerts.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {jobs.map((job) => (
        <JobCard 
          key={job.id} 
          job={job} 
          isSelected={selectedJobId === job.id}
          onClick={() => onJobSelect?.(job)}
        />
      ))}
    </div>
  );
}
