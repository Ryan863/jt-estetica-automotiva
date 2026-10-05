"use client";

import { useRef } from "react";
import { gsap, splitReveal, useGSAP } from "@/lib/gsap";
import { SITE } from "@/lib/site";
import { InstagramIcon } from "./icons";
import { Magnetic } from "./Magnetic";
import { WhatsAppButton } from "./CtaButtons";

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        splitReveal(root.current!.querySelector("[data-split]")!, "top 80%");

        gsap.from(".contact-fade", {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
        gsap.fromTo(
          ".contact-card",
          { yPercent: 8, scale: 0.94 },
          {
            yPercent: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: ".contact-card", start: "top bottom", end: "top 45%", scrub: true },
          },
        );
        // tubos azuis deslizam em parallax
        gsap.to(".tube-a", {
          xPercent: -12,
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: ".contact-card", start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.to(".tube-b", {
          xPercent: 10,
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: ".contact-card", start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="contato"
      className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 lg:px-16 lg:pb-32"
    >
      <div className="contact-card relative isolate overflow-hidden rounded-[36px] bg-[#eef3ff] px-7 py-14 text-[#0b1530] sm:px-12 sm:py-20 lg:px-20 lg:py-24">
        {/* tubos azuis decorativos */}
        <svg
          aria-hidden
          viewBox="0 0 900 600"
          preserveAspectRatio="xMaxYMid slice"
          className="pointer-events-none absolute inset-y-0 right-0 -z-10 h-full w-full max-w-[900px] opacity-95"
        >
          <defs>
            <linearGradient id="tube1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#4f8dff" />
              <stop offset="0.5" stopColor="#1f6bff" />
              <stop offset="1" stopColor="#0a1f5c" />
            </linearGradient>
            <linearGradient id="tube2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#12307a" />
              <stop offset="1" stopColor="#05102e" />
            </linearGradient>
          </defs>
          <path
            className="tube-a"
            d="M900 40 C 700 60, 560 200, 520 420 S 420 640, 300 700"
            fill="none"
            stroke="url(#tube1)"
            strokeWidth="130"
            strokeLinecap="round"
          />
          <path
            className="tube-b"
            d="M900 280 C 760 300, 700 420, 640 560 S 600 700, 520 740"
            fill="none"
            stroke="url(#tube2)"
            strokeWidth="110"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative max-w-[640px]">
          <p className="contact-fade mb-6 font-display text-xs uppercase tracking-[0.28em] text-[#1f6bff]">
            Contato
          </p>
          <h2
            data-split
            className="display text-[clamp(2.4rem,5.6vw,4.8rem)] text-[#0b1530] [&_em]:text-[#1f6bff]"
          >
            Fale com a gente <em>agora</em>
          </h2>
          <p className="contact-fade mt-7 max-w-[46ch] text-base leading-relaxed text-[#0b1530]/75 md:text-lg">
            Chame no WhatsApp pelo número{" "}
            <strong className="font-semibold text-[#0b1530]">{SITE.phoneDisplay}</strong> — a mensagem já
            vai pronta, é só enviar.
          </p>

          <div className="contact-fade mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppButton context="contato" variant="light">
              Chamar no WhatsApp
            </WhatsAppButton>
            <Magnetic>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark"
              >
                <InstagramIcon className="h-5 w-5" />
                @{SITE.instagramHandle}
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
