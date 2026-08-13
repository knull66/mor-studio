import { cookies } from "next/headers";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/lib/i18n/config";
import { LanguageProvider } from "@/lib/i18n/language-provider";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const initialLocale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <LanguageProvider initialLocale={initialLocale}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </LanguageProvider>
  );
}
