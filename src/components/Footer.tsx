import { Phone, MapPin } from "lucide-react";
import { SITE, HOURS, formatMinutes } from "@/lib/site";
import { Logo } from "./Logo";
import { InstagramIcon, WhatsAppIcon } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface/50">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:px-10 lg:px-16">
        <div>
          <Logo />
          <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-muted">{SITE.tagline}.</p>
          <div className="mt-6 flex gap-3">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da JT Estética Automotiva"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg/80 transition-colors hover:border-accent-2 hover:bg-accent/15 hover:text-fg"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da JT Estética Automotiva"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg/80 transition-colors hover:border-accent-2 hover:bg-accent/15 hover:text-fg"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-sm">
          <h3 className="eyebrow">Contato</h3>
          <p className="flex items-start gap-3 text-fg/85">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-2" aria-hidden="true" />
            <span>
              {SITE.address.street}
              <br />
              {SITE.address.city}, {SITE.address.state} — {SITE.address.zip}
            </span>
          </p>
          <a
            href={`tel:+55${SITE.phoneDigits}`}
            className="flex items-center gap-3 text-fg/85 transition-colors hover:text-accent-2"
          >
            <Phone className="h-4 w-4 shrink-0 text-accent-2" aria-hidden="true" />
            {SITE.phoneDisplay}
          </a>
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <h3 className="eyebrow">Horários</h3>
          <ul className="flex flex-col gap-1.5 text-fg/85">
            <li className="flex justify-between gap-6">
              <span>Seg – Sex</span>
              <span className="tabular-nums">
                {formatMinutes(HOURS[1].open!)} – {formatMinutes(HOURS[1].close!)}
              </span>
            </li>
            <li className="flex justify-between gap-6">
              <span>Sábado</span>
              <span className="tabular-nums">
                {formatMinutes(HOURS[6].open!)} – {formatMinutes(HOURS[6].close!)}
              </span>
            </li>
            <li className="flex justify-between gap-6 text-muted">
              <span>Domingo</span>
              <span>Fechado</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-[1400px] px-5 py-6 text-xs text-muted md:px-10 lg:px-16">
          © {year} {SITE.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
