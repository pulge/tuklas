"use client";

import { Toaster } from "sonner";
import { useEffect, useState } from "react";

export function ClientToaster() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Toaster 
      position={isMobile ? "bottom-center" : "bottom-right"}
      expand={false}
      visibleToasts={isMobile ? 3 : 6}
      richColors={false}
      toastOptions={{
        style: {
          borderRadius: '0px',
          border: '2px solid var(--admin-border-strong)',
          background: 'var(--admin-surface)',
          color: 'var(--admin-text)',
          fontSize: '11px',
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          padding: '12px 16px',
          boxShadow: 'none',
          fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
        },
      }}
    />
  );
}
