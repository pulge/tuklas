"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SetupChecklist } from "@/components/jobs/SetupChecklist";
import { Activity, ArrowRight, Mail, RefreshCcw, Search } from "lucide-react";

interface JobsEmptyStateProps {
  hasKeywords: boolean;
  onRefresh?: () => Promise<void>;
  isRefreshing: boolean;
  integrations: Record<string, boolean>;
  onHealthClick?: () => void;
  hasResume?: boolean;
  encryptionConfigured?: boolean;
  toggles?: import("./JobsQueue").PipelineToggles;
  onToggle?: (pipeline: keyof import("./JobsQueue").PipelineToggles) => void;
}

export function JobsEmptyState({
  hasKeywords,
  onRefresh,
  isRefreshing,
  integrations,
  onHealthClick,
  hasResume,
  encryptionConfigured,
  toggles,
  onToggle,
}: JobsEmptyStateProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Onboarding Empty State */}
      <div className="flex flex-col items-center justify-center py-16 lg:py-24 px-6 border-4 border-dashed border-admin-border-strong bg-admin-surface/30 text-center">
        <div className="max-w-2xl lg:max-w-4xl xl:max-w-6xl w-full">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-black text-admin-heading uppercase tracking-tighter italic mb-2">
            Your workspace is empty.
          </h2>
          <p className="text-xs lg:text-sm font-bold text-admin-muted uppercase tracking-widest opacity-60 mb-10 lg:mb-16">
            Complete these steps to start receiving positions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10 lg:mb-16">
            {/* Step 1: Keywords */}
            <div className="flex flex-col items-center p-8 lg:p-12 border-2 border-admin-border-strong bg-admin-surface relative group hover:border-admin-accent transition-colors min-h-[240px] lg:min-h-[340px]">
              <div className={`w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center border-2 mb-6 ${hasKeywords ? 'border-admin-success text-admin-success' : 'border-admin-border-strong text-admin-muted'}`}>
                <Search size={20} className="lg:scale-125" />
              </div>
              <h3 className="text-xs lg:text-sm font-black uppercase tracking-widest mb-3">Step 1 — Set Keywords</h3>
              <p className="text-[11px] lg:text-xs font-bold text-admin-muted uppercase tracking-wider leading-relaxed mb-6">
                Required before scraping. Without this, searches return irrelevant results.
              </p>
              <Link href="/setup" className="mt-auto">
                <Button variant="outline" size="sm" className="text-[10px] h-9 gap-2 px-6">
                  {hasKeywords ? 'Keywords Set' : 'Configure'} <ArrowRight size={12} />
                </Button>
              </Link>
            </div>

            {/* Step 2: Refresh */}
            <div className="flex flex-col items-center p-8 lg:p-12 border-2 border-admin-border-strong bg-admin-surface relative group hover:border-admin-accent transition-colors min-h-[240px] lg:min-h-[340px]">
              <div className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center border-2 border-admin-border-strong text-admin-muted mb-6">
                <RefreshCcw size={20} className="lg:scale-125" />
              </div>
              <h3 className="text-xs lg:text-sm font-black uppercase tracking-widest mb-3">Step 2 — First Refresh</h3>
              <p className="text-[11px] lg:text-xs font-bold text-admin-muted uppercase tracking-wider leading-relaxed mb-6">
                Fetches jobs from JSearch using your RapidAPI key. Add one in Integrations first.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-auto text-[10px] h-9 gap-2 px-6"
                onClick={onRefresh}
                isLoading={isRefreshing}
                disabled={isRefreshing || !hasKeywords}
              >
                {isRefreshing ? 'Refreshing...' : <>Start Refresh <RefreshCcw size={12} /></>}
              </Button>
            </div>

            {/* Step 3: Email */}
            <div className="flex flex-col items-center p-8 lg:p-12 border-2 border-admin-border-strong bg-admin-surface relative group hover:border-admin-accent transition-colors min-h-[240px] lg:min-h-[340px]">
              <div className={`w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center border-2 mb-6 ${integrations.gmail ? 'border-admin-success text-admin-success' : 'border-admin-border-strong text-admin-muted'}`}>
                <Mail size={20} className="lg:scale-125" />
              </div>
              <h3 className="text-xs lg:text-sm font-black uppercase tracking-widest mb-3">Step 3 — Email Monitor</h3>
              <p className="text-[11px] lg:text-xs font-bold text-admin-muted uppercase tracking-wider leading-relaxed mb-6">
                Optional. JobStreet and LinkedIn alerts flow in automatically once Gmail is connected.
              </p>
              <Link href="/integrations" className="mt-auto">
                <Button variant="outline" size="sm" className="text-[10px] h-9 gap-2 px-6">
                  {integrations.gmail ? 'Connected' : 'Configure'} <ArrowRight size={12} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only Pipeline Status Section */}
      <div className="md:hidden flex flex-col gap-4 p-6 border-2 border-admin-border-strong bg-admin-surface">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-admin-heading">Pipeline Status</h3>
            <p className="text-[10px] text-admin-muted font-bold mt-1">Check health and sync logs</p>
          </div>
          <Button variant="outline" size="sm" onClick={onHealthClick} className="gap-2 border-2">
            <Activity size={14} />
            Status
          </Button>
        </div>
      </div>

      <SetupChecklist
        integrations={integrations}
        hasResume={hasResume}
        encryptionConfigured={encryptionConfigured}
        toggles={toggles}
        onToggle={onToggle}
      />
    </div>
  );
}
