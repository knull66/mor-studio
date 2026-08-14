"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n/language-provider";
import { useSite } from "@/lib/site-provider";

export function AnnouncementBar() {
  const { t, locale } = useI18n();
  const { settings } = useSite();
  const [visible, setVisible] = useState(true);

  const text =
    locale === "en"
      ? settings.announcement_en || settings.announcement_es
      : settings.announcement_es || settings.announcement_en;
  const storageKey = `mor-announcement:${text}`;

  useEffect(() => {
    if (sessionStorage.getItem(storageKey) === "hidden") {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [storageKey]);

  if (!settings.announcement_enabled || !text.trim() || !visible) return null;

  return (
    <div className="relative bg-sand px-10 py-2.5 text-center">
      <a
        href="#paquetes"
        className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-ink/80 transition-colors hover:text-ink"
      >
        {text} →
      </a>
      <button
        type="button"
        aria-label={t.closeAnnouncement}
        className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-ink/50 hover:text-ink"
        onClick={() => {
          sessionStorage.setItem(storageKey, "hidden");
          setVisible(false);
        }}
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
