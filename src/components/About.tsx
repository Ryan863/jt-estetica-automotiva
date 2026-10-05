"use client";

import { useRef } from "react";
import Image from "next/image";
import { Droplets, Sparkles, CalendarDays } from "lucide-react";
import { gsap, splitReveal, useGSAP } from "@/lib/gsap";
import { SITE } from "@/lib/site";
import { WhatsAppButton } from "./CtaButtons";

const CHIPS = [
  { icon: Droplets, label: "Lava-jato" },
  { icon: Sparkles, label: "Estética automotiva" },
  { icon: CalendarDays, label: "Segunda a sábado" },
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        splitReveal(root.current!.querySelector("[data-split]")!);

        gsap.from(".about-fade", {
          opacity: 0,
          y: 36,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".about-copy", start: "top 78%", once: true },
        });

        // imagem: máscara que abre + parallax interno
        gsap.fromTo(
          ".about-img-wrap",
          { clipPath: "inset(14% 14% 14% 14% round 48px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            ease: "none",
            scrollTrigger: {
              trigger: ".about-img-wrap",
              start: "top 92%",
              end: "top 35%",
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          ".about-img",
          { scale: 1.3, yPercent: -8 },
          {
            scale: 1.02,
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".about-img-wrap",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="sobre"
      className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-28 md:px-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:px-16 lg:py-40"
    >
      <div className="about-copy order-2 lg:order-1">
        <p className="eyebrow about-fade mb-6">Sobre nós</p>
        <h2
          data-split
          className="display text-[clamp(2.4rem,5.6vw,4.8rem)] text-fg"
        >
          Estética <em>automotiva</em> em Curitiba
        </h2>
        <p className="about-fade mt-8 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
          A <strong className="font-medium text-fg">{SITE.name}</strong> é um lava-jato localizado na{" "}
          {SITE.address.street}, em {SITE.address.city}, {SITE.address.state}. Atendemos de segunda a
          sábado para deixar o seu carro com a aparência que ele merece.
        </p>
        <p className="about-fade mt-4 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
          Quer saber mais ou combinar um horário? Chame a gente no WhatsApp.
        </p>

        <ul className="about-fade mt-8 flex flex-wrap gap-3" aria-label="Destaques">
          {CHIPS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 font-display text-sm text-fg/90"
            >
              <Icon className="h-4 w-4 text-accent-2" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>

        <div className="about-fade mt-10">
          <WhatsAppButton context="geral" />
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <div className="about-img-wrap relative aspect-[4/5] w-full overflow-hidden rounded-[32px] border border-line sm:aspect-[4/3] lg:aspect-[4/4.4]">
          <Image
            src="/media/car-detail.jpg"
            alt="Carro preto com gotas de água na lataria, refletindo luz azul"
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="about-img object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
