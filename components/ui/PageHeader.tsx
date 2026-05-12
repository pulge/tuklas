import React from "react";
import { TruncatedTooltip } from "./TruncatedTooltip";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  aside?: React.ReactNode;
  actions?: React.ReactNode;
  titleAddon?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  aside,
  actions,
  titleAddon,
}: PageHeaderProps) {
  return (
    <section className="bg-admin-primary px-4 md:px-8 py-4 md:py-6 text-admin-contrast relative">
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-8 sm:max-w-[calc(100%-200px)]">
          <div className="min-w-0">
            {subtitle && (
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-0.5">
                {subtitle}
              </p>
            )}
            <div className="flex items-center gap-3">
              <TruncatedTooltip
                text={title}
                position="bottom"
                as="h1"
                className="text-2xl md:text-3xl font-black max-w-full"
              />
              {titleAddon}
            </div>
          </div>

          {aside && (
            <div className="flex-1 md:border-l-2 border-admin-border-strong md:pl-8 md:pb-1 w-full md:w-auto">
              {aside}
            </div>
          )}
        </div>

        {actions && (
          <div className="hidden md:block shrink-0 mb-1">
            {actions}
          </div>
        )}
      </div>
    </section>
  );
}
