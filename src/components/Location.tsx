"use client";

import { useRef } from "react";
import { MapPin, Phone } from "lucide-react";
import { gsap, splitReveal, useGSAP } from "@/lib/gsap";
import { FULL_ADDRESS, MAPS_EMBED_URL, SITE } from "@/lib/site";
import { MapsButton } from "./CtaButtons";
import { useGlow } from "./use-glow";

export default function Location() {
  const root = useRef<HTMLElement>(null);
  const info = useRef<HTMLDivElement>(null);
  useGlow(info);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        splitReveal(root.current!.querySelector("[data-split]")!);
        gsap.from(".loc-fade", {
          opacity: 0,
          y: 32,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
        gsap.fromTo(
          ".loc-map",
          { clipPath: "inset(12% 8% 12% 8% round 40px)", scale: 0.94 },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: ".loc-map", start: "top 95%", end: "top 40%", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="localizacao"
      className="mx-auto max-w-[1400px] px-5 pb-28 md:px-10 lg:px-16 lg:pb-40"
    >
      <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow loc-fade mb-6">Localização</p>
          <h2 data-split className="display text-[clamp(2.4rem,5.4vw,4.6rem)] text-fg">
            Como <em>chegar</em>
          </h2>
        </div>
        <div className="loc-fade flex flex-wrap gap-3">
          <MapsButton variant="primary" directions />
          <MapsButton variant="ghost" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.6fr]">
        <div ref={info} className="glow-card loc-fade flex flex-col justify-between gap-10 p-7 sm:p-9">
          <div className="flex flex-col gap-8">
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-2">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-sm uppercase tracking-[0.2em] text-muted">Endereço</h3>
                <address className="mt-2 font-display text-xl not-italic leading-snug text-fg">
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}, {SITE.address.state}
                  <br />
                  <span className="text-fg/70">CEP {SITE.address.zip}</span>
                </address>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-2">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-sm uppercase tracking-[0.2em] text-muted">Telefone</h3>
                <a
                  href={`tel:+55${SITE.phoneDigits}`}
                  className="mt-2 inline-block font-display text-xl text-fg transition-colors hover:text-accent-2"
                >
                  {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            Toque em “Traçar rota” para abrir o trajeto direto no Google Maps do seu celular.
          </p>
        </div>

        <div className="loc-map relative min-h-[360px] overflow-hidden rounded-[28px] border border-line bg-surface lg:min-h-[520px]">
          <iframe
            title={`Mapa do Google: ${FULL_ADDRESS}`}
            src={MAPS_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="map-dark absolute inset-0 h-full w-full border-0"
          />
          <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />
        </div>
      </div>
    </section>
  );
}
