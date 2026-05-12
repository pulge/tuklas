import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

export interface BulkAction {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'danger' | 'ghost' | 'success';
  isLoading?: boolean;
  isVisible?: boolean;
  className?: string;
}

interface BulkActionBarProps {
  count: number;
  onClear: () => void;
  actions: BulkAction[];
  isStatic?: boolean;
}

/**
 * A floating action bar for bulk operations.
 */
export function BulkActionBar({ count, onClear, actions, isStatic = false }: BulkActionBarProps) {
  if (count === 0) return null;

  return (
    <div className={`${isStatic ? 'absolute bottom-4 w-[calc(100%-2rem)]' : 'fixed bottom-24 w-[95vw]'} left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 sm:w-auto max-w-4xl`}>
      <div className={`bg-admin-heading text-admin-primary ${isStatic ? 'p-3 sm:p-4' : 'p-4 sm:px-6 sm:py-4'} flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-[4px_4px_0px_0px_rgba(var(--admin-accent-rgb),1)] sm:shadow-[8px_8px_0px_0px_rgba(var(--admin-accent-rgb),1)] border-4 border-admin-accent`}>
        <div className="flex items-center justify-between w-full sm:w-auto sm:pr-6 sm:border-r border-admin-primary/20">
          <div className="flex flex-row sm:flex-col items-baseline sm:items-start gap-2 sm:gap-0">
            <span className="text-xl sm:text-2xl font-black leading-none">{count}</span>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-60">Selected</span>
          </div>
          
          <button 
            onClick={onClear}
            className="sm:hidden p-2 hover:bg-admin-primary/10 transition-colors"
            title="Clear Selection"
          >
            <X size={18} className="text-admin-primary" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {actions.filter(a => a.isVisible !== false).map((action, i) => (
            <Button 
              key={i}
              size="sm" 
              variant={action.variant === 'danger' || action.variant === 'success' ? 'default' : action.variant}
              onClick={action.onClick} 
              isLoading={action.isLoading}
              className={`
                h-8 text-[9px] sm:text-[10px] px-3 sm:px-4
                ${action.variant === 'danger' ? 'bg-admin-danger text-admin-contrast hover:bg-admin-danger/90 border-transparent' : ''}
                ${action.variant === 'success' ? 'bg-admin-success text-admin-contrast hover:bg-admin-success/90 border-transparent' : ''}
                ${action.variant === 'outline' ? 'border-admin-primary/30 text-admin-primary hover:bg-admin-primary/10' : ''}
                ${action.className || ''}
              `}
            >
              {action.label}
            </Button>
          ))}
        </div>

        <button 
          onClick={onClear}
          className="hidden sm:block ml-auto p-1 hover:bg-admin-primary/10 transition-colors"
          title="Clear Selection"
        >
          <X size={20} className="text-admin-primary" />
        </button>
      </div>
    </div>
  );
}
