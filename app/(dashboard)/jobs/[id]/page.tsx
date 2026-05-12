import React from "react";
import { notFound } from "next/navigation";
import { jobRepository } from "@/lib/db/sqlite/jobs";
import { coverLetterRepository } from "@/lib/db/sqlite/cover-letters";
import JobDetailClient from "./JobDetailClient";
import { Job } from "@/types/job";
import { CoverLetter } from "@/types/cover-letter";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await jobRepository.getJob(id);

  if (!job) {
    notFound();
  }

  const initialCoverLetter = await coverLetterRepository.getByJobId(id);

  // Map to UI Job type
  const mappedJob: Job = {
    ...job,
    user_id: "local",
    status: (job.status as Job["status"]) || "new",
    posted_at: job.postedAt || undefined,
    scraped_at: job.createdAt || new Date().toISOString(),
  };

  const mappedCoverLetter = initialCoverLetter ? {
    ...initialCoverLetter,
    user_id: "local",
    job_id: initialCoverLetter.jobId || "",
    raw_content: initialCoverLetter.rawContent || "",
    model_used: initialCoverLetter.modelUsed || "",
    generated_at: initialCoverLetter.generatedAt || new Date().toISOString(),
  } : null;

  return (
    <div className="flex flex-col min-h-full">
      <JobDetailClient job={mappedJob} initialCoverLetter={mappedCoverLetter as CoverLetter | null} />
    </div>
  );
}
