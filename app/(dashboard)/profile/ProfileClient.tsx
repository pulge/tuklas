"use client";

import React from "react";
import { usePageHeader } from "@/components/ui/PageHeaderContext";

export default function ProfileClient() {
  const headerConfig = React.useMemo(() => ({
    title: "Profile",
    subtitle: "System Status",
  }), []);

  usePageHeader(headerConfig);

  return (
    <div className="px-4 py-6 md:px-8 md:py-10 flex flex-col gap-12">
      <div className="border-2 border-admin-border-strong bg-admin-surface p-6">
        <h2 className="text-xl font-bold tracking-tight text-admin-heading">System Status</h2>
        <p className="text-sm leading-6 text-admin-text mt-1 opacity-70">
          The application is running in Offline-First / Local Mode. All data is stored in your local SQLite database.
        </p>
        <div className="mt-6 p-4 bg-admin-primary/5 border border-admin-primary/20">
            <p className="text-xs font-mono text-admin-muted">Database: ~/.tuklas/tuklas.db</p>
        </div>
      </div>
    </div>
  );
}
