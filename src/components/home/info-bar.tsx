"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n/language-provider";
import { toTelHref } from "@/lib/site";
import { useSite } from "@/lib/site-provider";

export function InfoBar() {
  const { t } = useI18n();
  const { settings } = useSite();
  const items = [
    {
      icon: Phone,
      label: t.info.questions,
      value: settings.phone_display,
      href: toTelHref(settings.phone_display || settings.whatsapp),
    },
    {
      icon: MapPin,
      label: t.info.located,
      value: settings.address,
      href: "#nosotras",
    },
    {
      icon: Clock,
      label: t.info.hoursLabel,
      value: t.info.hours,
      href: "#reservar",
    },
  ];

  return (
    <section className="bg-taupe text-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3 md:gap-6">
        {items.map((item) => (
          <a key={item.label} href={item.href} className="flex flex-col items-center text-center">
            <item.icon className="size-6 opacity-90" />
            <p className="mt-3 text-[0.68rem] uppercase tracking-[0.22em] text-cream/80">
              {item.label}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed">{item.value}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
