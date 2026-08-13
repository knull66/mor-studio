export const SITE = {
  name: "MOR Studio",
  tagline: "Photography and Makeup",
  artist: "Elisabeth Morao",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://morstudio.com",
  email: "hello@morstudio.com",
  phoneDisplay: "+1 (210) 548-5300",
  phoneTel: "+12105485300",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "12105485300",
  address: "San Antonio, Texas",
  city: "San Antonio",
  region: "TX",
  country: "US",
  instagram: "https://instagram.com/morstudio",
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

export const PACKAGE_TAB_IDS = ["makeup", "photography", "bridal_combo"] as const;

export const PORTFOLIO_FILTER_IDS = [
  "all",
  "brides",
  "makeup",
  "studio",
  "exteriors",
] as const;
