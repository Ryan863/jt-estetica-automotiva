"use client";

import { useRef } from "react";
import { WhatsAppIcon } from "./icons";
import { whatsappUrl } from "@/lib/site";
import { gsap, useGSAP } from "@/lib/gsap";

/** Botão flutuante de WhatsApp — mensagem pronta + saudação automática por horário. */
export default function WhatsAppFloat() {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    gsap.from(ref.current, {
      scale: 0,
      opacity: 0,
      duration: 0.9,
      ease: "back.out(1.8)",
      delay: 2.2,
    });
  });

  const refresh = (el: HTMLAnchorElement) => {
    el.href = whatsappUrl("flutuante", new Date());
  };

  return (
    <a
      ref={ref}
      href={whatsappUrl("flutuante")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      onClick={(e) => refresh(e.currentTarget)}
      onMouseEnter={(e) => refresh(e.currentTarget)}
      onFocus={(e) => refresh(e.currentTarget)}
      onTouchStart={(e) => refresh(e.currentTarget)}
      data-cta="whatsapp-float"
      className="group fixed bottom-5 right-5 z-50 flex h-[60px] cursor-pointer items-center gap-3 rounded-full bg-[#25d366] pl-[18px] pr-[18px] text-white shadow-[0_12px_40px_-8px_rgba(37,211,102,0.7)] transition-[padding,translate] duration-500 hover:-translate-y-1 hover:pr-6 md:bottom-8 md:right-8"
    >
      <span aria-hidden className="wa-ring absolute inset-0 -z-10 rounded-full bg-[#25d366]" />
      <WhatsAppIcon className="h-7 w-7 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-display text-sm font-medium opacity-0 transition-[max-width,opacity] duration-500 group-hover:max-w-[160px] group-hover:opacity-100 group-focus-visible:max-w-[160px] group-focus-visible:opacity-100">
        Fale conosco
      </span>
    </a>
  );
}
