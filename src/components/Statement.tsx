"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

/** Frase em tela cheia: as palavras acendem conforme a rolagem (pin + scrub). */
export default function Statement() {
  const root = useRef<HTMLElement>(null);
  const text = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(text.current!, {
          type: "words",
          autoSplit: true,
          onSplit: (self) => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: "+=110%",
                pin: true,
                scrub: 0.6,
                anticipatePin: 1,
              },
            });
            tl.fromTo(
              self.words,
              { opacity: 0.14, filter: "blur(6px)" },
              { opacity: 1, filter: "blur(0px)", stagger: 0.18, ease: "none", duration: 1 },
            );
            tl.to(".statement-glow", { scale: 1.45, opacity: 1, ease: "none", duration: 5 }, 0);
            return tl;
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="Nossa essência"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 md:px-10 lg:px-16"
    >
      <div
        aria-hidden
        className="statement-glow absolute left-1/2 top-1/2 h-[64vmin] w-[64vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(31,107,255,0.32),transparent)] opacity-50"
      />
      <p
        ref={text}
        className="display relative mx-auto max-w-[1200px] text-center text-[clamp(2rem,6.2vw,5.4rem)] text-fg"
      >
        Lava-jato e estética automotiva em Curitiba. Seu carro merece sair daqui{" "}
        <em>brilhando.</em>
      </p>
    </section>
  );
}
