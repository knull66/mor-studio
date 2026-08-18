import type { Metadata } from "next";
import { cookies } from "next/headers";
import { MaintenanceScreen } from "@/components/layout/maintenance-screen";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDictionary(locale);

  return {
    title: t.maintenance.title,
    description: t.maintenance.body,
    robots: { index: false, follow: false },
  };
}

export default function MaintenancePage() {
  return <MaintenanceScreen />;
}
