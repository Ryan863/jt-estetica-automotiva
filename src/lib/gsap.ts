"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Revela um título linha a linha / palavra a palavra com máscara.
 * `autoSplit` refaz o split quando a fonte termina de carregar ou a largura muda.
 */
export function splitReveal(el: Element, start = "top 86%") {
  return SplitText.create(el, {
    type: "lines,words",
    mask: "lines",
    autoSplit: true,
    onSplit: (self) =>
      gsap.from(self.words, {
        yPercent: 115,
        rotate: 3,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.05,
        scrollTrigger: { trigger: el, start, once: true },
      }),
  });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
