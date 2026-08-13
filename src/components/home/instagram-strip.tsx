"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n/language-provider";
import { instagramHandle, socialHref } from "@/lib/site";
import { useSite } from "@/lib/site-provider";
import type { InstagramStripItem } from "@/lib/types";

export function InstagramStrip({ items }: { items: InstagramStripItem[] }) {
  const { t } = useI18n();
  const { settings } = useSite();
  const href = socialHref("instagram", settings.instagram);
  const handle = instagramHandle(settings.instagram);

  if (!href || !items.length) return null;

  return (
    <section className="bg-cream">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="flex justify-center py-8 text-[0.68rem] uppercase tracking-[0.28em] text-taupe-dark hover:text-ink"
      >
        {handle ? `${handle} · ${t.instagram}` : t.instagram}
      </a>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
        {items.map((item, index) => (
          <a
            key={item.id}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="relative aspect-square overflow-hidden"
          >
            <Image
              src={item.image_url}
              alt={item.alt || `${handle || "Instagram"} ${index + 1}`}
              fill
              sizes="12.5vw"
              className="object-cover transition duration-500 hover:scale-105"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
