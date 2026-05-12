"use client";

import { bulkUpdateApplicationStatus, deleteApplications, updateApplicationDetails, updateApplicationStatus } from "@/app/actions/application-actions";
import { ApplicationDetailsDrawer } from "@/components/tracker/ApplicationDetailsDrawer";
import { ApplicationFilters } from "@/components/tracker/ApplicationFilters";
import { BulkActionBar } from "@/components/ui/BulkActionBar";
import { Button } from "@/components/ui/Button";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { Pagination } from "@/components/ui/Pagination";
import { SortButton } from "@/components/ui/SortButton";
import { TruncatedTooltip } from "@/components/ui/TruncatedTooltip";
import { useBulkSelect } from "@/hooks/useBulkSelect";
import { usePagination } from "@/hooks/usePagination";
import { useSearch } from "@/hooks/useSearch";
import { toast } from "@/lib/toast";
import type { Application, ApplicationStatus } from "@/types/application";
import { exportToCsv } from "@/utils/export";
import { getJobSource } from "@/utils/format";
import { ArrowUpRight, Calendar, ClipboardEdit, Download } from "lucide-react";
import React, { useState } from "react";

interface ApplicationTableProps {
  applications: Application[];
}

const statuses: ApplicationStatus[] = ["applied", "interview", "offer", "rejected"];
const APPLICATION_SEARCH_KEYS = ['job.company', 'job.title', 'notes'];

const TABLE_HEADERS = [
  { label: "Company", align: "left" },
  { label: "Role", align: "left" },
  { label: "Applied Date", align: "left" },
  { label: "Notes", align: "left" },
  { label: "Status", align: "left" },
  { label: "Actions", align: "right" },
] as const;

// ─── Shared Formatters ───────────────────────────────────────────────────────

const formatDate = (dateString?: string) => {
  if (!dateString) return "Not set";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatDateTime = (dateString?: string) => {
  if (!dateString) return "Not set";
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

// ─── Sub-components for DRYness ──────────────────────────────────────────────

interface StatusSelectProps {
  app: Application;
}

function StatusSelect({ app }: StatusSelectProps) {
  return (
    <select
      value={app.status}
      onChange={async (e) => {
        const newStatus = e.target.value as ApplicationStatus;
        try {
          const result = await updateApplicationStatus(app.id, newStatus);
          if (result && 'error' in result) {
            toast.error(result.error);
          } else {
            toast.success(`Status updated to ${newStatus}`);
          }
        } catch (err: unknown) {
          toast.error(err instanceof Error ? err.message : "Failed to update status");
        }
      }}
      className="w-full border-2 border-admin-border-strong bg-admin-surface rounded-none px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-admin-heading focus:outline-none focus:ring-4 focus:ring-admin-accent/10 transition-all cursor-pointer hover:border-admin-accent"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s.toUpperCase()}
        </option>
      ))}
    </select>
  );
}

function CompanyInfo({ app, mobile }: { app: Application; mobile?: boolean }) {
  return (
    <div className="flex flex-col min-w-0">
      <TruncatedTooltip
        text={app.job?.company || ""}
        className={`text-admin-heading font-black uppercase tracking-tight ${mobile ? 'text-sm' : 'text-xs'}`}
      />
      <div className="flex items-center gap-2 mt-0.5">
        <span className="text-[10px] font-bold text-admin-muted uppercase tracking-tighter">
          {getJobSource(app.job?.platform || "", app.job?.url)}
        </span>
        {app.job?.location && (
          <>
            <span className="text-[10px] text-admin-muted opacity-40">•</span>
            <span className="text-[10px] font-bold text-admin-muted uppercase tracking-tighter italic">
              {app.job.location}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function AppliedDate({ date }: { date?: string }) {
  return (
    <div className="flex items-center gap-2 text-admin-muted font-bold text-xs">
      <Calendar size={14} className="opacity-40" />
      {formatDate(date)}
    </div>
  );
}

function InterviewOrNotes({ app }: { app: Application }) {
  if (app.status === 'interview') {
    return (
      <div className="flex items-center gap-2 text-admin-accent font-black text-xs">
        <Calendar size={14} />
        {formatDateTime(app.interview_at || undefined)}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 text-admin-muted/40 font-bold text-xs italic">
      {app.notes ? (
        <div className="flex items-center gap-1 text-admin-text/60 not-italic">
          <ClipboardEdit size={14} />
          Has Notes
        </div>
      ) : "None"}
    </div>
  );
}

function ManageButton({ onClick, mobile }: { onClick: () => void; mobile?: boolean }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={`gap-2 text-[10px] font-black uppercase ${mobile ? "py-2" : ""}`}
    >
      Manage <ArrowUpRight size={14} />
    </Button>
  );
}

export function ApplicationTable({ applications }: ApplicationTableProps) {
  const [filters, setFilters] = useState<{ platform?: string; status?: ApplicationStatus | ""; location?: string }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc");
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const selectedApp = React.useMemo(
    () => applications.find((app) => app.id === selectedAppId) || null,
    [applications, selectedAppId]
  );

  const searchedApplications = useSearch(applications, searchQuery, APPLICATION_SEARCH_KEYS);

  const filteredApplications = React.useMemo(() => {
    const baseFiltered = searchedApplications.filter((app) => {
      if (filters.status && (app.status as string) !== filters.status) return false;

      if (filters.platform && filters.platform !== "all") {
        const source = getJobSource(app.job?.platform || "", app.job?.url);
        if (source !== filters.platform) return false;
      }

      if (filters.location && filters.location !== "all") {
        if (app.job?.location !== filters.location) return false;
      }

      return true;
    });

    // Apply sorting
    return baseFiltered.sort((a, b) => {
      const dateA = new Date(a.applied_at || 0).getTime();
      const dateB = new Date(b.applied_at || 0).getTime();
      return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [searchedApplications, filters, sortDirection]);

  // Use Modular Pagination
  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    paginatedItems: paginatedApps
  } = usePagination(filteredApplications, 10);

  // Bulk Selection
  const {
    selectedIds,
    selectedItems: selectedApps,
    handleToggleSelect,
    handleSelectAll,
    clearSelection,
    isAllSelected,
    count: selectedCount
  } = useBulkSelect(paginatedApps);

  const [isBulkLoading, setIsBulkLoading] = useState(false);
  const [deleteConfirmIds, setDeleteConfirmIds] = useState<string[] | null>(null);

  const handleBulkAction = async (action: ApplicationStatus | 'delete') => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    if (action === 'delete') {
      setDeleteConfirmIds(ids);
      return;
    }

    setIsBulkLoading(true);
    try {
      const result = await bulkUpdateApplicationStatus(ids, action);
      if (result && 'error' in result) {
        toast.error(result.error);
      } else {
        toast.success(`Updated ${ids.length} applications.`);
        clearSelection();
      }
    } catch {
      toast.error("Bulk action failed.");
    } finally {
      setIsBulkLoading(false);
    }
  };

  const handleConfirmBulkDelete = async () => {
    if (!deleteConfirmIds) return;
    setIsBulkLoading(true);
    try {
      const result = await deleteApplications(deleteConfirmIds);
      if (result && 'error' in result) {
        toast.error(result.error);
      } else {
        toast.success(`Deleted ${deleteConfirmIds.length} applications.`);
        clearSelection();
        setDeleteConfirmIds(null);
      }
    } catch {
      toast.error("Deletion failed.");
    } finally {
      setIsBulkLoading(false);
    }
  };

  // Calculate unique sources from applications
  const availableSources = React.useMemo(() => {
    const uniqueSources = Array.from(new Set(
      applications.map((app) => getJobSource(app.job?.platform || "", app.job?.url))
    ));
    return ["all", ...uniqueSources.sort()];
  }, [applications]);

  // Calculate unique locations from applications
  const availableLocations = React.useMemo(() => {
    const uniqueLocations = Array.from(new Set(
      applications.map((app) => app.job?.location).filter(Boolean)
    ));
    return ["all", ...(uniqueLocations as string[]).sort()];
  }, [applications]);


  const exportAsCsv = () => {
    const headers = ["Company", "Role", "Location", "Status", "Applied At", "Source", "URL"];
    const rows = filteredApplications.map(app => [
      app.job?.company || "",
      app.job?.title || "",
      app.job?.location || "",
      app.status,
      app.applied_at || "",
      getJobSource(app.job?.platform || "", app.job?.url),
      app.job?.url || ""
    ]);
    exportToCsv(headers, rows, "tuklas_applications");
  };

  return (
    <div className="flex flex-col gap-10 min-w-0 w-full overflow-hidden">
      {/* Filters & Export */}
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 w-full">
          <div className="flex-1 min-w-0">
            <ApplicationFilters
              sources={availableSources}
              locations={availableLocations}
              onFilterChange={(newFilters) => {
                setFilters(prev => ({ ...prev, ...newFilters }));
              }}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <SortButton
              direction={sortDirection}
              onToggle={() => setSortDirection(prev => prev === "desc" ? "asc" : "desc")}
            />
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-2 h-[42px] px-6 flex-1 md:flex-initial justify-center"
              onClick={exportAsCsv}
              disabled={filteredApplications.length === 0}
            >
              <Download size={16} />
              CSV/Excel
            </Button>
          </div>
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="text-center py-16 border-2 border-admin-border-strong rounded-none bg-admin-surface">
          <p className="text-sm text-admin-muted uppercase font-bold tracking-tighter italic">
            No submissions found matching the selected filters.
          </p>
        </div>
      ) : (
        <div className="w-full border-2 border-admin-border-strong rounded-none bg-admin-surface shadow-[4px_4px_0px_0px_rgba(var(--admin-primary),0.1)] overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-admin-primary/5 border-b-2 border-admin-border-strong">
                <tr>
                  <th className="px-6 py-4 w-10">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 accent-admin-accent cursor-pointer"
                    />
                  </th>
                  {TABLE_HEADERS.map((header) => (
                    <th
                      key={header.label}
                      className={`px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-admin-muted ${header.align === "right" ? "text-right" : ""
                        }`}
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-admin-border-strong">
                {paginatedApps.map((app) => (
                  <tr key={app.id} className="hover:bg-admin-surface-hover/50 transition-colors duration-150 group">
                    <td className="px-6 py-5">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(app.id)}
                        onChange={(e) => handleToggleSelect(app.id, e.target.checked)}
                        className={`w-4 h-4 cursor-pointer accent-admin-accent transition-opacity duration-200 ${selectedIds.has(app.id) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                      />
                    </td>
                    <td className="px-6 py-5 max-w-[300px]">
                      <CompanyInfo app={app} />
                    </td>
                    <td className="px-6 py-5 text-admin-text font-bold max-w-[300px]">
                      <TruncatedTooltip text={app.job?.title || ""} />
                    </td>
                    <td className="px-6 py-5">
                      <AppliedDate date={app.applied_at || undefined} />
                    </td>
                    <td className="px-6 py-5">
                      <InterviewOrNotes app={app} />
                    </td>
                    <td className="px-6 py-5 min-w-[140px]">
                      <StatusSelect app={app} />
                    </td>
                    <td className="px-6 py-5 text-right">
                      <ManageButton onClick={() => setSelectedAppId(app.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards View */}
          <div className="md:hidden flex flex-col divide-y-2 divide-admin-border-strong">
            {paginatedApps.map((app) => (
              <div key={app.id} className="p-5 flex flex-col gap-6 hover:bg-admin-surface-hover/50 transition-colors relative group">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-4 items-start flex-1 min-w-0">
                    {/* Mobile Checkbox */}
                    <div className="pt-1">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(app.id)}
                        onChange={(e) => handleToggleSelect(app.id, e.target.checked)}
                        className={`w-5 h-5 cursor-pointer accent-admin-accent transition-opacity duration-200 ${selectedIds.has(app.id) ? "opacity-100" : "opacity-40 group-hover:opacity-100"
                          }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CompanyInfo app={app} mobile />
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-admin-muted uppercase tracking-widest border-2 border-admin-border-strong px-2 py-1 bg-admin-surface-hover shrink-0">
                    {getJobSource(app.job?.platform || "", app.job?.url)}
                  </span>
                </div>

                <div className="flex flex-col gap-3 pl-9">
                  <span className="text-admin-heading font-black uppercase tracking-tight text-xs leading-relaxed">{app.job?.title}</span>
                  <div className="grid grid-cols-1 gap-2">
                    <AppliedDate date={app.applied_at || undefined} />
                    <InterviewOrNotes app={app} />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 mt-2 border-t-2 border-admin-border-strong pt-5 pl-9">
                  <div className="flex-1">
                    <StatusSelect app={app} />
                  </div>
                  <ManageButton onClick={() => setSelectedAppId(app.id)} mobile />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredApplications.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[5, 10, 25, 50]}
        />
      )}

      {/* Bulk Action Bar */}
      <BulkActionBar
        count={selectedCount}
        onClear={clearSelection}
        actions={[
          {
            label: 'Move to Interview',
            onClick: () => handleBulkAction('interview'),
            isLoading: isBulkLoading,
            variant: 'success',
            isVisible: selectedApps.every(a => a.status === 'applied')
          },
          {
            label: 'Mark as Rejected',
            onClick: () => handleBulkAction('rejected'),
            isLoading: isBulkLoading,
            variant: 'outline',
            isVisible: selectedApps.every(a => a.status !== 'rejected' && a.status !== 'offer')
          },
          {
            label: 'Delete',
            onClick: () => handleBulkAction('delete'),
            isLoading: isBulkLoading,
            variant: 'danger'
          }
        ]}
      />

      <ConfirmationDialog
        isOpen={deleteConfirmIds !== null}
        onClose={() => setDeleteConfirmIds(null)}
        onConfirm={handleConfirmBulkDelete}
        title="Delete Applications"
        description={`Are you sure you want to permanently delete ${deleteConfirmIds?.length} application${deleteConfirmIds?.length !== 1 ? 's' : ''}? This will not delete the associated job records.`}
        confirmLabel="Delete Permanently"
        variant="danger"
        isLoading={isBulkLoading}
      />

      {/* Details Drawer */}
      <ApplicationDetailsDrawer
        application={selectedApp}
        open={!!selectedAppId}
        onClose={() => setSelectedAppId(null)}
        onSave={async (details) => {
          if (!selectedAppId) return;
          try {
            const result = await updateApplicationDetails(selectedAppId, details);
            if (result && 'error' in result) {
              toast.error(result.error);
            } else {
              toast.success("Application details saved");
              setSelectedAppId(null);
            }
          } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "Failed to save details");
          }
        }}
      />
    </div>
  );
}
