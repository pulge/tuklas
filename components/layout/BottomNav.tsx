"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inbox, LayoutList, Wrench, Menu, X, Plug, Settings } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "@/components/ui/Logo";

export function BottomNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainTabs = [
    { name: "Jobs", href: "/jobs", icon: Inbox },
    { name: "Apps", href: "/applications", icon: LayoutList },
    { name: "Setup", href: "/setup", icon: Wrench },
  ];

  return (
    <>
      {/* "More" Bottom Sheet Overlay */}
      {isMoreOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity" 
          onClick={() => setIsMoreOpen(false)}
        />
      )}

      {/* "More" Bottom Sheet Content */}
      <div 
        className={`fixed left-0 right-0 bottom-16 bg-admin-surface border-t-2 border-admin-border-strong z-40 md:hidden transition-transform duration-300 ease-out transform ${
          isMoreOpen ? "translate-y-0 shadow-[0px_-4px_0px_0px_rgba(var(--admin-primary),0.1)]" : "translate-y-full"
        }`}
      >
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-4 border-b-2 border-admin-border-strong pb-4">
            <Logo className="text-xl" />
            <button onClick={() => setIsMoreOpen(false)} className="p-1 text-admin-muted hover:text-admin-heading">
              <X size={20} />
            </button>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="font-black text-xs tracking-widest uppercase text-admin-muted">System Options</span>
          </div>

          <div className="px-4 py-3 border-2 border-admin-border-strong bg-admin-surface/50 mb-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-admin-muted mb-0.5">Status</p>
            <p className="text-sm font-bold text-admin-heading truncate">Offline First (OSS)</p>
          </div>
          

          <Link
            href="/integrations"
            onClick={() => setIsMoreOpen(false)}
            className="flex items-center gap-3 p-4 border-2 border-admin-border-strong hover:border-admin-accent transition-colors bg-admin-bg font-bold text-admin-heading text-sm uppercase tracking-wider"
          >
            <Plug size={18} />
            Integrations
          </Link>
          
          <Link
            href="/profile"
            onClick={() => setIsMoreOpen(false)}
            className="flex items-center gap-3 p-4 border-2 border-admin-border-strong hover:border-admin-accent transition-colors bg-admin-bg font-bold text-admin-heading text-sm uppercase tracking-wider"
          >
            <Settings size={18} />
            Profile Settings
          </Link>

          <div className="flex items-center justify-between p-4 border-2 border-admin-border-strong bg-admin-bg mt-2">
            <span className="font-bold text-admin-heading text-sm uppercase tracking-wider">Appearance</span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-admin-primary border-t-2 border-admin-border-strong z-50 md:hidden flex items-center justify-around px-2">
        {mainTabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              onClick={() => setIsMoreOpen(false)}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive ? "text-admin-accent" : "text-admin-contrast/60 hover:text-admin-contrast"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 3 : 2} />
              <span className={`text-[10px] uppercase tracking-widest font-black ${isActive ? "opacity-100" : "opacity-70"}`}>
                {tab.name}
              </span>
            </Link>
          );
        })}

        <button
          onClick={() => setIsMoreOpen(!isMoreOpen)}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            isMoreOpen ? "text-admin-accent" : "text-admin-contrast/60 hover:text-admin-contrast"
          }`}
        >
          <Menu size={20} strokeWidth={isMoreOpen ? 3 : 2} />
          <span className={`text-[10px] uppercase tracking-widest font-black ${isMoreOpen ? "opacity-100" : "opacity-70"}`}>
            More
          </span>
        </button>
      </div>
    </>
  );
}
