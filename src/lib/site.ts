/**
 * Dados reais do estabelecimento (fonte: Instagram / Google).
 * Nada além disso deve ser exibido no site como informação factual.
 */
export const SITE = {
  name: "JT Estética Automotiva",
  tagline: "Lava-jato em Curitiba, Paraná",
  phoneDisplay: "(41) 99778-7315",
  phoneDigits: "41997787315",
  whatsappNumber: "5541997787315",
  instagramHandle: "jt_estetica_automotiva",
  instagramUrl: "https://www.instagram.com/jt_estetica_automotiva",
  address: {
    street: "Rua Frei Rogério, 50",
    city: "Curitiba",
    state: "Paraná",
    stateCode: "PR",
    zip: "81530-080",
  },
} as const;

export const FULL_ADDRESS = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state}, ${SITE.address.zip}`;

const MAPS_QUERY = encodeURIComponent(`${SITE.name}, ${FULL_ADDRESS}`);

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

/** 0 = domingo … 6 = sábado (mesma ordem de Date#getDay) */
export const HOURS: ReadonlyArray<{
  day: string;
  short: string;
  /** minutos desde 00:00; null = fechado */
  open: number | null;
  close: number | null;
}> = [
  { day: "Domingo", short: "Dom", open: null, close: null },
  { day: "Segunda-feira", short: "Seg", open: 8 * 60 + 15, close: 18 * 60 },
  { day: "Terça-feira", short: "Ter", open: 8 * 60 + 15, close: 18 * 60 },
  { day: "Quarta-feira", short: "Qua", open: 8 * 60 + 15, close: 18 * 60 },
  { day: "Quinta-feira", short: "Qui", open: 8 * 60 + 15, close: 18 * 60 },
  { day: "Sexta-feira", short: "Sex", open: 8 * 60 + 15, close: 18 * 60 },
  { day: "Sábado", short: "Sáb", open: 8 * 60 + 15, close: 14 * 60 },
];

export const formatMinutes = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/* ------------------------------------------------------------------ */
/* Status aberto / fechado (fuso de Curitiba)                          */
/* ------------------------------------------------------------------ */

export type OpenStatus = {
  isOpen: boolean;
  todayIndex: number;
  label: string;
  detail: string;
};

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function zonedParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  return {
    day: WEEKDAY_INDEX[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function getOpenStatus(date: Date): OpenStatus {
  const { day, minutes } = zonedParts(date);
  const today = HOURS[day];

  if (today.open !== null && today.close !== null && minutes >= today.open && minutes < today.close) {
    return {
      isOpen: true,
      todayIndex: day,
      label: "Aberto agora",
      detail: `fecha às ${formatMinutes(today.close)}`,
    };
  }

  // Próxima abertura
  for (let i = 0; i < 7; i++) {
    const idx = (day + i) % 7;
    const h = HOURS[idx];
    if (h.open === null) continue;
    if (i === 0 && minutes >= h.open) continue; // já passou hoje
    const when = i === 0 ? "hoje" : i === 1 ? "amanhã" : h.day.toLowerCase();
    return {
      isOpen: false,
      todayIndex: day,
      label: "Fechado",
      detail: `abre ${when} às ${formatMinutes(h.open)}`,
    };
  }
  return { isOpen: false, todayIndex: day, label: "Fechado", detail: "" };
}

/* ------------------------------------------------------------------ */
/* WhatsApp automatizado                                               */
/* ------------------------------------------------------------------ */

export type WhatsAppContext = "geral" | "horarios" | "contato" | "flutuante";

const INTENTS: Record<WhatsAppContext, string> = {
  geral: "gostaria de mais informações sobre os serviços",
  horarios: "gostaria de agendar um horário",
  contato: "gostaria de pedir um orçamento",
  flutuante: "gostaria de falar com vocês",
};

function greeting(date: Date) {
  const hour = Math.floor(zonedParts(date).minutes / 60);
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

/** Gera o link do WhatsApp. Com `now`, a saudação respeita o horário local de Curitiba. */
export function whatsappUrl(context: WhatsAppContext = "geral", now?: Date) {
  const hello = now ? `${greeting(now)}!` : "Olá!";
  const text = `${hello} Vim pelo site da ${SITE.name} e ${INTENTS[context]}.`;
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
