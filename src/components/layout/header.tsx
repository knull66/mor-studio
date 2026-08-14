"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { NAV_HREFS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/language-provider";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const leftLinks = [
    { href: NAV_HREFS.home, label: t.nav.home },
    { href: NAV_HREFS.about, label: t.nav.about },
    { href: NAV_HREFS.packages, label: t.nav.packages },
  ];
  const rightLinks = [
    { href: NAV_HREFS.portfolio, label: t.nav.portfolio },
    { href: NAV_HREFS.faq, label: t.nav.faq },
  ];
  const allLinks = [...leftLinks, ...rightLinks, { href: NAV_HREFS.book, label: t.nav.book }];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div
        className={cn(
          "border-b border-sand-deep/80 bg-cream/90 backdrop-blur-md transition-all",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
          <nav className="hidden items-center justify-start gap-7 lg:flex">
            {leftLinks.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#inicio" className="justify-self-center text-center">
            <span className="font-serif text-2xl tracking-[0.12em] text-ink sm:text-3xl">
              MOR Studio
            </span>
            <span className="mt-0.5 block text-[0.58rem] font-medium uppercase tracking-[0.38em] text-taupe-dark">
              {t.hero.eyebrow}
            </span>
          </a>

          <div className="hidden items-center justify-end gap-6 lg:flex">
            {rightLinks.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
            <LanguageSwitcher />
            <a href="#reservar" className="solid-btn !px-4 !py-2.5">
              {t.nav.book}
            </a>
          </div>

          <div className="col-start-3 flex items-center justify-end gap-3 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="p-2"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-sand-deep bg-cream px-6 py-8 lg:hidden">
          <nav className="flex flex-col items-center gap-5">
            {allLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-serif text-2xl text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
