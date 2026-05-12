"use client";

import { ChevronLeft, ChevronRight, Inbox, LayoutList, Moon, Plug, Sun, Wrench } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import pkg from "../../package.json";
import { Logo, LogoIcon } from "../ui/Logo";

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    void Promise.resolve().then(() => setMounted(true));
  }, []);

  const navItems = [
    { name: "Jobs", href: "/jobs", icon: Inbox },
    { name: "Applications", href: "/applications", icon: LayoutList },
    { name: "Setup", href: "/setup", icon: Wrench },
    { name: "Integrations", href: "/integrations", icon: Plug },
  ];

  return (
    <aside className={`hidden md:flex ${isCollapsed ? 'w-20' : 'w-64'} bg-admin-primary shrink-0 flex-col sticky top-0 h-screen z-50 transition-all duration-300 ease-in-out border-r border-admin-contrast/10`}>
      <div className={`flex items-center ${isCollapsed ? 'justify-center py-8' : 'justify-between p-8'} transition-all duration-300 gap-4 relative`}>
        <div className="relative h-8 flex-1">
          <div className={`absolute inset-0 transition-all duration-300 ${isCollapsed ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'}`}>
            <Logo className="text-2xl" />
          </div>
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isCollapsed ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
            <div className="w-8 h-8 bg-admin-accent/20 flex items-center justify-center font-black text-admin-accent italic"><LogoIcon className="size-4" /></div>
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute -right-3 top-10 w-6 h-6 bg-admin-contrast text-admin-primary flex items-center justify-center border border-admin-border-strong hover:bg-admin-accent transition-colors z-50`}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className={`flex-1 ${isCollapsed ? 'px-2' : 'px-4'} space-y-1 transition-all duration-300`}>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-none text-sm transition-all duration-150 ${isActive
                ? "bg-admin-contrast text-admin-primary font-bold shadow-lg"
                : "text-admin-contrast/70 hover:text-admin-contrast hover:bg-admin-contrast/10"
                }`}
              title={isCollapsed ? item.name : ""}
            >
              <Icon size={20} strokeWidth={isActive ? 3 : 2} className="shrink-0" />
              <span className={`transition-all duration-300 ease-in-out truncate ${isCollapsed ? 'max-w-0 opacity-0 ml-0' : 'opacity-100 flex-1'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className={`p-4 border-t border-admin-contrast/10 flex flex-col items-center gap-4`}>
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-sm font-bold text-admin-contrast/70 hover:text-admin-contrast hover:bg-admin-contrast/10 transition-all`}
            title={isCollapsed ? (theme === "dark" ? "Light Mode" : "Dark Mode") : ""}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            {!isCollapsed && <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
          </button>
        )}

        <div className={`w-full text-center py-2 ${isCollapsed ? 'opacity-0' : 'opacity-30'}`}>
          <p className="text-[8px] font-black uppercase tracking-widest text-admin-contrast">OSS {pkg.version}</p>
        </div>
      </div>
    </aside>
  );
}
