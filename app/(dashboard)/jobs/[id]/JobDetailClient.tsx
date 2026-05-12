"use client";

import { CoverLetterEditor } from "@/components/cover-letter/CoverLetterEditor";
import { JobDetail } from "@/components/jobs/JobDetail";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { StatusBadge } from "@/components/tracker/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { usePageHeader } from "@/components/ui/PageHeaderContext";
import { TruncatedTooltip } from "@/components/ui/TruncatedTooltip";
import type { CoverLetter } from "@/types/cover-letter";
import type { Job } from "@/types/job";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface JobDetailClientProps {
  job: Job;
  initialCoverLetter: CoverLetter | null;
}

export default function JobDetailClient({ job, initialCoverLetter }: JobDetailClientProps) {
  const router = useRouter();

  const headerConfig = React.useMemo(
    () => ({
      title: job.title,
      subtitle: "Job Details",
      aside: (
        <div className="flex items-center gap-2 text-xl font-bold opacity-70 pb-1">
          <TruncatedTooltip
            text={job.company}
            className="max-w-[200px]"
            position="bottom"
          />
          {job.location && (
            <>
              <span className="opacity-30 shrink-0">·</span>
              <TruncatedTooltip
                text={job.location}
                className="max-w-[150px]"
                position="bottom"
              />
            </>
          )}
        </div>
      ),
      actions: (
        <div className="flex flex-col gap-3 items-end">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex items-center gap-2"
            size="sm"
          >
            <ArrowLeft size={18} />
            Go Back
          </Button>
        </div>
      ),
    }),
    [job, router],
  );

  usePageHeader(headerConfig);

  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [coverLetterContent, setCoverLetterContent] = React.useState(
    initialCoverLetter?.content ?? "",
  );

  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

  const handleGenerate = async () => {
    setIsConfirmOpen(true);
  };

  const executeGenerate = async () => {
    setIsGenerating(true);
    try {
      const { generateCoverLetterAction } = await import("@/app/actions/cover-letter-actions");
      const { toast } = await import("@/lib/toast");

      const handleError = (errorMessage: string) => {
        if (errorMessage.includes("No Resume found")) {
          toast.error(
            <div className="flex flex-col gap-3">
              <span className="font-bold">{errorMessage}</span>
              <Link href="/setup">
                <Button size="sm" className="w-full h-8 uppercase text-[10px] font-black tracking-widest">
                  Go to Setup
                </Button>
              </Link>
            </div>,
            { duration: 6000 },
          );
        } else {
          toast.error(errorMessage);
        }
      };

      const result = await generateCoverLetterAction(job.id);

      if ('error' in result && result.error) {
        handleError(result.error);
      } else if ('content' in result && result.content) {
        setCoverLetterContent(result.content);
        toast.success("Cover letter generated!");
      }
    } catch (error) {
      const { toast } = await import("@/lib/toast");
      toast.error(error instanceof Error ? error.message : "Failed to generate cover letter");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async (content: string) => {
    setIsSaving(true);
    try {
      const { saveCoverLetterAction } = await import("@/app/actions/cover-letter-actions");
      const { toast } = await import("@/lib/toast");

      const result = await saveCoverLetterAction(job.id, content);

      if (result.error) {
        toast.error(result.error);
      } else {
        setCoverLetterContent(content);
        toast.success("Cover letter saved!");
      }
    } catch (error) {
      const { toast } = await import("@/lib/toast");
      toast.error(error instanceof Error ? error.message : "Failed to save cover letter");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-none px-4 md:px-8 py-6 md:py-10 flex flex-col lg:flex-row gap-12">
      <div className="flex-1">
        {/* Metadata Bar */}
        <div className="flex flex-wrap gap-8 mb-8 pb-8 border-b-2 border-admin-border-strong/30">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-muted">Application Status</span>
            <StatusBadge status={job.status || 'unknown'} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-muted">Source Platform</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-admin-heading border-admin-border-strong font-black uppercase text-[10px]">
                {job.platform}
              </Badge>
            </div>
          </div>
        </div>

        <JobDetail job={job} />
      </div>

      {/* Right Column: Workspace */}
      <div className="w-full lg:w-[450px] shrink-0">
        <div className="bg-admin-surface border-2 border-admin-border-strong rounded-none p-8 flex flex-col gap-6 sticky top-24">
          <div className="flex items-center justify-between border-b border-admin-border-strong pb-4">
            <h2 className="text-2xl font-black tracking-tight text-admin-heading">Workspace</h2>
          </div>


          <CoverLetterEditor
            key={coverLetterContent || "empty"}
            initialContent={coverLetterContent}
            jobStatus={job.status || undefined}
            isStreaming={isGenerating}
            isSaving={isSaving}
            onGenerate={handleGenerate}
            onSave={handleSave}
          />
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          executeGenerate();
        }}
        variant="warning"
        title="AI Processing Consent"
        description="By proceeding, you consent to your saved resume data and this job description being sent to your active AI provider to generate a tailored cover letter. Raw data is strictly used for generation and never stored by the provider for training."
        confirmLabel="I Consent"
        cancelLabel="Cancel"
      />
    </div>
  );
}
