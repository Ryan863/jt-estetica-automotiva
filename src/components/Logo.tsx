import { cn } from "@/lib/utils";

/** Recriação vetorial do logotipo (carro em linha + JT ESTÉTICA AUTOMOTIVA). */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 150 64"
        className={cn("shrink-0", compact ? "h-9 w-auto" : "h-11 w-auto")}
        role="img"
        aria-label="JT Estética Automotiva"
      >
        <defs>
          <linearGradient id="logo-g" x1="0" x2="1">
            <stop offset="0" stopColor="#5b9bff" />
            <stop offset="1" stopColor="#1f6bff" />
          </linearGradient>
        </defs>
        {/* silhueta do carro */}
        <g transform="scale(1.4 1)">
          <path
            d="M6 30c2-5 9-7 18-8 6-7 14-12 30-12 14 0 22 5 28 11 8 1 14 3 17 8"
            fill="none"
            stroke="url(#logo-g)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path d="M30 22c8-6 16-8 28-8 10 0 18 3 24 8" fill="none" stroke="url(#logo-g)" strokeWidth="1.6" strokeLinecap="round" opacity=".7" />
        </g>
        <text
          x="6"
          y="54"
          fontFamily="var(--font-outfit), Arial, sans-serif"
          fontWeight="800"
          fontSize="28"
          fill="#f2f5fb"
          letterSpacing="-1"
        >
          JT
        </text>
        <text
          x="50"
          y="54"
          fontFamily="var(--font-outfit), Arial, sans-serif"
          fontWeight="500"
          fontSize="19"
          fill="#3d80ff"
          textLength="92"
          lengthAdjust="spacingAndGlyphs"
        >
          ESTÉTICA
        </text>
      </svg>
      {!compact && (
        <span className="hidden font-display text-[0.62rem] uppercase tracking-[0.32em] text-muted sm:block">
          Automotiva
        </span>
      )}
    </span>
  );
}
