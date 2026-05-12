"use client";

import { Button } from "@/components/ui/Button";
import { Home, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 border-4 border-admin-contrast bg-admin-surface shadow-[8px_8px_0px_0px_rgba(var(--admin-contrast-rgb),0.1)]">
      <div className="w-16 h-16 bg-admin-accent text-admin-contrast flex items-center justify-center mb-6">
        <Search size={32} />
      </div>

      <h1 className="text-4xl font-black uppercase tracking-tighter text-admin-heading mb-2">
        404 Error
      </h1>
      <p className="text-[10px] font-bold text-admin-muted uppercase tracking-widest mb-8 leading-relaxed max-w-sm">
        The dashboard page you are looking for has been moved or deleted.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="flex-1 gap-2 py-6 text-sm border-2"
        >
          <ArrowLeft size={18} />
          Go Back
        </Button>

        <Link href="/" className="flex-1">
          <Button
            className="w-full gap-2 py-6 text-sm"
          >
            <Home size={18} />
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
