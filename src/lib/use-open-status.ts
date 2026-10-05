"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getOpenStatus, type OpenStatus } from "@/lib/site";

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}
const minuteSnapshot = () => Math.floor(Date.now() / 60_000);
const serverSnapshot = () => null;

/** Status aberto/fechado calculado no cliente (evita divergência de hidratação). */
export function useOpenStatus(): OpenStatus | null {
  const minute = useSyncExternalStore(subscribe, minuteSnapshot, serverSnapshot);
  return useMemo(() => (minute === null ? null : getOpenStatus(new Date(minute * 60_000))), [minute]);
}
