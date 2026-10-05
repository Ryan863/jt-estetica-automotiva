"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const ITEMS = ["Lava-jato", "Estética Automotiva", "Curitiba", "Paraná"];

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item, i) => (
        <span key={item} className="flex items-center">
          <span
            className={`display whitespace-nowrap px-6 text-[clamp(2.2rem,6vw,5rem)] ${
              i % 2 === 0 ? "text-fg" : "marquee-outline"
            }`}
          >
            {item}
          </span>
          <span className="h-3 w-3 rotate-45 bg-accent" />
        </span>
      ))}
    </div>
  );
}

/** Faixa rolante cuja velocidade e direção reagem ao scroll. */
export default function Marquee() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(track.current, {
          xPercent: -50,
          ease: "none",
          duration: 34,
          repeat: -1,
        });
        const state = { v: 1 };
        const apply = () => tween.timeScale(state.v);

        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const dir = self.direction;
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 260, 7);
            gsap.to(state, {
              v: dir * boost,
              duration: 0.25,
              overwrite: true,
              onUpdate: apply,
              onComplete: () => {
                gsap.to(state, { v: dir, duration: 1.2, ease: "power2.out", onUpdate: apply });
              },
            });
          },
        });

        gsap.from(root.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 95%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="faixa"
      aria-label="Lava-jato e estética automotiva em Curitiba, Paraná"
      className="relative overflow-hidden border-y border-line bg-surface/40 py-8"
    >
      <div ref={track} className="flex w-max will-change-transform">
        <Track />
        <Track hidden />
        <Track hidden />
        <Track hidden />
      </div>
    </section>
  );
}
