import React from "react";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className = "", count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-admin-border-strong animate-pulse ${className}`}
          style={{
            // Simple Brutalist Skeleton: Just a solid block that pulses
            opacity: 0.1,
          }}
        />
      ))}
    </>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="border-2 border-admin-border-strong p-4 flex flex-col gap-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2 mt-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="border-b-2 border-admin-border-strong p-4 grid grid-cols-4 gap-4 items-center">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-6 w-20" />
    </div>
  );
}
export function PageHeaderSkeleton() {
  return (
    <section className="bg-admin-primary px-8 py-6 text-admin-contrast relative overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col md:flex-row md:items-end gap-8 flex-1">
          <div className="shrink-0 flex flex-col gap-2">
            <Skeleton className="h-3 w-20 bg-white/20" />
            <Skeleton className="h-10 w-48 bg-white/20" />
          </div>
          <div className="flex-1 border-l-2 border-white/10 pl-8 pb-1 flex items-center gap-8">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-12 bg-white/20" />
              <Skeleton className="h-3 w-16 bg-white/20" />
            </div>
            <div className="flex flex-col gap-2 border-l border-white/10 pl-8">
              <Skeleton className="h-6 w-12 bg-white/20" />
              <Skeleton className="h-3 w-16 bg-white/20" />
            </div>
          </div>
        </div>
        <div className="shrink-0 mb-1">
          <Skeleton className="h-10 w-32 bg-white/20" />
        </div>
      </div>
    </section>
  );
}
