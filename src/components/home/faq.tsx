"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/lib/i18n/language-provider";
import { cn } from "@/lib/utils";

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          description={t.faq.description}
        />
      </Reveal>
      <div className="mx-auto mt-12 max-w-3xl divide-y divide-sand-deep border-y border-sand-deep">
        {t.faq.items.map((item, index) => {
          const isOpen = open === index;
          return (
            <div key={item.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className="font-serif text-xl sm:text-2xl">{item.q}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-taupe-dark transition",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen ? (
                <p className="pb-6 text-sm leading-relaxed text-muted sm:text-base">
                  {item.a}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
