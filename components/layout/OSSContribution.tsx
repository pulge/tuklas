import React from 'react';

export function OSSContribution() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-admin-surface border-2 border-admin-border-strong p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-125 transition-transform duration-700 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-1 bg-admin-accent" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-muted">Open Source Community</span>
        </div>
        <h3 className="text-xl font-black uppercase tracking-tighter text-admin-heading mb-3">
          Help us <span className="text-admin-accent">scale the discovery.</span>
        </h3>
        <p className="text-xs text-admin-text opacity-70 leading-relaxed font-bold uppercase tracking-tight">
          Tuklas is a mission-driven project. Have a feature idea, found a bug, or want to contribute a new job site connector? Join our GitHub community and help build the future of Philippine job hunting.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 relative z-10">
        <a
          href="https://github.com/pulge/tuklas"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] font-black uppercase tracking-widest bg-admin-heading text-admin-bg px-6 py-3.5 hover:scale-105 transition-all flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          Contribute on GitHub
        </a>
        <a
          href="https://github.com/pulge/tuklas/issues/new"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] font-black uppercase tracking-widest border-2 border-admin-heading text-admin-heading px-6 py-3 hover:bg-admin-heading hover:text-admin-bg transition-all"
        >
          Report a Bug
        </a>
      </div>
    </div>
  );
}
