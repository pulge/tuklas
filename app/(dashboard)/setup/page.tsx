import { Skeleton } from "@/components/ui/Skeleton";
import { applicationRepository } from "@/lib/db/sqlite/applications";
import { jobRepository } from "@/lib/db/sqlite/jobs";
import { profileRepository } from "@/lib/db/sqlite/profile";
import { Suspense } from "react";
import SetupClient from "./SetupClient";

export default async function SetupPage() {
  const jobs = await jobRepository.getJobs();
  const applications = await applicationRepository.getApplications();
  const profile = await profileRepository.get();

  const jobsCount = jobs.length;
  const appsCount = applications.length;
  const interviewsCount = applications.filter((app) => app.status === 'interviewing').length;

  const preferences = profile?.preferences ? JSON.parse(profile.preferences) : {};

  return (
    <div className="flex flex-col h-full">
      <Suspense fallback={
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="border-2 border-admin-border-strong p-6 flex flex-col gap-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="border-2 border-admin-border-strong p-6 flex flex-col gap-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      }>
        <SetupClient
          jobsCount={jobsCount}
          appsCount={appsCount}
          interviewsCount={interviewsCount}
          initialPreferences={preferences}
          initialCvText={profile?.resumeCleaned || profile?.resumeRaw}
          initialCvFilename={preferences.cv_filename}
        />
      </Suspense>
    </div>
  );
}
