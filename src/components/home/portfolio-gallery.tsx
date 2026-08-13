"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Expand, X } from "lucide-react";
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

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [active]);

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
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
        {visible.map((item) => (
          <button
            key={item.id}
            type="button"
            className="group relative aspect-square overflow-hidden bg-sand"
            onClick={() => setActive(item)}
            aria-label={`${item.title}. ${t.portfolio.expand}`}
          >
            <Image
              src={item.image_url}
              alt={item.alt || item.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition group-hover:bg-ink/30">
              <Expand className="size-5 text-cream opacity-80 drop-shadow sm:opacity-0 sm:group-hover:opacity-100" />
            </span>
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
            className="relative flex max-h-[88vh] w-full max-w-4xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-[72vh] w-full">
              <Image
                src={active.image_url}
                alt={active.alt || active.title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            {active.title ? (
              <p className="mt-4 text-center text-sm tracking-wide text-cream/80">{active.title}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
