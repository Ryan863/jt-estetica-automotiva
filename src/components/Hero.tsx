"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Pause, Play } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { gsap, useGSAP } from "@/lib/gsap";
import { MapsButton, WhatsAppButton } from "./CtaButtons";
import { StatusBadge } from "./StatusBadge";
import { scrollToTarget } from "./SmoothScroll";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  /* Pausa o vídeo fora da tela e respeita prefers-reduced-motion */
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.pause();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPaused(true);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reduce && el.dataset.userPaused !== "1") el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleVideo = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      el.dataset.userPaused = "0";
      el.play().catch(() => {});
      setPaused(false);
    } else {
      el.dataset.userPaused = "1";
      el.pause();
      setPaused(true);
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollCfg = {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };
        // parallax do vídeo
        gsap.to(".hero-video", { scale: 1.2, yPercent: 8, ease: "none", scrollTrigger: scrollCfg });
        // conteúdo sobe e some
        gsap.to(".hero-content", {
          yPercent: -14,
          opacity: 0,
          ease: "none",
          scrollTrigger: { ...scrollCfg, end: "75% top" },
        });
        // brilho da aurora se desloca
        gsap.to(".aurora-layer", { yPercent: 22, ease: "none", scrollTrigger: scrollCfg });

        // entrada dos elementos secundários
        gsap.from(".hero-fade", {
          opacity: 0,
          y: 24,
          duration: 1,
          ease: "power3.out",
          stagger: 0.14,
          delay: 1.1,
        });
        gsap.to(".hero-chevron", { y: 8, repeat: -1, yoyo: true, duration: 0.9, ease: "sine.inOut" });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="topo" aria-label="Início" className="relative">
      <AuroraBackground
        className="min-h-[100svh]"
        backdrop={
          <>
            <video
              ref={video}
              className="hero-video absolute inset-0 h-full w-full object-cover will-change-transform"
              src="/media/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-bg/65 via-bg/10 to-bg" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,7,13,0.6)_100%)]" />
          </>
        }
      >
        <div className="hero-content flex w-full flex-col items-center px-5 pb-28 pt-32 md:px-10">
          <StatusBadge className="hero-fade mb-8" />

          {/* Animação de texto (framer-motion) */}
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col items-center justify-center gap-4 px-4"
          >
            <h1 className="display text-center text-[clamp(2.6rem,10.5vw,8.5rem)] font-semibold text-white">
              JT <em className="pr-[0.08em]">Estética</em>
              <br />
              <span className="font-light">Automotiva</span>
            </h1>
            <p className="py-2 text-center font-display text-base font-extralight tracking-wide text-neutral-200 md:text-4xl">
              Lava-jato em <span className="text-accent-2">Curitiba, Paraná</span>
            </p>
          </motion.div>

          <div className="hero-fade mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton context="geral">Chamar no WhatsApp</WhatsAppButton>
            <MapsButton variant="ghost" />
          </div>
        </div>

        {/* indicador de rolagem */}
        <button
          type="button"
          onClick={() => scrollToTarget("#faixa", 0)}
          aria-label="Rolar para o conteúdo"
          className="hero-fade absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 font-display text-[0.65rem] uppercase tracking-[0.35em] text-muted transition-colors hover:text-fg md:flex"
        >
          Role
          <ChevronDown className="hero-chevron h-5 w-5 text-accent-2" aria-hidden="true" />
        </button>

        {/* controle do vídeo */}
        <button
          type="button"
          onClick={toggleVideo}
          aria-label={paused ? "Reproduzir vídeo de fundo" : "Pausar vídeo de fundo"}
          className="hero-fade absolute bottom-6 left-5 z-20 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-bg/50 text-fg backdrop-blur-md transition-colors hover:bg-accent/30 md:left-10"
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </AuroraBackground>
    </section>
  );
}
