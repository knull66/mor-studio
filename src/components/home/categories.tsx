"use client";

import Image from "next/image";
import { CATEGORIES } from "@/lib/data/seed";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/lib/i18n/language-provider";

export function Categories() {
  const { t } = useI18n();

  return (
    <section className="bg-cream px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow={t.categories.eyebrow}
          title={t.categories.title}
          description={t.categories.description}
        />
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((category, index) => {
          const copy = t.categories.items[category.id];
          return (
            <Reveal key={category.id} delay={index * 0.08}>
              <a href={category.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={copy.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/25 transition group-hover:bg-ink/35" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-cream">
                    <h3 className="text-sm font-medium uppercase tracking-[0.28em]">
                      {copy.title}
                    </h3>
                    <p className="mt-3 text-sm text-cream/80">{copy.subtitle}</p>
                  </div>
                </div>
                <span className="mt-0 flex w-full items-center justify-center border border-t-0 border-sand-deep bg-white py-3.5 text-[0.68rem] uppercase tracking-[0.22em] transition group-hover:bg-charcoal group-hover:text-cream">
                  {t.categories.exploreMore}
                </span>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
