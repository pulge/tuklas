import React from "react";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 min-w-0 bg-admin-bg relative pb-16 md:pb-0">
        <div className="relative z-10 h-full">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
