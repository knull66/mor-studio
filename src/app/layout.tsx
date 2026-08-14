import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { SITE } from "@/lib/constants";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getSiteSettings } from "@/lib/data/queries";
import { socialHref } from "@/lib/site";
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

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: t.meta.title,
      template: `%s · ${SITE.name}`,
    },
    description: t.meta.description,
    keywords: [
      "bridal makeup San Antonio",
      "wedding photographer San Antonio",
      "Elisabeth Morao",
      "MOR Studio",
      "maquillaje de novia San Antonio",
      "fotografía de bodas Texas",
      "peinado de novia San Antonio",
    ],
    icons: {
      icon: [{ url: "/icon.png", type: "image/png" }],
      apple: [{ url: "/apple-icon.png", type: "image/png" }],
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "es" ? "es_US" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_US"],
      type: "website",
      url: SITE.url,
      siteName: SITE.name,
      images: [
        {
          url: "/images/og-mor.png?v=20260813",
          width: 1200,
          height: 630,
          alt: "MOR Photography",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/images/og-mor.png?v=20260813"],
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDictionary(locale);
  const settings = await getSiteSettings();
  const sameAs = [
    socialHref("instagram", settings.instagram),
    socialHref("facebook", settings.facebook),
    socialHref("tiktok", settings.tiktok),
  ].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: SITE.name,
    founder: SITE.artist,
    description: t.meta.description,
    url: SITE.url,
    telephone: settings.phone_display,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
      streetAddress: settings.address,
    },
    openingHours: "Tu-Sa 10:00-19:00",
    sameAs,
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
