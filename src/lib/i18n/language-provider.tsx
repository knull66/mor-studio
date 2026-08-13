"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, setLocaleCookie, type Locale } from "@/lib/i18n/config";

type LanguageContextValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const t = useMemo(() => getDictionary(locale), [locale]);

  const value = useMemo(
    () => ({
      locale,
      t,
      setLocale: (next: Locale) => {
        setLocaleState(next);
        setLocaleCookie(next);
      },
    }),
    [locale, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return context;
}
