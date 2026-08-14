"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PACKAGE_TAB_IDS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/language-provider";
import { useSite } from "@/lib/site-provider";
import { localizedPackage } from "@/lib/packages";
import type { PackageCategory, ServicePackage } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";

export function PackagesSection({ packages }: { packages: ServicePackage[] }) {
  const { t, locale } = useI18n();
  const { settings } = useSite();
  const [tab, setTab] = useState<PackageCategory>("bridal_combo");
  const visible = useMemo(
    () => packages.filter((item) => item.category === tab && item.is_active),
    [packages, tab],
  );

  return (
    <section id="paquetes" className="bg-sand px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow={t.packages.eyebrow}
          title={t.packages.title}
          description={t.packages.description}
        />
      </Reveal>

      <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
        {PACKAGE_TAB_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`px-5 py-2.5 text-[0.68rem] uppercase tracking-[0.18em] transition ${
              tab === id
                ? "bg-charcoal text-cream"
                : "border border-sand-deep bg-cream text-ink hover:border-taupe"
            }`}
          >
            {t.packages.tabs[id]}
          </button>
        ))}
      </div>

      {tab === "bridal_combo" ? (
        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-taupe-dark">
          {t.packages.comboNote}
        </p>
      ) : null}

      {visible.length === 0 ? (
        <p className="mx-auto mt-12 max-w-xl text-center text-sm text-muted">{t.packages.empty}</p>
      ) : (
      <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((item, index) => {
          const { title, duration, description, features } = localizedPackage(item, locale, t);
          const priceLabel = formatPrice(item.price, locale);

          return (
            <Reveal key={item.id} delay={index * 0.05}>
              <article className="flex h-full flex-col border border-sand-deep bg-cream p-8">
                {item.is_featured ? (
                  <p className="mb-3 text-[0.62rem] uppercase tracking-[0.22em] text-taupe-dark">
                    {t.packages.featured}
                  </p>
                ) : null}
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-2 text-sm text-muted">{duration}</p>
                <p className="mt-4 font-serif text-4xl">{priceLabel}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                  {t.packages.from}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{description}</p>
                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-ink">
                      <Check className="mt-0.5 size-4 shrink-0 text-taupe-dark" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl(t.whatsapp.package(title, priceLabel), settings.whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  className="solid-btn mt-8 w-full"
                >
                  {t.packages.cta}
                </a>
              </article>
            </Reveal>
          );
        })}
      </div>
      )}
    </section>
  );
}
