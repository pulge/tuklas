"use client";

import { createApplication } from "@/app/actions/application-actions";
import { skipJob } from "@/app/actions/job-actions";
import { Button } from "@/components/ui/Button";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { toast } from "@/lib/toast";
import type { Job } from "@/types/job";
import { formatRelativeTime, getJobSource } from "@/utils/format";
import { Check, ExternalLink } from "lucide-react";
import { useState } from "react";

interface JobDetailProps {
  job: Job;
  onActionComplete?: () => void;
  isReadOnly?: boolean;
}

export function JobDetail({ job, onActionComplete, isReadOnly = false }: JobDetailProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleReadOnlyClick = () => {
    toast.error("Sign up to perform this action!", {
      icon: "🔒",
      style: {
        borderRadius: '0px',
        border: '2px solid #000000',
        background: '#FFFFFF',
        color: '#000000',
        fontSize: '11px',
        fontWeight: '900',
        textTransform: 'uppercase',
      }
    });
  };


  const handleSkip = async () => {
    if (isReadOnly) return handleReadOnlyClick();
    setIsSkipping(true);
    try {
      const result = await skipJob(job.id);
      if (result && 'error' in result) {
        toast.error(result.error);
      } else {
        toast.success("Job skipped.");
        onActionComplete?.();
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to skip job");
    } finally {
      setIsSkipping(false);
    }
  };

  const handleApply = async () => {
    if (isReadOnly) return handleReadOnlyClick();
    setIsApplying(true);
    try {
      const result = await createApplication(job.id);
      if (result && 'error' in result) {
        toast.error(result.error);
      } else {
        toast.success("Logged as applied! Moved to Active Applications.");
        onActionComplete?.();
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to log application");
    } finally {
      setIsApplying(false);
    }
  };

  const handlePermanentDelete = async () => {
    if (isReadOnly) return handleReadOnlyClick();
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsSkipping(true); // Reuse skipping state for loading
    try {
      const { deleteJobs } = await import("@/app/actions/job-actions");
      const result = await deleteJobs([job.id]);
      if (result && 'error' in result) {
        toast.error(result.error);
      } else {
        toast.success("Job permanently deleted.");
        onActionComplete?.();
        setIsDeleteModalOpen(false);
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to delete job");
    } finally {
      setIsSkipping(false);
    }
  };

  const DESCRIPTION_LIMIT = 800;
  const isLongDescription = (job.description?.length || 0) > DESCRIPTION_LIMIT;
  const displayDescription = isLongDescription && !isExpanded
    ? `${job.description?.slice(0, DESCRIPTION_LIMIT)}...`
    : job.description;

  return (
    <div className="flex flex-col gap-12">
      {/* Redundant headers removed as they are now in the Hero section */}

      {/* Description */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-admin-muted">
            Description
          </h2>
          <div className="flex flex-col items-end gap-1">
            {job.posted_at && (
              <span className="text-[10px] font-black uppercase tracking-widest text-admin-muted">
                Posted {formatRelativeTime(job.posted_at)}
              </span>
            )}
            <span className="text-[10px] font-black uppercase tracking-widest text-admin-muted opacity-60">
              Found {formatRelativeTime(job.scraped_at || undefined)}
            </span>
          </div>
        </div>

        <div className="text-sm text-admin-text leading-6 whitespace-pre-wrap relative line-clamp-10">
          {displayDescription || (
            <span className="text-admin-muted">No description available.</span>
          )}

          {isLongDescription && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 block text-xs font-black uppercase tracking-widest text-admin-accent hover:underline"
            >
              {isExpanded ? "Show Less" : "See More"}
            </button>
          )}

        </div>
      </div>
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 border-t border-admin-surface-hover pt-6 mt-auto">
        {(job.status !== 'applied') && (
          <Button
            variant="default"
            className="col-span-2 sm:w-auto px-6 py-3 font-black uppercase tracking-widest text-xs"
            onClick={handleApply}
            isLoading={isApplying}
            disabled={isSkipping}
          >
            <Check size={14} className="mr-1" />
            Mark as Applied
          </Button>
        )}

        {job.status !== 'applied' && (
          <Button
            variant="outline"
            onClick={handleSkip}
            isLoading={isSkipping}
            disabled={isApplying}
            className="col-span-1 sm:w-auto border-admin-danger/50 text-admin-danger hover:bg-admin-danger/10 px-4 sm:px-6"
          >
            Skip
          </Button>
        )}

        <Button
          variant="danger"
          onClick={handlePermanentDelete}
          disabled={isApplying || isSkipping}
          className="col-span-1 sm:w-auto bg-admin-danger text-admin-contrast hover:bg-admin-danger/90 px-4 sm:px-6"
        >
          Delete
        </Button>


        {job.url && (
          <a
            href={isReadOnly ? "#" : job.url}
            onClick={isReadOnly ? (e) => { e.preventDefault(); handleReadOnlyClick(); } : undefined}
            target={isReadOnly ? undefined : "_blank"}
            rel={isReadOnly ? undefined : "noopener noreferrer"}
            className="col-span-2 sm:w-auto"
          >
            <Button variant="outline" size="md" className="w-full sm:w-auto gap-2 text-[10px] uppercase !text-admin-accent font-black tracking-widest border-2">
              Redirect to Site <ExternalLink size={14} />
            </Button>
          </a>
        )}

        {/* Source Info */}
        <div className="col-span-2 sm:flex-1 flex items-center justify-between sm:justify-end sm:ml-auto gap-2 py-2 border-t sm:border-t-0 border-admin-border-strong sm:pt-0 mt-2 sm:mt-0">
          <span className="text-[10px] font-black uppercase tracking-widest text-admin-muted">Source</span>
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-admin-surface-hover border-2 border-admin-border-strong text-admin-heading">
            {getJobSource(job.platform, job.url)}
          </span>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Job"
        description="Are you sure you want to permanently delete this job? This action cannot be undone."
        confirmLabel="Delete Permanently"
        variant="danger"
        isLoading={isSkipping}
      />
    </div>
  );
}
