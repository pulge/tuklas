import { ApplicationsQueue } from "@/components/tracker/ApplicationsQueue";
import { Skeleton, TableRowSkeleton } from "@/components/ui/Skeleton";
import { applicationRepository } from "@/lib/db/sqlite/applications";
import { Suspense } from "react";

async function ApplicationsContent() {
  const applications = await applicationRepository.getApplications();
  const uiApps = applications.map(a => ({
    ...a,
    user_id: "local",
    job_id: a.jobId,
    applied_at: a.appliedAt,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <ApplicationsQueue initialApplications={(uiApps as any) || []} />;
}

export default async function ApplicationsPage() {
  return (
    <div className="flex flex-col h-full">
      <Suspense fallback={
        <div className="px-4 py-8 md:px-8 md:py-12 max-w-7xl mx-auto w-full">
          <div className="border-2 border-admin-border-strong bg-admin-surface">
            <div className="bg-admin-primary/5 p-4 border-b-2 border-admin-border-strong">
              <div className="grid grid-cols-4 gap-4 text-[10px] font-black uppercase tracking-widest text-admin-contrast opacity-50">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
            <div className="flex flex-col">
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRowSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      }>
        <ApplicationsContent />
      </Suspense>
    </div>
  );
}
