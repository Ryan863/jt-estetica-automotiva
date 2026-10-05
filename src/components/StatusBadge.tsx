"use client";

import { cn } from "@/lib/utils";
import { useOpenStatus } from "@/lib/use-open-status";

/** Selo "Aberto agora / Fechado" baseado nos horários reais. */
export function StatusBadge({ className }: { className?: string }) {
  const status = useOpenStatus();

  return (
    <span
      role="status"
      className={cn(
        "inline-flex min-h-9 items-center gap-2.5 rounded-full border border-line bg-bg/50 px-4 font-display text-xs tracking-wide backdrop-blur-md",
        className,
      )}
    >
      {status ? (
        <>
          <span className="relative flex h-2 w-2">
            {status.isOpen && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            )}
            <span
              className={cn(
                "relative inline-flex h-2 w-2 rounded-full",
                status.isOpen ? "bg-emerald-400" : "bg-red-500",
              )}
            />
          </span>
          <span className={status.isOpen ? "text-emerald-300" : "text-red-400"}>{status.label}</span>
          <span className="text-muted">· {status.detail}</span>
        </>
      ) : (
        <span className="text-muted">Seg–Sex 08:15–18:00 · Sáb 08:15–14:00</span>
      )}
    </span>
  );
}
