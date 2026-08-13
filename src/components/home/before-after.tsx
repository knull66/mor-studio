"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/lib/i18n/language-provider";
import type { BeforeAfterPair } from "@/lib/types";

export function BeforeAfter({ pairs }: { pairs: BeforeAfterPair[] }) {
  const { t } = useI18n();

  return (
    <section id="antes-despues" className="bg-cream px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow={t.beforeAfter.eyebrow}
          title={t.beforeAfter.title}
          description={t.beforeAfter.description}
        />
      </Reveal>
      <div className="mx-auto mt-14 flex max-w-4xl flex-col gap-16">
        {pairs.map((pair, index) => (
          <Reveal key={pair.id} delay={index * 0.08}>
            {pair.title ? (
              <h3 className="mb-5 text-center font-serif text-2xl sm:text-3xl">{pair.title}</h3>
            ) : null}
            <BeforeAfterSlider
              pair={pair}
              beforeLabel={pair.before_label || t.beforeAfter.natural}
              afterLabel={pair.after_label || t.beforeAfter.glam}
              sliderLabel={t.beforeAfter.slider}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BeforeAfterSlider({
  pair,
  beforeLabel,
  afterLabel,
  sliderLabel,
}: {
  pair: BeforeAfterPair;
  beforeLabel: string;
  afterLabel: string;
  sliderLabel: string;
}) {
  const [value, setValue] = useState(52);
  const [width, setWidth] = useState(0);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    const measure = () => setWidth(node.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function updateFromClientX(clientX: number) {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(96, Math.max(4, next)));
  }

  return (
    <div>
      <div
        ref={frame}
        className="relative aspect-[4/5] cursor-ew-resize overflow-hidden select-none sm:aspect-[5/4]"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          updateFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (event.buttons !== 1) return;
          updateFromClientX(event.clientX);
        }}
      >
        <Image
          src={pair.after_image_url}
          alt={afterLabel}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
        />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${value}%` }}>
          <div className="absolute inset-y-0 left-0" style={{ width: width || "100%" }}>
            <Image
              src={pair.before_image_url}
              alt={beforeLabel}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-y-0 z-10 w-px bg-cream" style={{ left: `${value}%` }}>
          <div className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream bg-charcoal text-cream">
            <span className="text-lg leading-none">↔</span>
          </div>
        </div>
        <span className="absolute bottom-4 left-4 bg-cream/90 px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em]">
          {beforeLabel}
        </span>
        <span className="absolute right-4 bottom-4 bg-charcoal/85 px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-cream">
          {afterLabel}
        </span>
      </div>
      <input
        type="range"
        min={4}
        max={96}
        value={value}
        aria-label={sliderLabel}
        className="mt-6 w-full accent-taupe"
        onChange={(event) => setValue(Number(event.target.value))}
      />
    </div>
  );
}
