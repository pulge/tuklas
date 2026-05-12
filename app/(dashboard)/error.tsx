"use client";

import { Button } from "@/components/ui/Button";
import { AlertTriangle, Home, RotateCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 border-4 border-admin-danger bg-admin-surface shadow-[8px_8px_0px_0px_rgba(var(--admin-danger-rgb),0.1)]">
      <div className="w-16 h-16 bg-admin-danger text-admin-contrast flex items-center justify-center mb-6">
        <AlertTriangle size={32} />
      </div>

      <h1 className="text-4xl font-black uppercase tracking-tighter text-admin-heading mb-2">
        Dashboard Error
      </h1>
      <p className="text-[10px] font-bold text-admin-muted uppercase tracking-widest mb-8 leading-relaxed max-w-sm">
        The dashboard encountered an unexpected condition (500).
        <span className="block mt-2 opacity-50 font-mono text-[8px]">ID: {error.digest || "unknown"}</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="flex-1 gap-2 py-6 text-sm border-2"
        >
          <ArrowLeft size={18} />
          Go Back
        </Button>

        <Button
          onClick={() => reset()}
          className="flex-1 gap-2 py-6 text-sm"
        >
          <RotateCcw size={18} />
          Try Again
        </Button>

        <Link href="/" className="flex-1">
          <Button
            variant="outline"
            className="w-full gap-2 py-6 text-sm border-2"
          >
            <Home size={18} />
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
