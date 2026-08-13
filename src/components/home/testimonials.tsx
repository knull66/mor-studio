"use client";

import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/lib/i18n/language-provider";
import type { Testimonial } from "@/lib/types";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const { t } = useI18n();

  return (
    <section className="bg-sand px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-7xl gap-6 md:grid-cols-3">
        {items.map((item, index) => {
          const copy = t.testimonials.items[item.id];
          return (
            <Reveal key={item.id} delay={index * 0.08}>
              <article className="h-full bg-cream p-8">
                <div className="flex gap-1 text-taupe">
                  {Array.from({ length: item.rating }).map((_, star) => (
                    <Star key={star} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 font-serif text-2xl leading-snug text-ink">
                  “{copy?.quote ?? item.quote}”
                </p>
                <p className="mt-6 text-sm font-medium">{item.client_name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                  {copy?.role ?? item.role}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
