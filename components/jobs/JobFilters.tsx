"use client";

import React from "react";
import type { JobStatus } from "@/types/job";
import { SearchInput } from "@/components/ui/SearchInput";

interface JobFiltersProps {
  sources: string[];
  locations: string[];
  onFilterChange?: (filters: {
    platform?: string;
    status?: JobStatus | "";
    location?: string;
  }) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  isCompact?: boolean;
}

const statuses: ("" | JobStatus)[] = ["", "new", "skipped"];

export function JobFilters({ sources, locations, onFilterChange, searchQuery = "", onSearchChange, isCompact = false }: JobFiltersProps) {
  return (
    <div className={`flex flex-col gap-4 w-full ${isCompact ? 'sm:flex-col sm:items-stretch' : 'sm:flex-row sm:items-center'}`}>
      <div className={`w-full shrink-0 ${isCompact ? '' : 'sm:w-64'}`}>
        <SearchInput 
          value={searchQuery} 
          onChange={onSearchChange || (() => {})} 
          placeholder="Search jobs..."
          className="h-9 py-0 w-full"
        />
      </div>
      
      <div className="flex items-center gap-3 overflow-x-auto flex-nowrap pb-1 max-w-full no-scrollbar">
        <select
          className="border-2 border-admin-border-strong bg-admin-surface rounded-none px-3 h-9 text-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-accent/40 transition-shadow duration-150 max-w-[150px] sm:max-w-[200px] truncate"
          defaultValue="all"
          onChange={(e) =>
            onFilterChange?.({
              platform: e.target.value === "all" ? undefined : e.target.value,
            })
          }
        >
          <option value="all">All Sources</option>
          {sources.filter(s => s !== "all").map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
  
        <select
          className="border-2 border-admin-border-strong bg-admin-surface rounded-none px-3 h-9 text-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-accent/40 transition-shadow duration-150 max-w-[150px] sm:max-w-[200px] truncate"
          defaultValue="all"
          onChange={(e) =>
            onFilterChange?.({
              location: e.target.value === "all" ? undefined : e.target.value,
            })
          }
        >
          <option value="all">All Locations</option>
          {locations.filter(l => l && l !== "all").map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
  
        <select
          className="border-2 border-admin-border-strong bg-admin-surface rounded-none px-3 h-9 text-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-accent/40 transition-shadow duration-150 max-w-[150px] sm:max-w-[200px] truncate"
          defaultValue=""
          onChange={(e) =>
            onFilterChange?.({
              status: e.target.value as JobStatus | "",
            })
          }
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s === "" ? "All Statuses" :
                s === "new" ? "New Alerts" :
                  s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
