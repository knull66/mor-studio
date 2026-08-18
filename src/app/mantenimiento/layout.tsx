import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/lib/i18n/config";
import { LanguageProvider } from "@/lib/i18n/language-provider";

export default async function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const initialLocale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return <LanguageProvider initialLocale={initialLocale}>{children}</LanguageProvider>;
}
