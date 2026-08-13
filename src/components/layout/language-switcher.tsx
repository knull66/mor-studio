"use client";

import { useI18n } from "@/lib/i18n/language-provider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className={cn("flex items-center gap-1 text-[0.65rem] tracking-[0.18em]", className)}
    >
      {(["es", "en"] as Locale[]).map((code, index) => (
        <span key={code} className="flex items-center gap-1">
          {index > 0 ? <span className="text-taupe">|</span> : null}
          <button
            type="button"
            onClick={() => setLocale(code)}
            className={cn(
              "px-1 py-0.5 uppercase transition",
              locale === code ? "text-ink" : "text-muted hover:text-ink",
            )}
            aria-pressed={locale === code}
          >
            {t.language[code]}
          </button>
        </span>
      ))}
    </div>
  );
}
