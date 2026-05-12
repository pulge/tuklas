"use client";

import React from "react";
import { CheckCircle2, AlertCircle, ArrowRight, Settings, Mail, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { PipelineToggles } from "@/components/jobs/JobsQueue";

interface SetupChecklistProps {
  integrations: Record<string, boolean>;
  variant?: "inline" | "box";
  hasResume?: boolean;
  toggles?: PipelineToggles;
  onToggle?: (pipeline: keyof PipelineToggles) => void;
  encryptionConfigured?: boolean;
}

export function SetupChecklist({
  integrations,
  variant = "box",
  toggles,
  onToggle,
  encryptionConfigured = false,
}: SetupChecklistProps) {
  const hasOwnKey = !!integrations.rapidapi;

  const isScrapingConfigured = hasOwnKey;
  const isEmailConfigured = !!integrations.gmail;

  const isScrapingToggled = toggles?.scraping !== false;
  const isEmailToggled = toggles?.email !== false;

  const isScrapingReady = isScrapingToggled && isScrapingConfigured;
  const isEmailReady = isEmailToggled && isEmailConfigured;

  const getScrapingDescription = () => {
    if (!isScrapingToggled) return "Pipeline Disabled";
    return hasOwnKey ? "Using your RapidAPI key" : "No key configured";
  };

  interface ChecklistItem {
    id: string;
    title: string;
    description: string;
    isReady: boolean;
    isConfigured?: boolean;
    icon: React.ReactNode;
    setupUrl: string;
    toggleable?: boolean;
    toggleKey?: keyof PipelineToggles;
  }

  const items: ChecklistItem[] = [
    {
      id: "encryption",
      title: "Encryption Engine",
      description: "AES-256-GCM (local .env)",
      isReady: encryptionConfigured,
      icon: <Settings size={18} />,
      setupUrl: "https://github.com/pulge/tuklas#environment-variables",
    },
    {
      id: "scraping",
      title: "Job Scraping",
      description: getScrapingDescription(),
      isReady: isScrapingReady,
      isConfigured: isScrapingConfigured,
      icon: <Search size={18} />,
      setupUrl: "/integrations",
      toggleable: true,
      toggleKey: "scraping" as keyof PipelineToggles,
    },
    {
      id: "email",
      title: "Email Ingestion",
      description: isEmailToggled ? "Gmail API" : "Pipeline Disabled",
      isReady: isEmailReady,
      isConfigured: isEmailConfigured,
      icon: <Mail size={18} />,
      setupUrl: "/setup",
      toggleable: true,
      toggleKey: "email" as keyof PipelineToggles,
    },
  ];

  if (variant === "inline") {
    return (
      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const isToggled = item.toggleKey && toggles ? toggles[item.toggleKey] !== false : true;
          const isDisabledByToggle = item.toggleable && !isToggled;

          return (
            <div key={item.id} className="flex flex-col">
              <div
                className={`flex items-center justify-between p-4 border-2 transition-colors ${isDisabledByToggle
                  ? "border-admin-border-strong/30 bg-admin-surface/30 opacity-50"
                  : item.isReady
                    ? "border-admin-success/30 bg-admin-success/5"
                    : "border-admin-danger/30 bg-admin-danger/5"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center shrink-0 border-2 ${isDisabledByToggle
                    ? "border-admin-border-strong text-admin-muted"
                    : item.isReady ? "border-admin-success text-admin-success" : "border-admin-danger text-admin-danger"
                    }`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-tight text-admin-heading flex items-center gap-2">
                      {item.title}
                      {isDisabledByToggle ? (
                        <span className="text-[8px] font-black text-admin-muted bg-admin-surface px-1.5 py-0.5 border border-admin-border-strong uppercase tracking-widest">Off</span>
                      ) : item.isReady ? (
                        <CheckCircle2 size={14} className="text-admin-success" />
                      ) : (
                        <AlertCircle size={14} className="text-admin-danger" />
                      )}
                    </h4>
                    <p className="text-[10px] font-bold text-admin-muted uppercase tracking-wider">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {!item.isConfigured && (
                    <Link href={item.setupUrl}>
                      <Button variant="outline" size="sm" className="gap-2 text-[8px] h-8">
                        Setup <ArrowRight size={12} />
                      </Button>
                    </Link>
                  )}
                  {item.toggleable && item.isConfigured && onToggle && item.toggleKey && (
                    <button
                      type="button"
                      onClick={() => onToggle(item.toggleKey!)}
                      className={`relative inline-flex h-6 w-11 items-center shrink-0 cursor-pointer border-2 transition-colors duration-200 ease-in-out focus:outline-none ${isToggled
                        ? "bg-admin-success border-admin-success"
                        : "bg-admin-surface border-admin-border-strong"
                        }`}
                      role="switch"
                      aria-checked={isToggled}
                      aria-label={`Toggle ${item.title}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform border-2 transition-transform duration-200 ease-in-out ${isToggled
                          ? "translate-x-5 bg-white border-white"
                          : "translate-x-0.5 bg-admin-muted border-admin-muted"
                          }`}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="border-4 border-admin-contrast bg-admin-surface p-8 shadow-[8px_8px_0px_0px_rgba(var(--admin-contrast-rgb),1)]">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-admin-contrast text-admin-primary flex items-center justify-center">
          <Settings size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black tracking-tighter text-admin-heading uppercase leading-none">Pipeline Status</h3>
          <p className="text-xs font-bold text-admin-muted mt-1">Review your system health and connection readiness.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => {
          const isToggled = item.toggleKey && toggles ? toggles[item.toggleKey] !== false : true;
          const isDisabledByToggle = item.toggleable && !isToggled;

          return (
            <div
              key={item.id}
              className={`flex flex-col p-6 border-4 transition-all ${isDisabledByToggle
                ? "border-admin-border-strong/30 bg-admin-surface/30 opacity-50"
                : item.isReady
                  ? "border-admin-success bg-admin-success/5"
                  : "border-admin-danger bg-admin-danger/5"
                }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 flex items-center justify-center border-4 ${isDisabledByToggle
                  ? "border-admin-border-strong text-admin-muted"
                  : item.isReady ? "border-admin-success text-admin-success" : "border-admin-danger text-admin-danger"
                  }`}>
                  {item.icon}
                </div>
                {isDisabledByToggle ? (
                  <div className="bg-admin-muted text-admin-contrast px-2 py-1 text-[8px] font-black uppercase tracking-widest border border-admin-border-strong">Off</div>
                ) : item.isReady ? (
                  <div className="bg-admin-success text-admin-contrast px-2 py-1 text-[8px] font-black uppercase tracking-widest">Active</div>
                ) : (
                  <div className="bg-admin-danger text-admin-contrast px-2 py-1 text-[8px] font-black uppercase tracking-widest">Missing</div>
                )}
              </div>

              <h4 className={`text-lg font-black uppercase tracking-tighter mb-1 ${isDisabledByToggle ? "text-admin-muted" : "text-admin-heading"}`}>
                {item.title}
              </h4>
              <p className="text-[10px] font-bold text-admin-muted uppercase tracking-widest mb-6">{item.description}</p>

              <div className="mt-auto">
                {isDisabledByToggle ? (
                  <div className="flex items-center gap-2 text-admin-muted text-[10px] font-black uppercase tracking-widest">
                    <AlertCircle size={14} /> Pipeline Off
                  </div>
                ) : item.isReady ? (
                  <div className="flex items-center gap-2 text-admin-success text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle2 size={14} /> Ready
                  </div>
                ) : (
                  <Link href={item.setupUrl} className="block">
                    <Button variant="danger" size="md" className="w-full gap-2 text-[10px]">
                      Configure Now <ArrowRight size={14} />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
