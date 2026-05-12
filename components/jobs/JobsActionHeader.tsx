"use client";

import React from "react";
import { JobFilters } from "@/components/jobs/JobFilters";
import { SortButton } from "@/components/ui/SortButton";
import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";
import { JobStatus } from "@/types/job";

interface JobsActionHeaderProps {
  availableSources: string[];
  availableLocations: string[];
  onFilterChange: (newFilters: Partial<{ platform: string; status: JobStatus | ""; location: string }>) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  isCompact: boolean;
  sortDirection: "desc" | "asc";
  onSortToggle: () => void;
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  onExport: () => void;
  hasJobs: boolean;
}

export function JobsActionHeader({
  availableSources,
  availableLocations,
  onFilterChange,
  searchQuery,
  onSearchChange,
  isCompact,
  sortDirection,
  onSortToggle,
  isAllSelected,
  onSelectAll,
  onExport,
  hasJobs,
}: JobsActionHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className={`flex flex-col justify-between gap-4 ${isCompact ? 'xl:flex-col xl:items-stretch' : 'md:flex-row md:items-center'}`}>
        <div className="overflow-x-auto pb-2 md:pb-0 w-full min-w-0">
          <JobFilters
            sources={availableSources}
            locations={availableLocations}
            onFilterChange={onFilterChange}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            isCompact={isCompact}
          />
        </div>
        <div className={`flex gap-3 shrink-0 ${isCompact ? 'flex-col items-end sm:flex-row sm:items-center xl:flex-col xl:items-end' : 'items-center justify-end'}`}>
          <div className="flex gap-2">
            <SortButton
              direction={sortDirection}
              onToggle={onSortToggle}
            />
            <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-admin-border-strong bg-admin-surface">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="w-4 h-4 accent-admin-accent cursor-pointer"
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-admin-muted">All</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExport} 
            disabled={!hasJobs} 
            className="p-2 w-full sm:w-auto xl:w-full justify-center"
          >
            <Download size={14} className="mr-2" />
            <span className="text-[10px] font-black uppercase">CSV/Excel</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
