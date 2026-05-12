"use client";

import React from "react";
import { Button } from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}: PaginationProps) {
  return (
    <div className={`flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-2 border-admin-border-strong bg-admin-surface mt-4`}>
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-admin-muted">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className={`bg-admin-bg border-2 border-admin-primary/20 text-[10px] font-black px-2 py-1 focus:outline-none focus:border-admin-accent cursor-pointer hover:border-admin-primary`}
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-admin-muted">
          Page {currentPage} of {totalPages || 1}
        </span>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            className="!p-0 min-w-0 w-8 h-8 border-2 border-admin-primary/20 text-admin-heading hover:border-admin-primary"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} strokeWidth={3} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="!p-0 min-w-0 w-8 h-8 border-2 border-admin-primary/20 text-admin-heading hover:border-admin-primary"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight size={18} strokeWidth={3} />
          </Button>
        </div>
      </div>
    </div>
  );
}
