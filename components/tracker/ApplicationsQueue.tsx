"use client";

import { ApplicationTable } from "@/components/tracker/ApplicationTable";
import { usePageHeader } from "@/components/ui/PageHeaderContext";
import type { Application } from "@/types/application";
import React from "react";

interface ApplicationsQueueProps {
  initialApplications: Application[];
}

export function ApplicationsQueue({ initialApplications }: ApplicationsQueueProps) {
  const stats = React.useMemo(() => [
    {
      label: "Submissions",
      value: initialApplications.length,
      trend: initialApplications.length > 0 ? "ACTIVE" : "STABLE",
      trendVariant: "success" as const
    },
    {
      label: "Interviews",
      value: initialApplications.filter(a => a.status === 'interview').length,
      trend: initialApplications.filter(a => a.status === 'interview').length > 0 ? "UPCOMING" : "STABLE",
      trendVariant: "accent" as const
    }
  ], [initialApplications]);

  const headerConfig = React.useMemo(() => ({
    title: "Active Applications",
    subtitle: "Track Record",
    aside: (
      <div className="flex flex-wrap items-center gap-6 md:gap-12 text-sm font-bold opacity-70">
        {stats.map((stat, i) => (
          <div key={stat.label} className={`flex flex-col ${i > 0 ? 'border-l-0 md:border-l border-admin-border-strong pl-0 md:pl-8' : ''}`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-admin-contrast opacity-100">{stat.value}</span>
              <span className={`text-[10px] font-black px-1 py-0.5 ${stat.trendVariant === 'success' ? 'text-admin-success bg-admin-success/10' :
                stat.trendVariant === 'accent' ? 'text-admin-accent bg-admin-accent/10' :
                  'text-admin-danger bg-admin-danger/10'
                }`}>
                {stat.trend}
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest mt-1">{stat.label}</span>
          </div>
        ))}
      </div>
    )
  }), [stats]);

  usePageHeader(headerConfig);

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 flex flex-col gap-16 max-w-7xl mx-auto w-full min-w-0 overflow-hidden">
      <div className="flex flex-col gap-10 w-full min-w-0">
        <ApplicationTable applications={initialApplications} />
      </div>
    </div>
  );
}
