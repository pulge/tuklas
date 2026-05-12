"use client";

import { JobCard } from "@/components/jobs/JobCard";
import { JobDetail } from "@/components/jobs/JobDetail";
import { JobsActionHeader } from "@/components/jobs/JobsActionHeader";
import { JobsEmptyState } from "@/components/jobs/JobsEmptyState";
import { BulkActionBar } from "@/components/ui/BulkActionBar";
import { Button } from "@/components/ui/Button";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { Pagination } from "@/components/ui/Pagination";
import { useBulkSelect } from "@/hooks/useBulkSelect";
import { usePagination } from "@/hooks/usePagination";
import { useSearch } from "@/hooks/useSearch";
import { Job, JobStatus } from "@/types/job";
import { exportToCsv } from "@/utils/export";
import { getJobSource } from "@/utils/format";
import { ChevronLeft, ExternalLink, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface JobsMasterDetailProps {
  jobs: Job[];
  integrations: Record<string, boolean>;
  hasResume?: boolean;
  encryptionConfigured?: boolean;
  toggles?: import("./JobsQueue").PipelineToggles;
  onToggle?: (pipeline: keyof import("./JobsQueue").PipelineToggles) => void;
  onHealthClick?: () => void;
  onRefresh?: () => Promise<void>;
  isRefreshing?: boolean;
  hasKeywords?: boolean;
}

const JOB_SEARCH_KEYS = ['title', 'company', 'location'];

export function JobsMasterDetail({
  jobs,
  integrations,
  hasResume = false,
  encryptionConfigured = false,
  toggles,
  onToggle,
  onHealthClick,
  onRefresh,
  isRefreshing = false,
  hasKeywords = false,
}: JobsMasterDetailProps) {
  const [filters, setFilters] = useState<{ platform?: string; status?: JobStatus | ""; location?: string }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isBulkLoading, setIsBulkLoading] = useState(false);
  const [deleteConfirmIds, setDeleteConfirmIds] = useState<string[] | null>(null);

  const searchedJobs = useSearch(jobs, searchQuery, JOB_SEARCH_KEYS);

  const filteredJobs = React.useMemo(() => {
    const baseFiltered = searchedJobs.filter((job) => {
      if (filters.status && (job.status as string) !== filters.status) return false;

      if (filters.platform && filters.platform !== "all") {
        const jobSource = getJobSource(job.platform, job.url ?? undefined);
        if (jobSource !== filters.platform) return false;
      }

      if (filters.location && filters.location !== "all") {
        if (job.location !== filters.location) return false;
      }

      return true;
    });

    // Apply sorting with robust date parsing and tie-breaker
    return [...baseFiltered].sort((a, b) => {
      const timeA = a.scraped_at ? new Date(a.scraped_at).getTime() : 0;
      const timeB = b.scraped_at ? new Date(b.scraped_at).getTime() : 0;

      const valA = isNaN(timeA) ? 0 : timeA;
      const valB = isNaN(timeB) ? 0 : timeB;

      if (valA !== valB) {
        return sortDirection === "desc" ? valB - valA : valA - valB;
      }

      // Tie-breaker: stable sort by ID
      return sortDirection === "desc"
        ? b.id.localeCompare(a.id)
        : a.id.localeCompare(b.id);
    });
  }, [searchedJobs, filters, sortDirection]);

  // Modular Pagination
  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    paginatedItems: paginatedJobs
  } = usePagination(filteredJobs, 24);

  // Reusable Bulk Selection
  const {
    selectedIds,
    selectedItems: selectedJobs,
    handleToggleSelect,
    handleSelectAll,
    clearSelection,
    isAllSelected,
    count: selectedCount
  } = useBulkSelect(paginatedJobs);

  const handleBulkAction = async (action: 'skip' | 'apply' | 'delete') => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    if (action === 'delete') {
      setDeleteConfirmIds(ids);
      return;
    }

    const { toast } = await import("@/lib/toast");
    const { bulkUpdateJobStatus } = await import("@/app/actions/job-actions");

    setIsBulkLoading(true);
    try {
      if (action === 'apply') {
        const result = await bulkUpdateJobStatus(ids, 'applied');
        if (result && 'error' in result) {
          toast.error(result.error);
          return;
        }
        toast.success(`Marked ${ids.length} jobs as applied.`);
      } else if (action === 'skip') {
        const result = await bulkUpdateJobStatus(ids, 'skipped');
        if (result && 'error' in result) {
          toast.error(result.error);
          return;
        }
        toast.success(`Skipped ${ids.length} jobs.`);
      }
      clearSelection();
    } catch {
      toast.error("Bulk action failed.");
    } finally {
      setIsBulkLoading(false);
    }
  };

  const handleConfirmBulkDelete = async () => {
    if (!deleteConfirmIds) return;
    const { toast } = await import("@/lib/toast");
    const { deleteJobs } = await import("@/app/actions/job-actions");

    setIsBulkLoading(true);
    try {
      const result = await deleteJobs(deleteConfirmIds);
      if (result && 'error' in result) {
        toast.error(result.error);
      } else {
        toast.success(`Deleted ${deleteConfirmIds.length} jobs.`);
        clearSelection();
        setDeleteConfirmIds(null);
      }
    } catch {
      toast.error("Deletion failed.");
    } finally {
      setIsBulkLoading(false);
    }
  };

  const selectedJob = jobs.find(j => j.id === selectedJobId);

  // Calculate unique sources from current jobs
  const availableSources = React.useMemo(() => {
    const uniqueSources = Array.from(new Set(jobs.map(j => getJobSource(j.platform, j.url ?? undefined))));
    return ["all", ...uniqueSources.sort()];
  }, [jobs]);

  // Calculate unique locations from current jobs
  const availableLocations = React.useMemo(() => {
    const uniqueLocations = Array.from(new Set(jobs.map(j => j.location).filter(Boolean)));
    return ["all", ...(uniqueLocations as string[]).sort()];
  }, [jobs]);


  const exportAsCsv = () => {
    const headers = ["Title", "Company", "Location", "Platform", "Status", "URL", "Salary", "Date Ingested"];
    const rows = filteredJobs.map(job => [
      job.title,
      job.company,
      job.location || "",
      getJobSource(job.platform, job.url ?? undefined),
      job.status,
      job.url || "",
      job.salary || "",
      job.scraped_at || ""
    ]);
    exportToCsv(headers, rows, "tuklas_jobs");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 lg:h-full lg:overflow-hidden relative w-full min-w-0 overflow-hidden">
      {/* List Column */}
      <div className={`flex-1 lg:overflow-y-auto px-4 md:px-8 py-8 md:py-12 transition-all duration-300 ${selectedJobId ? 'hidden max-h-[87vh] lg:block lg:max-w-md border-r border-admin-border-strong' : 'block max-w-none'}`}>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col">
            {/* Filters */}
            <JobsActionHeader
              availableSources={availableSources}
              availableLocations={availableLocations}
              onFilterChange={(newFilters) => {
                setFilters(prev => ({ ...prev, ...newFilters }));
                setSelectedJobId(null);
              }}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              isCompact={!!selectedJobId}
              sortDirection={sortDirection}
              onSortToggle={() => setSortDirection(prev => prev === "desc" ? "asc" : "desc")}
              isAllSelected={isAllSelected}
              onSelectAll={handleSelectAll}
              onExport={exportAsCsv}
              hasJobs={filteredJobs.length > 0}
            />
          </div>

          {filteredJobs.length === 0 ? (
            <JobsEmptyState
              hasKeywords={hasKeywords}
              onRefresh={onRefresh}
              isRefreshing={isRefreshing}
              integrations={integrations}
              onHealthClick={onHealthClick}
              hasResume={hasResume}
              encryptionConfigured={encryptionConfigured}
              toggles={toggles}
              onToggle={onToggle}
            />
          ) : (
            <div className={`grid gap-3 ${selectedJobId ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {paginatedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSelected={selectedJobId === job.id}
                  isMultiSelected={selectedIds.has(job.id)}
                  onMultiSelectToggle={(checked) => handleToggleSelect(job.id, checked)}
                  onClick={() => setSelectedJobId(job.id)}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {filteredJobs.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={(p) => {
                setCurrentPage(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onPageSizeChange={setPageSize}
              pageSizeOptions={[24, 48, 96]}
            />
          )}
        </div>
      </div>

      {/* Reusable Bulk Action Bar */}
      <BulkActionBar
        count={selectedCount}
        onClear={clearSelection}
        actions={[
          {
            label: 'Mark Applied',
            onClick: () => handleBulkAction('apply'),
            isLoading: isBulkLoading,
            isVisible: selectedJobs.length > 0 && selectedJobs.every(j => j.status !== 'applied'),
            variant: 'success'
          },
          {
            label: 'Skip',
            onClick: () => handleBulkAction('skip'),
            isLoading: isBulkLoading,
            isVisible: selectedJobs.length > 0 && selectedJobs.every(j => j.status !== 'applied'),
            variant: 'outline'
          },
          {
            label: 'Delete',
            onClick: () => handleBulkAction('delete'),
            isLoading: isBulkLoading,
            variant: 'danger'
          }
        ]}
      />

      {/* Detail/Preview Column */}
      {selectedJob && (
        <div className="flex-1 bg-admin-surface lg:overflow-y-auto px-4 md:px-10 py-6 md:py-12 relative animate-in slide-in-from-right-10 duration-300">
          <div className="flex justify-between items-center mb-6 lg:mb-0">
            <button
              onClick={() => setSelectedJobId(null)}
              className="lg:hidden flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-admin-muted hover:text-admin-heading transition-colors border-2 border-admin-border-strong px-3 py-1.5"
            >
              <ChevronLeft /> Back to List
            </button>
            <button
              onClick={() => setSelectedJobId(null)}
              className="hidden lg:block absolute top-6 right-6 p-2 hover:bg-admin-surface-hover transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 md:gap-6">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-accent mb-1">Job Preview</p>
                <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-admin-heading mb-3 leading-none break-words uppercase italic">
                  {selectedJob.title}
                </h2>
                <p className="text-xs md:text-sm font-black text-admin-muted uppercase tracking-[0.15em] opacity-70 break-words">
                  {selectedJob.company} {selectedJob.location ? `· ${selectedJob.location}` : ""}
                </p>
              </div>
              <Link href={`/jobs/${selectedJob.id}`} className="shrink-0 w-full sm:w-auto">
                <Button variant="outline" className="gap-2 text-xs py-1.5 w-full sm:w-auto">
                  View <ExternalLink size={14} />
                </Button>
              </Link>
            </div>

            <JobDetail job={selectedJob} />
          </div>
        </div>
      )}
      <ConfirmationDialog
        isOpen={deleteConfirmIds !== null}
        onClose={() => setDeleteConfirmIds(null)}
        onConfirm={handleConfirmBulkDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to permanently delete ${deleteConfirmIds?.length} job${deleteConfirmIds?.length !== 1 ? 's' : ''}? This action cannot be undone.`}
        confirmLabel="Delete Permanently"
        variant="danger"
        isLoading={isBulkLoading}
      />
    </div>
  );
}
