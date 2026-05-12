"use client";

import { IntegrationStatusCard } from "@/components/integrations/IntegrationStatusCard";
import { PreferencesForm } from "@/components/profile/PreferencesForm";
import { ResumeManager } from "@/components/profile/ResumeManager";
import { usePageHeader } from "@/components/ui/PageHeaderContext";
import type { ProfilePreferences } from "@/types/profile";
import { FileText, Search, Wand2 } from "lucide-react";
import React from "react";

interface SetupClientProps {
  jobsCount: number;
  appsCount: number;
  interviewsCount: number;
  initialPreferences?: ProfilePreferences;
  initialCvText?: string | null;
  initialCvFilename?: string | null;
}

export default function SetupClient({
  jobsCount,
  appsCount,
  interviewsCount,
  initialPreferences,
  initialCvText,
  initialCvFilename,
}: SetupClientProps) {
  const headerConfig = React.useMemo(() => ({
    title: "Setup",
    subtitle: "Job Hunting Configuration",
    aside: (
      <div className="flex flex-wrap items-center gap-12 text-sm font-bold opacity-70">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-admin-contrast opacity-100">{jobsCount}</span>
            {jobsCount > 0 && <span className="text-admin-success text-[10px] font-black bg-admin-success/10 px-1 py-0.5">ACTIVE</span>}
          </div>
          <span className="text-[10px] uppercase tracking-widest mt-1">Tracked</span>
        </div>
        <div className="flex flex-col border-l-0 md:border-l border-admin-border-strong pl-0 md:pl-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-admin-contrast opacity-100">{appsCount}</span>
            {appsCount > 0 && <span className="text-admin-muted text-[10px] font-black bg-admin-muted/10 px-1 py-0.5">STABLE</span>}
          </div>
          <span className="text-[10px] uppercase tracking-widest mt-1">Submissions</span>
        </div>
        <div className="flex flex-col border-l-0 md:border-l border-admin-border-strong pl-0 md:pl-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-admin-contrast opacity-100">{interviewsCount}</span>
            {interviewsCount > 0 && <span className="text-admin-danger text-[10px] font-black bg-admin-danger/10 px-1 py-0.5">INTERVIEWING</span>}
          </div>
          <span className="text-[10px] uppercase tracking-widest mt-1">Interviews</span>
        </div>
      </div>
    ),
  }), [jobsCount, appsCount, interviewsCount]);

  usePageHeader(headerConfig);

  const isResumeReady = !!initialCvText;
  const isSearchReady = !!initialPreferences?.keywords && initialPreferences.keywords.length > 0;

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col gap-6">
          {/* Search Criteria */}
          <IntegrationStatusCard
            title="Search Criteria"
            subtitle="Targeting & Filtering"
            description="Define your target roles, preferred locations, and salary floor to filter incoming job opportunities."
            icon={<Search size={24} />}
            status={isSearchReady ? 'connected' : 'not-configured'}
            statusText={isSearchReady ? 'CONFIGURED' : 'DEFAULT'}
            helperText={isSearchReady ? "Search filters are active." : "Using default search settings."}
            expandedContent={
              <PreferencesForm
                initialPreferences={initialPreferences}
                section="criteria"
                variant="ghost"
              />
            }
          />

          {/* AI Orchestration - Spans both columns on large screens */}
          <IntegrationStatusCard
            title="AI Orchestration"
            subtitle="Prompt Customization"
            description="Fine-tune the instructions used for resume cleaning and cover letter generation."
            icon={<Wand2 size={24} />}
            status="connected"
            statusText="ACTIVE"
            helperText="Tuklas is using your custom AI instructions."
            expandedContent={
              <PreferencesForm
                initialPreferences={initialPreferences}
                section="prompts"
                variant="ghost"
              />
            }
          />
        </div>


        {/* Resume & Profile */}
        <IntegrationStatusCard
          title="Resume & Profile"
          subtitle="Identity & Experience"
          description="Upload your latest CV. This is the foundation for all AI-generated content and search tailoring. Don't worry the file will not be saved on our servers. We just save the extracted details."
          icon={<FileText size={24} />}
          status={isResumeReady ? 'connected' : 'not-configured'}
          statusText={isResumeReady ? 'READY' : 'MISSING'}
          helperText={isResumeReady ? "Resume successfully extracted and stored." : "Please upload your resume to enable tailoring."}
          expandedContent={
            <ResumeManager
              initialHasResume={isResumeReady}
              initialCvText={initialCvText}
              initialCvFilename={initialCvFilename}
              variant="ghost"
            />
          }
        />




      </div>
    </div>
  );
}
