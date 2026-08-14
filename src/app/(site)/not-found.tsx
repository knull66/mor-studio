"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/language-provider";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-taupe-dark">404</p>
      <h1 className="mt-4 font-serif text-5xl">{t.notFound.title}</h1>
      <Link href="/" className="outlined-btn mt-8 border-ink text-ink">
        {t.notFound.back}
      </Link>
    </div>
  );
}
