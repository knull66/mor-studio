"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n/language-provider";

export function AnnouncementBar() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("mor-announcement") === "hidden") {
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="relative bg-sand px-10 py-2.5 text-center">
      <a
        href="#paquetes"
        className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-ink/80 transition-colors hover:text-ink"
      >
        {t.announcement} →
      </a>
      <button
        type="button"
        aria-label={t.closeAnnouncement}
        className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-ink/50 hover:text-ink"
        onClick={() => {
          sessionStorage.setItem("mor-announcement", "hidden");
          setVisible(false);
        }}
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
