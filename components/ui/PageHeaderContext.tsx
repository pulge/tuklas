"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface PageHeaderState {
  title: string;
  subtitle?: string;
  aside?: React.ReactNode;
  actions?: React.ReactNode;
}

interface PageHeaderContextType {
  setHeader: (state: PageHeaderState) => void;
  clearHeader: () => void;
}

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(undefined);

import { PageHeaderSkeleton } from "./Skeleton";

export function PageHeaderProvider({ children }: { children: React.ReactNode }) {
  const [headerState, setHeaderState] = useState<PageHeaderState | null>(null);

  const setHeader = React.useCallback((state: PageHeaderState) => {
    setHeaderState(state);
  }, []);

  const clearHeader = React.useCallback(() => {
    setHeaderState(null);
  }, []);

  return (
    <PageHeaderContext.Provider value={{ setHeader, clearHeader }}>
      <div className="flex flex-col h-full">
        <div className="shrink-0">
          {headerState ? (
            <PageHeaderComponent {...headerState} />
          ) : (
            <PageHeaderSkeleton />
          )}
        </div>
        <div className="h-full">
          {children}
        </div>
      </div>
    </PageHeaderContext.Provider>
  );
}

export function usePageHeader(state: PageHeaderState) {
  const context = useContext(PageHeaderContext);
  if (!context) {
    throw new Error("usePageHeader must be used within a PageHeaderProvider");
  }

  useEffect(() => {
    context.setHeader(state);
    return () => context.clearHeader();
  }, [state, context]);
}

// Internal component to avoid circular dependency if PageHeader is moved
import { PageHeader as PageHeaderComponent } from "./PageHeader";
