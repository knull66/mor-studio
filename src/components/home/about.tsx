"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/language-provider";

export function About() {
  const { t } = useI18n();

  return (
    <section id="nosotras" className="bg-sand px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-cream">
              <Image
                src={SITE.artistPhotos[0]}
                alt={t.about.photoAlt1}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top"
              />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden bg-cream">
              <Image
                src={SITE.artistPhotos[1]}
                alt={t.about.photoAlt2}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-taupe-dark">
            {t.about.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium sm:text-5xl">
            {t.about.title}
          </h2>
          <p className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-muted">
            {t.about.role}
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            {t.about.p1}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {t.about.p2}
          </p>
          <a href="#reservar" className="outlined-btn mt-8 border-ink text-ink">
            {t.about.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
