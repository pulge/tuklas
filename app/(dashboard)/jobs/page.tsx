import React, { Suspense } from "react";
import { JobsQueue } from "@/components/jobs/JobsQueue";
import type { Job } from "@/types/job";
import { JobCardSkeleton } from "@/components/ui/Skeleton";
import { jobRepository } from "@/lib/db/sqlite/jobs";
import { profileRepository } from "@/lib/db/sqlite/profile";
import { integrationRepository } from "@/lib/db/sqlite/integrations";

async function JobsContent() {
  const jobs = await jobRepository.getJobs();
  const uiJobs = jobs.map(j => ({
    ...j,
    user_id: "local",
    posted_at: j.postedAt,
    scraped_at: j.createdAt || new Date().toISOString(),
  }));

  const profile = await profileRepository.get();
  
  const integrationStatuses = { 
    rapidapi: !!(await integrationRepository.get('rapidapi')),
    gmail: !!(await integrationRepository.get('gmail')),
    gemini: !!(await integrationRepository.get('gemini')),
    openrouter: !!(await integrationRepository.get('openrouter'))
  };

  const preferences = profile?.preferences ? JSON.parse(profile.preferences) : {};

  return (
    <JobsQueue
      initialJobs={(uiJobs as Job[]) || []}
      keywords={preferences.keywords || []}
      location={preferences.location}
      integrations={integrationStatuses}
      hasResume={!!profile?.resumeCleaned || !!profile?.resumeRaw}
      initialPreferences={preferences}
    />
  );
}

export default async function JobsPage() {
  return (
    <div className="flex flex-col h-full">
      <Suspense fallback={
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      }>
        <JobsContent />
      </Suspense>
    </div>
  );
}
