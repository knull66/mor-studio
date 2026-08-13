"use client";

import { createContext, useContext } from "react";
import { DEFAULT_HERO_SLIDES, DEFAULT_SETTINGS } from "@/lib/site";
import type { HeroSlide, SiteSettings } from "@/lib/types";

type SiteContextValue = {
  settings: SiteSettings;
  slides: HeroSlide[];
};

const SiteContext = createContext<SiteContextValue>({
  settings: DEFAULT_SETTINGS,
  slides: DEFAULT_HERO_SLIDES,
});

export function SiteProvider({
  children,
  settings,
  slides,
}: {
  children: React.ReactNode;
  settings: SiteSettings;
  slides: HeroSlide[];
}) {
  return (
    <SiteContext.Provider value={{ settings, slides }}>{children}</SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}
