"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PORTFOLIO_FILTER_IDS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/language-provider";
import type { PortfolioCategory, PortfolioItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PortfolioGallery({ items }: { items: PortfolioItem[] }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<"all" | PortfolioCategory>("all");
  const [active, setActive] = useState<PortfolioItem | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );

  return (
    <section id="portafolio" className="bg-cream px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow={t.portfolio.eyebrow}
          title={t.portfolio.title}
          description={t.portfolio.description}
        />
      </Reveal>
      <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
        {PORTFOLIO_FILTER_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={cn(
              "px-4 py-2 text-[0.65rem] uppercase tracking-[0.16em]",
              filter === id ? "bg-charcoal text-cream" : "text-muted hover:text-ink",
            )}
          >
            {t.portfolio.filters[id]}
          </button>
        ))}
      </div>
      <div className="mx-auto mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {visible.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className="mb-4 block w-full break-inside-avoid overflow-hidden"
            onClick={() => setActive(item)}
          >
            <Reveal delay={(index % 3) * 0.04}>
              <span className="relative block aspect-[4/5] overflow-hidden">
                <Image
                  src={item.image_url}
                  alt={item.alt || item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </span>
            </Reveal>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <button
            type="button"
            className="absolute top-5 right-5 text-cream"
            aria-label={t.portfolio.close}
            onClick={() => setActive(null)}
          >
            <X className="size-7" />
          </button>
          <div
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={active.image_url}
              alt={active.alt || active.title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
