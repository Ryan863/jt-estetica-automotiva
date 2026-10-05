import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SITE, FULL_ADDRESS } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const description =
  "JT Estética Automotiva — lava-jato em Curitiba, Paraná. Rua Frei Rogério, 50. Atendimento de segunda a sábado. Chame no WhatsApp (41) 99778-7315.";

export const metadata: Metadata = {
  title: "JT Estética Automotiva | Lava-jato em Curitiba, PR",
  description,
  keywords: [
    "estética automotiva Curitiba",
    "lava-jato Curitiba",
    "JT Estética Automotiva",
    "lavagem de carro Curitiba",
  ],
  openGraph: {
    title: "JT Estética Automotiva | Lava-jato em Curitiba, PR",
    description,
    locale: "pt_BR",
    type: "website",
    siteName: SITE.name,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoWash",
  name: SITE.name,
  description: SITE.tagline,
  telephone: "+55 41 99778-7315",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.stateCode,
    postalCode: SITE.address.zip,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:15",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:15",
      closes: "14:00",
    },
  ],
  sameAs: [SITE.instagramUrl],
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(FULL_ADDRESS)}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
