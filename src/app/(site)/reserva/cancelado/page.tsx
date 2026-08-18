import Link from "next/link";
import { cookies } from "next/headers";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/lib/i18n/config";

export default async function CheckoutCancelPage() {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDictionary(locale);

  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-taupe-dark">
        {t.checkout.eyebrow}
      </p>
      <h1 className="mt-4 font-serif text-4xl sm:text-5xl">{t.checkout.cancelTitle}</h1>
      <p className="mt-6 text-sm leading-relaxed text-muted">{t.checkout.cancelBody}</p>
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link href="/#reservar" className="solid-btn">
          {t.checkout.tryAgain}
        </Link>
        <Link href="/#paquetes" className="outlined-btn border-ink text-ink">
          {t.checkout.packages}
        </Link>
      </div>
    </section>
  );
}
