"use client";

import Image from "next/image";
import { VIBES_DISTRICT } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/language-provider";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export function MaintenanceScreen() {
  const { t } = useI18n();

  return (
    <div className="relative flex min-h-full flex-1 flex-col items-center justify-center bg-cream px-6 py-16 text-center">
      <div className="absolute top-6 right-6">
        <LanguageSwitcher />
      </div>

      <a
        href={VIBES_DISTRICT.url}
        target="_blank"
        rel="noreferrer"
        className="transition opacity-90 hover:opacity-100"
      >
        <Image
          src={VIBES_DISTRICT.logo}
          alt={VIBES_DISTRICT.name}
          width={160}
          height={160}
          priority
          className="mx-auto size-28 object-contain sm:size-40"
        />
      </a>

      <p className="mt-8 text-[0.68rem] uppercase tracking-[0.28em] text-taupe-dark">
        {t.maintenance.eyebrow}
      </p>
      <h1 className="mt-4 font-serif text-5xl sm:text-6xl">{t.maintenance.title}</h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted sm:text-base">
        {t.maintenance.body}
      </p>

      <a
        href={VIBES_DISTRICT.url}
        target="_blank"
        rel="noreferrer"
        className="solid-btn mt-10"
      >
        {t.maintenance.cta}
      </a>

      <p className="mt-10 text-[0.65rem] uppercase tracking-[0.16em] text-muted">
        {t.footer.developedBy} {VIBES_DISTRICT.name}
      </p>
    </div>
  );
}
