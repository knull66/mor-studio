function resolveSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv && !fromEnv.includes("localhost")) return fromEnv;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return fromEnv ?? "https://www.morstudio.vip";
}

export const SITE = {
  name: "MOR Studio",
  tagline: "Photography and Makeup",
  artist: "Elisabeth Morao",
  url: resolveSiteUrl(),
  email: "booking@morstudio.vip",
  phoneDisplay: "+1 (210) 548-5300",
  phoneTel: "+12105485300",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "12105485300",
  address: "San Antonio, Texas",
  city: "San Antonio",
  region: "TX",
  country: "US",
  instagram: "https://www.instagram.com/Moor_Beauty_photography/",
  facebook: "https://facebook.com/morstudio",
  tiktok: "https://tiktok.com/@morstudio",
  artistPhotos: [
    "/images/elisabeth-morao-1.png",
    "/images/elisabeth-morao-2.png",
  ],
} as const;

export const NAV_HREFS = {
  home: "#inicio",
  about: "#nosotras",
  packages: "#paquetes",
  portfolio: "#portafolio",
  faq: "#faq",
  book: "#reservar",
} as const;

export const PACKAGE_TAB_IDS = ["makeup", "hair", "photography", "bridal_combo"] as const;

export const PORTFOLIO_FILTER_IDS = [
  "all",
  "brides",
  "makeup",
  "photography",
  "hair",
] as const;

export const BOOKING_SERVICE_IDS = [
  "bridal_combo",
  "bridal_makeup",
  "bridal_trial",
  "social_makeup",
  "bridal_hair",
  "social_hair",
  "photo_session",
  "wedding_coverage",
  "other",
] as const;

export const VIBES_DISTRICT = {
  name: "Vibes District",
  url: "https://www.vibesdistrict.pro",
  logo: "/images/vibes-district.png",
} as const;
