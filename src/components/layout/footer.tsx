"use client";

import Image from "next/image";
import { NAV_HREFS, VIBES_DISTRICT } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/language-provider";
import { socialHref } from "@/lib/site";
import { useSite } from "@/lib/site-provider";

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

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d="M14.5 3c.4 2.6 2.1 4.4 4.6 4.7v3.1c-1.6 0-3-.5-4.3-1.3v6.8c0 3.4-2.7 6.2-6.2 6.2S2.4 19.7 2.4 16.2 5.1 10 8.6 10c.4 0 .8 0 1.2.1v3.2c-.4-.2-.8-.3-1.2-.3-1.7 0-3.1 1.4-3.1 3.2s1.4 3.2 3.1 3.2 3.1-1.4 3.1-3.2V3h2.8Z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useI18n();
  const { settings } = useSite();
  const instagram = socialHref("instagram", settings.instagram);
  const facebook = socialHref("facebook", settings.facebook);
  const tiktok = socialHref("tiktok", settings.tiktok);
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
            {t.hero.eyebrow}
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted md:max-w-xs">
            {t.footer.blurb}
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 md:justify-start">
            {instagram ? (
              <a href={instagram} aria-label="Instagram" className="text-ink/70 hover:text-ink">
                <InstagramIcon />
              </a>
            ) : null}
            {facebook ? (
              <a href={facebook} aria-label="Facebook" className="text-ink/70 hover:text-ink">
                <FacebookIcon />
              </a>
            ) : null}
            {tiktok ? (
              <a href={tiktok} aria-label="TikTok" className="text-ink/70 hover:text-ink">
                <TikTokIcon />
              </a>
            ) : null}
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
          <a href="#reservar" className="solid-btn mt-5 inline-flex">
            {t.footer.book}
          </a>
          <p className="mt-4 text-sm text-muted">{settings.address}</p>
          <p className="text-sm text-muted">{settings.phone_display}</p>
          <p className="text-sm text-muted">{settings.hours || t.info.hours}</p>
        </div>
      </div>
      <div className="border-t border-sand-deep px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-[0.7rem] tracking-wide text-muted sm:text-left">
            © {new Date().getFullYear()} MOR Studio. {t.footer.rights}
            <span className="mx-2">·</span>
            <a
              href="/admin/login"
              className="underline decoration-taupe/60 underline-offset-4 hover:text-ink"
            >
              {t.footer.admin}
            </a>
          </p>
          <a
            href={VIBES_DISTRICT.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2.5 text-[0.65rem] uppercase tracking-[0.16em] text-muted transition hover:text-ink"
          >
            <Image
              src={VIBES_DISTRICT.logo}
              alt=""
              width={36}
              height={36}
              className="size-9 object-contain opacity-80 transition group-hover:opacity-100"
            />
            <span>
              {t.footer.developedBy} {VIBES_DISTRICT.name}
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
