import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { SITE } from "@/lib/constants";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "MOR Studio in San Antonio, Texas. Photography and makeup by Elisabeth Morao for brides, weddings, events, and editorial portrait.",
  keywords: [
    "bridal makeup San Antonio",
    "wedding photographer San Antonio",
    "Elisabeth Morao",
    "MOR Studio",
    "maquillaje de novia San Antonio",
    "fotografía de bodas Texas",
  ],
  openGraph: {
    title: `${SITE.name} · ${SITE.tagline}`,
    description:
      "Photography and makeup studio in San Antonio, Texas, led by Elisabeth Morao.",
    locale: "es_US",
    alternateLocale: ["en_US"],
    type: "website",
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} · ${SITE.tagline}`,
    description:
      "Photography and makeup studio in San Antonio, Texas, led by Elisabeth Morao.",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: SITE.name,
    founder: SITE.artist,
    description: t.meta.description,
    url: SITE.url,
    telephone: SITE.phoneTel,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
      streetAddress: SITE.address,
    },
    openingHours: "Tu-Sa 10:00-19:00",
    sameAs: [SITE.instagram, SITE.facebook],
    priceRange: "$$",
  };

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#FAF8F5",
              color: "#1C1917",
              border: "1px solid #EBE3D8",
              fontFamily: "var(--font-jakarta)",
            },
          }}
        />
      </body>
    </html>
  );
}
