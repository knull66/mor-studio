"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/data/seed";
import { useI18n } from "@/lib/i18n/language-provider";
import { cn } from "@/lib/utils";

export function Hero() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 6500, stopOnInteraction: false }),
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="inicio" className="relative h-[88vh] min-h-[560px] overflow-hidden bg-ink">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {HERO_SLIDES.map((slide) => (
            <div key={slide.src} className="relative min-w-0 flex-[0_0_100%]">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/35 to-transparent" />

      <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-6 text-cream">
        <p className="text-[0.7rem] uppercase tracking-[0.32em] text-cream/80">
          {t.hero.eyebrow}
        </p>
        <h1 className="mt-4 max-w-xl font-serif text-4xl font-medium leading-[1.1] sm:text-6xl md:text-7xl">
          {t.hero.headline}
        </h1>
        <div className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#paquetes" className="solid-btn bg-cream !text-ink hover:!bg-sand">
            {t.hero.primaryCta}
          </a>
          <a
            href="#portafolio"
            className="outlined-btn border-cream text-cream hover:!bg-cream hover:!text-ink"
          >
            {t.hero.secondaryCta}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`${t.hero.goToSlide} ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === index ? "w-10 bg-cream" : "w-3 bg-cream/40",
            )}
            onClick={() => emblaApi?.scrollTo(i)}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label={t.hero.prev}
        className="absolute top-1/2 left-4 hidden -translate-y-1/2 rounded-full border border-cream/40 p-2 text-cream/80 hover:bg-cream/10 md:block"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label={t.hero.next}
        className="absolute top-1/2 right-4 hidden -translate-y-1/2 rounded-full border border-cream/40 p-2 text-cream/80 hover:bg-cream/10 md:block"
        onClick={() => emblaApi?.scrollNext()}
      >
        <ChevronRight className="size-5" />
      </button>
    </section>
  );
}
