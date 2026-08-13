"use client";

import { NAV_HREFS, SITE } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/language-provider";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm11.2 1.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM12 7.2A4.8 4.8 0 1 1 12 16.8 4.8 4.8 0 0 1 12 7.2zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4V10c0-.6.4-1 1-1z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useI18n();
  const links = [
    [t.footer.links.home, NAV_HREFS.home],
    [t.footer.links.about, NAV_HREFS.about],
    [t.footer.links.packages, NAV_HREFS.packages],
    [t.footer.links.portfolio, NAV_HREFS.portfolio],
    [t.footer.links.faq, NAV_HREFS.faq],
    [t.footer.links.book, NAV_HREFS.book],
  ];

  return (
    <footer className="border-t border-sand-deep bg-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 md:gap-8">
        <div className="text-center md:text-left">
          <p className="font-serif text-3xl tracking-[0.12em]">MOR Studio</p>
          <p className="mt-1 text-[0.58rem] uppercase tracking-[0.32em] text-taupe-dark">
            {SITE.tagline}
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted md:max-w-xs">
            {t.footer.blurb}
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 md:justify-start">
            <a href={SITE.instagram} aria-label="Instagram" className="text-ink/70 hover:text-ink">
              <InstagramIcon />
            </a>
            <a href={SITE.facebook} aria-label="Facebook" className="text-ink/70 hover:text-ink">
              <FacebookIcon />
            </a>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 self-center">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="nav-link">
              {label}
            </a>
          ))}
        </nav>

        <div className="text-center md:text-right">
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-taupe-dark">
            {t.footer.join}
          </p>
          <p className="mt-2 font-serif text-2xl">{t.footer.dates}</p>
          <form className="mt-5 flex flex-col gap-2 sm:flex-row md:justify-end" action="#reservar">
            <input
              type="email"
              required
              placeholder={t.footer.emailPlaceholder}
              className="border border-sand-deep bg-white px-4 py-3 text-sm outline-none placeholder:text-muted/70 focus:border-taupe"
            />
            <a href="#reservar" className="solid-btn whitespace-nowrap">
              {t.footer.book}
            </a>
          </form>
          <p className="mt-4 text-sm text-muted">{SITE.address}</p>
          <p className="text-sm text-muted">{SITE.phoneDisplay}</p>
          <p className="text-sm text-muted">{t.info.hours}</p>
        </div>
      </div>
      <div className="border-t border-sand-deep px-6 py-5 text-center text-[0.7rem] tracking-wide text-muted">
        © {new Date().getFullYear()} MOR Studio. {t.footer.rights}{" "}
        <a href="/admin/login" className="ml-2 underline decoration-transparent hover:decoration-taupe">
          {t.footer.admin}
        </a>
      </div>
    </footer>
  );
}
