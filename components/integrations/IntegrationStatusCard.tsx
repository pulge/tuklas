'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ChevronDown, Info } from 'lucide-react';
import React, { useState } from 'react';

interface IntegrationStatusCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  status: 'connected' | 'not-configured' | 'error';
  statusText?: string;
  isExpandable?: boolean;
  expandedContent?: React.ReactNode;
  helperText?: string;
}

export function IntegrationStatusCard({
  title,
  subtitle,
  description,
  icon,
  status,
  statusText,
  isExpandable = true,
  expandedContent,
  helperText
}: IntegrationStatusCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusBadge = () => {
    switch (status) {
      case 'connected':
        return (
          <Badge variant="success" className="uppercase tracking-widest text-[10px] py-0.5 px-2 flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-admin-success animate-pulse" />
            {statusText || 'Connected'}
          </Badge>
        );
      case 'error':
        return <Badge variant="danger" className="uppercase tracking-widest text-[10px] py-0.5 px-2">Error</Badge>;
      default:
        return <Badge variant="outline" className="uppercase tracking-widest text-[10px] py-0.5 px-2 opacity-50">Not Configured</Badge>;
    }
  };

  return (
    <div className={`border-2 transition-all duration-300 bg-admin-surface overflow-hidden ${isExpanded ? 'border-admin-accent shadow-[4px_4px_0px_0px_rgba(var(--admin-accent-rgb),0.1)]' : 'border-admin-border-strong hover:border-admin-accent/50'
      }`}>
      <div className="p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className={`w-12 h-12 flex items-center justify-center shrink-0 border-2 transition-colors ${isExpanded ? 'bg-admin-accent text-admin-contrast border-admin-accent' : 'bg-admin-bg text-admin-muted border-admin-border-strong group-hover:border-admin-accent/30'
              }`}>
              {icon}
            </div>
            <div>
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-1">
                <h3 className="text-base font-black uppercase tracking-tight text-admin-heading">{title}</h3>
                <span className="sm:flex hidden items-center gap-3 mb-1">
                  {getStatusBadge()}
                </span>
              </div>
              <p className="text-xs font-bold text-admin-muted uppercase tracking-wider">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex sm:hidden items-center gap-3 mb-1">
              {getStatusBadge()}
            </div>
            {isExpandable && (
              <Button
                variant={isExpanded ? "ghost" : "outline"}
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[10px] font-black uppercase tracking-widest h-8 gap-2 ml-auto"
              >
                {status === 'not-configured' ? 'Set up' : 'Manage'}
                <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </Button>
            )}
          </div>
        </div>

        {!isExpanded && (
          <p className="mt-4 text-xs text-admin-text opacity-70 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}

        {helperText && !isExpanded && (
          <div className="mt-4 flex items-start gap-2.5 px-3 py-2 bg-admin-accent/5 border-l-2 border-admin-accent/30 text-[10px] font-bold text-admin-muted/80 leading-relaxed uppercase tracking-tight">
            <Info size={12} className="shrink-0 mt-0.5 text-admin-accent" />
            <span>{helperText}</span>
          </div>
        )}
      </div>

      {
        isExpandable && isExpanded && expandedContent && (
          <div className="border-t-2 border-admin-border-strong bg-admin-bg animate-in slide-in-from-top-2 duration-300">
            <div className="p-6 md:p-8">
              {expandedContent}
            </div>
          </div>
        )
      }
    </div >
  );
}
