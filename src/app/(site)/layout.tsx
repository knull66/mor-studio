import { cookies } from "next/headers";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SplashIntro } from "@/components/layout/splash-intro";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { getHeroSlides, getSiteSettings } from "@/lib/data/queries";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/lib/i18n/config";
import { LanguageProvider } from "@/lib/i18n/language-provider";
import { SiteProvider } from "@/lib/site-provider";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const initialLocale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const [settings, slides] = await Promise.all([getSiteSettings(), getHeroSlides()]);

  return (
    <LanguageProvider initialLocale={initialLocale}>
      <SiteProvider settings={settings} slides={slides}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <SplashIntro />
      </SiteProvider>
    </LanguageProvider>
  );
}
