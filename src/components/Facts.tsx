"use client";

import { useRef } from "react";
import { gsap, splitReveal, useGSAP } from "@/lib/gsap";
import { formatMinutes } from "@/lib/site";

type Fact = {
  value: number;
  kind: "int" | "time";
  label: string;
};

const FACTS: Fact[] = [
  { value: 6, kind: "int", label: "dias de atendimento por semana" },
  { value: 8 * 60 + 15, kind: "time", label: "abrimos às, de segunda a sábado" },
  { value: 18 * 60, kind: "time", label: "fechamos às, de segunda a sexta" },
];

const render = (f: Fact, n: number) => (f.kind === "int" ? String(Math.round(n)) : formatMinutes(Math.round(n)));

export default function Facts() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        splitReveal(root.current!.querySelector("[data-split]")!);

        gsap.from(".fact", {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".facts-grid", start: "top 82%", once: true },
        });
        gsap.from(".fact-line", {
          scaleY: 0,
          transformOrigin: "top",
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".facts-grid", start: "top 82%", once: true },
        });

        root.current!.querySelectorAll<HTMLElement>("[data-fact]").forEach((el) => {
          const fact = FACTS[Number(el.dataset.fact)];
          const proxy = { n: 0 };
          el.textContent = render(fact, 0);
          gsap.to(proxy, {
            n: fact.value,
            duration: 2.2,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = render(fact, proxy.n);
            },
            scrollTrigger: { trigger: ".facts-grid", start: "top 82%", once: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="facts-title"
      className="mx-auto max-w-[1400px] px-5 pb-28 md:px-10 lg:px-16 lg:pb-40"
    >
      <div className="grid items-center gap-12 border-t border-line pt-20 lg:grid-cols-[0.8fr_1.6fr] lg:gap-8">
        <h2
          id="facts-title"
          data-split
          className="display text-[clamp(2.4rem,5vw,4.4rem)] text-fg"
        >
          Atendimento em <em>números</em>
        </h2>

        <dl className="facts-grid grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0">
          {FACTS.map((f, i) => (
            <div
              key={f.label}
              className="fact relative flex flex-col gap-3 sm:px-8 sm:first:pl-0 sm:last:pr-0"
            >
              {i > 0 && (
                <span
                  aria-hidden
                  className="fact-line absolute left-0 top-1 hidden h-[78%] w-px bg-gradient-to-b from-accent to-transparent sm:block"
                />
              )}
              <dt className="order-2 max-w-[22ch] text-sm leading-snug text-muted">{f.label}</dt>
              <dd
                data-fact={i}
                className="display order-1 text-[clamp(3rem,5.2vw,4.6rem)] font-light tabular-nums text-fg"
              >
                {render(f, f.value)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
