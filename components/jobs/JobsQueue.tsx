"use client";

import { JobsMasterDetail } from "@/components/jobs/JobsMasterDetail";
import { ManualJobForm } from "@/components/jobs/ManualJobForm";
import { SetupChecklist } from "@/components/jobs/SetupChecklist";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { usePageHeader } from "@/components/ui/PageHeaderContext";
import type { Job } from "@/types/job";
import { Activity, Plus, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export interface PipelineToggles {
  scraping: boolean;
  email: boolean;
}

interface JobsQueueProps {
  initialJobs: Job[];
  keywords?: string[];
  location?: string;
  integrations?: Record<string, boolean>;
  hasResume?: boolean;
  initialPreferences?: import('@/types/profile').ProfilePreferences;
}

export function JobsQueue({
  initialJobs,
  keywords = [],
  location,
  integrations = {},
  hasResume = false,
  initialPreferences,
}: JobsQueueProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHealthDrawerOpen, setIsHealthDrawerOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [pipelineToggles, setPipelineToggles] = useState<PipelineToggles>(
    initialPreferences?.pipeline_toggles || { scraping: true, email: true }
  );

  const [encryptionConfigured, setEncryptionConfigured] = useState(false);
  const router = useRouter();
  const isInitialMount = React.useRef(true);

  // Debounced sync to DB
  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const { updateProfilePreferences } = await import("@/app/actions/profile-actions");
        await updateProfilePreferences({
          pipeline_toggles: pipelineToggles,
        });
      } catch (e) {
        console.error("Failed to sync pipeline settings to DB", e);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [pipelineToggles]);

  const handleToggle = React.useCallback((pipeline: keyof PipelineToggles) => {
    setPipelineToggles(prev => ({ ...prev, [pipeline]: !prev[pipeline] }));
  }, []);

  React.useEffect(() => {
    import("@/app/actions/system-actions").then(m => m.getSystemHealthAction()).then(res => {
      if ("encryptionConfigured" in res && res.encryptionConfigured) {
        setEncryptionConfigured(true);
      }
    });
  }, []);

  const handleRefresh = React.useCallback(async () => {
    const { toast } = await import("@/lib/toast");
    
    const activePipelines = [];
    if (pipelineToggles.scraping) activePipelines.push('JSearch API');
    if (pipelineToggles.email) activePipelines.push('Email Sync');
    
    if (activePipelines.length > 0) {
      toast.info(`Syncing: ${activePipelines.join(' + ')}...`, { 
        duration: 3000,
        icon: <RefreshCcw size={14} className="animate-spin text-admin-accent" />
      });
    } else {
      toast.error("Refresh aborted: No active sync pipelines enabled.");
      return;
    }

    setIsRefreshing(true);
    try {
      let scrapePromise;
      if (!pipelineToggles.scraping) {
        scrapePromise = Promise.resolve({ skippedByToggle: true });
      } else if (keywords.length === 0) {
        scrapePromise = Promise.resolve({ error: "Skipped - Keywords are required for scraping." });
      } else if (!integrations.rapidapi) {
        scrapePromise = Promise.resolve({ error: "Skipped: No RapidAPI key configured. Add one in Integrations." });
      } else {
        scrapePromise = fetch("/api/scrape", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keywords, location }),
        }).then(r => r.json());
      }

      let emailPromise;
      if (!pipelineToggles.email) {
        emailPromise = Promise.resolve({ skippedByToggle: true });
      } else {
        emailPromise = fetch("/api/ingest/email/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }).then(r => r.json());
      }

      const [scrapeData, emailData] = await Promise.all([scrapePromise, emailPromise]);

      const totalNew = (scrapeData.inserted || 0) + (emailData.inserted || 0);
      toast.success(`Refresh complete. Found ${totalNew} new positions!`);

      const elements = [];
      if (scrapeData.skippedByToggle) {
        elements.push(<div key="scrape-off" className="text-admin-muted text-[10px] uppercase font-bold italic">Scraper: Disabled</div>);
      } else if (scrapeData.details && Array.isArray(scrapeData.details)) {
        scrapeData.details.forEach((d: { name: string; error?: string }) => {
          if (d.error) {
            elements.push(
              <div key={`scrape-${d.name}`} className="text-admin-danger">
                {d.name}: failed — {d.error}
              </div>
            );
          }
        });
      }

      if (emailData.skippedByToggle) {
        elements.push(<div key="email-off" className="text-admin-muted text-[10px] uppercase font-bold italic">Email Sync: Disabled</div>);
      } else if (emailData.error) {
        elements.push(<div key="email-err" className="text-admin-danger text-[10px] uppercase font-bold">Email Sync: Error — {emailData.error}</div>);
      } else if (emailData.success) {
        elements.push(
          <div key="email-sync" className={emailData.inserted > 0 ? "text-admin-success" : "text-admin-muted"}>
            Email Sync: {emailData.inserted > 0 ? `${emailData.inserted} new alert${emailData.inserted !== 1 ? "s" : ""}` : "No new alerts"}
          </div>
        );
      }

      if (scrapeData.error) {
        elements.push(<div key="scrape-error" className="text-admin-warning text-[10px] uppercase font-bold italic">Scraper: {scrapeData.error}</div>);
      }

      if (elements.length > 0) {
        toast.info(<div className="flex flex-col gap-1.5">{elements}</div>, { duration: 8000 });
      }

      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to refresh jobs.");
    } finally {
      setIsRefreshing(false);
    }
  }, [keywords, location, router, pipelineToggles, integrations]);

  const stats = React.useMemo(() => [
    { label: "Positions", value: initialJobs.length, trend: "ACTIVE", trendVariant: "success" as const },
    { label: "Alerts", value: initialJobs.filter(j => j.status === 'new').length, trend: "NEW", trendVariant: "warning" as const }
  ], [initialJobs]);

  const headerConfig = React.useMemo(() => ({
    title: "Jobs Queue",
    subtitle: "Workspace",
    titleAddon: (
      <Button
        size="sm"
        variant="outline"
        onClick={handleRefresh}
        isLoading={isRefreshing}
        className="md:hidden p-2 border-2 ml-auto"
      >
        <RefreshCcw size={14} className={isRefreshing ? "animate-spin" : ""} />
      </Button>
    ),
    aside: (
      <div className="flex flex-row items-center md:items-end gap-3 md:gap-8 text-sm font-bold opacity-70">
        {stats.map((stat, i) => (
          <div key={stat.label} className={`flex flex-col ${i > 0 ? 'border-l-0 md:border-l border-admin-border-strong pl-0 md:pl-8' : ''}`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-admin-contrast opacity-100">{stat.value}</span>
              <span className={`text-[10px] font-black px-1 py-0.5 ${(stat.trendVariant as string) === 'success' ? 'text-admin-success bg-admin-success/10' :
                (stat.trendVariant as string) === 'accent' ? 'text-admin-accent bg-admin-accent/10' :
                  (stat.trendVariant as string) === 'warning' ? 'text-admin-warning bg-admin-warning/10' :
                    'text-admin-danger bg-admin-danger/10'
                }`}>
                {stat.trend}
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest mt-1">{stat.label}</span>
          </div>
        ))}
      </div>
    ),
    actions: (
      <div className="hidden md:flex items-center gap-4">
        <Button size="md" variant="outline" onClick={() => setIsHealthDrawerOpen(true)} className="gap-2 border-2">
          <Activity size={16} />
          Pipeline Status
        </Button>
        <Button size="md" variant="outline" onClick={handleRefresh} isLoading={isRefreshing} className="gap-2 border-2">
          <RefreshCcw size={16} className={isRefreshing ? "animate-spin" : ""} />
        </Button>
        <Button size="md" onClick={() => setIsDrawerOpen(true)} className="bg-admin-contrast text-admin-primary hover:bg-admin-contrast/90 transition-transform hover:scale-105 active:scale-95 shadow-xl gap-2">
          <Plus size={18} strokeWidth={3} />
          Manual Entry
        </Button>
      </div>
    )
  }), [stats, isRefreshing, handleRefresh]);

  usePageHeader(headerConfig);

  return (
    <div className="bg-admin-bg h-full flex flex-col w-full min-w-0 overflow-hidden">
      {/* Mobile-only Manual Entry CTA */}
      <div className="md:hidden px-4 pt-6">
        <Button
          size="lg"
          onClick={() => setIsDrawerOpen(true)}
          className="w-full bg-admin-contrast text-admin-primary hover:bg-admin-contrast/90 shadow-xl gap-2 font-black italic uppercase tracking-tighter"
        >
          <Plus size={20} strokeWidth={3} />
          Manual Entry
        </Button>
      </div>

      <JobsMasterDetail
        jobs={initialJobs}
        integrations={integrations}
        hasResume={hasResume}
        encryptionConfigured={encryptionConfigured}
        toggles={pipelineToggles}
        onToggle={handleToggle}
        onHealthClick={() => setIsHealthDrawerOpen(true)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        hasKeywords={keywords.length > 0}
      />

      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Add Manual Job"
        footer={
          <div className="flex items-center gap-4">
            <Button type="submit" form="manual-job-form" size="lg" className="flex-1">Add Job to Queue</Button>
            <Button type="button" variant="outline" size="lg" onClick={() => setIsDrawerOpen(false)} className="flex-1">Cancel</Button>
          </div>
        }
      >
        <ManualJobForm onCancel={() => setIsDrawerOpen(false)} onSuccess={() => setIsDrawerOpen(false)} id="manual-job-form" />
      </Drawer>

      <Drawer
        open={isHealthDrawerOpen}
        onClose={() => setIsHealthDrawerOpen(false)}
        title="Pipeline Health"
      >
        <div className="p-6">
          <SetupChecklist
            integrations={integrations}
            variant="inline"
            hasResume={hasResume}
            toggles={pipelineToggles}
            onToggle={handleToggle}
            encryptionConfigured={encryptionConfigured}
          />
        </div>
      </Drawer>
    </div>
  );
}
