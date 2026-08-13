import { SITE } from "@/lib/constants";
import type { HeroSlide, SiteSettings } from "@/lib/types";
import { HERO_SLIDES } from "@/lib/data/seed";

export const DEFAULT_SETTINGS: SiteSettings = {
  instagram: SITE.instagram,
  facebook: SITE.facebook,
  tiktok: SITE.tiktok,
  whatsapp: SITE.whatsapp,
  phone_display: SITE.phoneDisplay,
  email: SITE.email,
  address: SITE.address,
};

export const DEFAULT_HERO_SLIDES: HeroSlide[] = HERO_SLIDES.map((slide, index) => ({
  id: `seed-${index}`,
  image_url: slide.src,
  alt: slide.alt,
  caption: slide.caption,
  sort_order: index + 1,
  is_published: true,
}));

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function toTelHref(value: string) {
  const digits = digitsOnly(value);
  return digits ? `tel:+${digits}` : "tel:";
}

export function instagramHandle(url: string) {
  const match = url.match(/instagram\.com\/([^/?#]+)/i);
  if (match?.[1]) return `@${match[1]}`;
  if (url.startsWith("@")) return url;
  if (url.trim()) return `@${url.replace(/^@/, "")}`;
  return "";
}

export function socialHref(
  network: "instagram" | "facebook" | "tiktok",
  value: string,
) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const handle = trimmed.replace(/^@/, "");
  if (network === "instagram") return `https://www.instagram.com/${handle}/`;
  if (network === "facebook") return `https://www.facebook.com/${handle}`;
  return `https://www.tiktok.com/@${handle}`;
}
