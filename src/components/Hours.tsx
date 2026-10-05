"use client";

import { useRef } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap, splitReveal, useGSAP } from "@/lib/gsap";
import { HOURS, formatMinutes } from "@/lib/site";
import { useOpenStatus } from "@/lib/use-open-status";
import { StatusBadge } from "./StatusBadge";
import { WhatsAppButton } from "./CtaButtons";
import { useGlow } from "./use-glow";

// Ordem de exibição: segunda → domingo (como no Google)
const ORDER = [1, 2, 3, 4, 5, 6, 0];

export default function Hours() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const status = useOpenStatus();
  useGlow(card);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        splitReveal(root.current!.querySelector("[data-split]")!);
        gsap.from(".hours-fade", {
          opacity: 0,
          y: 32,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
        gsap.from(".hours-row", {
          opacity: 0,
          x: 40,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".hours-card", start: "top 80%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="horarios"
      className="mx-auto grid max-w-[1400px] gap-12 px-5 pb-28 md:px-10 lg:grid-cols-2 lg:gap-24 lg:px-16 lg:pb-40"
    >
      <div className="flex flex-col justify-center">
        <p className="eyebrow hours-fade mb-6">Horários</p>
        <h2 data-split className="display text-[clamp(2.4rem,5.4vw,4.6rem)] text-fg">
          Atendimento que cabe na sua <em>rotina</em>
        </h2>
        <p className="hours-fade mt-8 max-w-[46ch] text-base leading-relaxed text-muted md:text-lg">
          Estamos abertos de segunda a sábado. Domingo é dia de descanso — a gente volta na segunda,
          às 08:15.
        </p>
        <div className="hours-fade mt-8 flex flex-wrap items-center gap-4">
          <StatusBadge />
        </div>
        <div className="hours-fade mt-8">
          <WhatsAppButton context="horarios">Agendar pelo WhatsApp</WhatsAppButton>
        </div>
      </div>

      <div ref={card} className="glow-card hours-card p-6 sm:p-9">
        <div className="mb-6 flex items-center gap-3 border-b border-line pb-5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent-2">
            <Clock className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="font-display text-lg font-medium tracking-wide">Horário de funcionamento</h3>
        </div>

        <ul className="relative">
          {ORDER.map((d) => {
            const h = HOURS[d];
            const isToday = status?.todayIndex === d;
            return (
              <li
                key={h.day}
                aria-current={isToday ? "date" : undefined}
                className={cn(
                  "hours-row relative flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 font-display transition-colors",
                  isToday ? "bg-accent/12 text-fg" : "text-fg/80 hover:bg-white/[0.03]",
                )}
              >
                {isToday && (
                  <span className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-accent" aria-hidden />
                )}
                <span className="flex items-center gap-3 text-[0.95rem]">
                  {h.day}
                  {isToday && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[0.62rem] font-medium uppercase tracking-widest text-white">
                      Hoje
                    </span>
                  )}
                </span>
                {h.open === null ? (
                  <span className="text-sm text-red-400">Fechado</span>
                ) : (
                  <span className="text-sm tabular-nums">
                    {formatMinutes(h.open!)} – {formatMinutes(h.close!)}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
