"use client";

import Image from "next/image";
import { INSTAGRAM_STRIP } from "@/lib/data/seed";
import { SITE } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/language-provider";

export function InstagramStrip() {
  const { t } = useI18n();

  return (
    <section className="bg-cream">
      <a
        href={SITE.instagram}
        target="_blank"
        rel="noreferrer"
        className="flex justify-center py-8 text-[0.68rem] uppercase tracking-[0.28em] text-taupe-dark hover:text-ink"
      >
        {t.instagram}
      </a>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
        {INSTAGRAM_STRIP.map((src, index) => (
          <a
            key={src}
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
            className="relative aspect-square overflow-hidden"
          >
            <Image
              src={src}
              alt={`${t.instagram} ${index + 1}`}
              fill
              sizes="12.5vw"
              className="object-cover transition duration-500 hover:scale-105"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
