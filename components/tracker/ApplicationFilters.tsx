"use client";

import React from "react";
import type { ApplicationStatus } from "@/types/application";
import { SearchInput } from "@/components/ui/SearchInput";

interface ApplicationFiltersProps {
  sources: string[];
  locations: string[];
  onFilterChange?: (filters: {
    platform?: string;
    status?: ApplicationStatus | "";
    location?: string;
  }) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const statuses: ("" | ApplicationStatus)[] = ["", "applied", "interview", "offer", "rejected"];

export function ApplicationFilters({ sources, locations, onFilterChange, searchQuery = "", onSearchChange }: ApplicationFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
      <div className="w-full sm:w-64 shrink-0">
        <SearchInput 
          value={searchQuery} 
          onChange={onSearchChange || (() => {})} 
          placeholder="Search applications..."
          className="h-9 py-0 w-full"
        />
      </div>
      
      <div className="flex items-center gap-3 overflow-x-auto flex-nowrap pb-1 max-w-full">
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
              status: e.target.value as ApplicationStatus | "",
            })
          }
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s === "" ? "All Statuses" : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
