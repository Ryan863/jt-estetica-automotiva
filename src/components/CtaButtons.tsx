"use client";

import type { ReactNode } from "react";
import { ArrowUpRight, MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAPS_DIRECTIONS_URL, MAPS_URL, whatsappUrl, type WhatsAppContext } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "ghost" | "light" | "outline-dark";

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  ghost: "btn btn-ghost",
  light: "btn btn-light",
  "outline-dark": "btn btn-outline-dark",
};

/**
 * Botão de WhatsApp "automatizado": a mensagem já vai pronta e a saudação
 * (bom dia / boa tarde / boa noite) é calculada no momento do clique.
 */
export function WhatsAppButton({
  context = "geral",
  variant = "primary",
  className,
  children = "Chamar no WhatsApp",
  magnetic = true,
}: {
  context?: WhatsAppContext;
  variant?: Variant;
  className?: string;
  children?: ReactNode;
  magnetic?: boolean;
}) {
  const refresh = (el: HTMLAnchorElement) => {
    el.href = whatsappUrl(context, new Date());
  };
  const link = (
    <a
      href={whatsappUrl(context)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(variantClass[variant], className)}
      onClick={(e) => refresh(e.currentTarget)}
      onMouseEnter={(e) => refresh(e.currentTarget)}
      onFocus={(e) => refresh(e.currentTarget)}
      onTouchStart={(e) => refresh(e.currentTarget)}
      data-cta="whatsapp"
    >
      <WhatsAppIcon className="h-5 w-5" />
      {children}
    </a>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

export function MapsButton({
  variant = "ghost",
  directions = false,
  className,
  children,
  magnetic = true,
}: {
  variant?: Variant;
  directions?: boolean;
  className?: string;
  children?: ReactNode;
  magnetic?: boolean;
}) {
  const Icon = directions ? Navigation : MapPin;
  const link = (
    <a
      href={directions ? MAPS_DIRECTIONS_URL : MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(variantClass[variant], className)}
      data-cta="maps"
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      {children ?? (directions ? "Traçar rota" : "Ver no Google Maps")}
      <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden="true" />
    </a>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
