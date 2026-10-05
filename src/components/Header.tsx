"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { WhatsAppButton } from "./CtaButtons";
import { scrollToTarget } from "./SmoothScroll";
import { gsap, useGSAP } from "@/lib/gsap";

const NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#horarios", label: "Horários" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(
    () => {
      gsap.from(ref.current, { yPercent: -100, opacity: 0, duration: 1, ease: "expo.out", delay: 0.2 });
    },
    { scope: ref },
  );

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    // espera o scroll lock do menu ser liberado
    window.setTimeout(() => scrollToTarget(href), 30);
  };

  return (
    <>
    <header
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
        scrolled || open
          ? "border-b border-line bg-bg/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 md:px-10 lg:px-16">
        <a
          href="#topo"
          onClick={(e) => go(e, "#topo")}
          aria-label="JT Estética Automotiva — voltar ao topo"
          className="relative z-10"
        >
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => go(e, item.href)}
              className="group relative py-2 font-display text-sm tracking-wide text-fg/80 transition-colors hover:text-fg"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent-2 transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <WhatsAppButton
            context="geral"
            className="hidden !min-h-11 !px-5 !text-sm md:inline-flex"
            magnetic={false}
          >
            WhatsApp
          </WhatsAppButton>
          <button
            type="button"
            className="relative z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-white/5 text-fg transition-colors hover:bg-white/10 md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>

    {/* menu mobile (fora do <header> para o position: fixed ignorar o backdrop-filter) */}
    <div
      id="mobile-menu"
      className={cn(
        "fixed inset-0 z-40 flex flex-col justify-between bg-bg/95 px-5 pb-10 pt-[104px] backdrop-blur-2xl transition-[opacity,translate] duration-500 md:hidden",
        open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0",
      )}
      inert={!open}
    >
      <nav aria-label="Menu mobile" className="flex flex-col">
        {NAV.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => go(e, item.href)}
            tabIndex={open ? 0 : -1}
            className="display border-b border-line py-5 text-4xl transition-colors hover:text-accent-2"
            style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <WhatsAppButton context="geral" className="w-full" magnetic={false} />
    </div>
    </>
  );
}
