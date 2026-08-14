import { SITE } from "@/lib/constants";
import type { BeforeAfterPair, HeroSlide, InstagramStripItem, SiteSettings, TeamMember } from "@/lib/types";
import { BEFORE_AFTER, HERO_SLIDES, INSTAGRAM_STRIP } from "@/lib/data/seed";

export const DEFAULT_SETTINGS: SiteSettings = {
  instagram: SITE.instagram,
  facebook: SITE.facebook,
  tiktok: SITE.tiktok,
  whatsapp: SITE.whatsapp,
  phone_display: SITE.phoneDisplay,
  email: SITE.email,
  address: SITE.address,
  hours: "Mar — Sáb · 10:00 a.m. – 7:00 p.m.",
  announcement_es: "",
  announcement_en: "",
  announcement_enabled: false,
};

export const DEFAULT_HERO_SLIDES: HeroSlide[] = HERO_SLIDES.map((slide, index) => ({
  id: `seed-${index}`,
  image_url: slide.src,
  alt: slide.alt,
  caption: slide.caption,
  focal_x: 50,
  focal_y: 50,
  zoom: 100,
  sort_order: index + 1,
  is_published: true,
}));

export const DEFAULT_BEFORE_AFTER: BeforeAfterPair[] = [
  {
    id: "seed-before-after",
    before_image_url: BEFORE_AFTER.before,
    after_image_url: BEFORE_AFTER.after,
    title: "",
    before_label: "",
    after_label: "",
    sort_order: 1,
    is_published: true,
  },
];

export const DEFAULT_INSTAGRAM_STRIP: InstagramStripItem[] = INSTAGRAM_STRIP.map((src, index) => ({
  id: `seed-ig-${index}`,
  image_url: src,
  alt: "",
  sort_order: index + 1,
  is_published: true,
}));

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: "seed-elisabeth",
    name: "Elisabeth Morao",
    role: "Fundadora · Maquillista y fotógrafa profesional",
    role_en: "Founder · Makeup artist & professional photographer",
    bio: "Elisabeth Morao es la artista, dueña y fotógrafa profesional de MOR Studio. Une maquillaje y fotografía en una sola mirada: prepara la piel para la cámara y dirige la luz para la piel, sin prisas ni looks que no sobreviven al flash.",
    bio_en:
      "Elisabeth Morao is the artist, owner, and professional photographer of MOR Studio. She brings makeup and photography into a single point of view: skin prepared for the camera, light directed for the skin — no rush, no looks that disappear under flash.",
    bio_2:
      "Desde San Antonio y el Hill Country, Texas, acompaña a novias, quinceañeras, familias y marcas que buscan un lujo cálido: menos filtro, más presencia. Cada sesión se siente íntima, editorial y hecha a tu medida.",
    bio_2_en:
      "From San Antonio and the Texas Hill Country, she works with brides, quinceañeras, families, and brands who want warm luxury: less filter, more presence. Every session feels intimate, editorial, and made for you.",
    image_url: SITE.artistPhotos[0],
    image_url_2: SITE.artistPhotos[1],
    is_founder: true,
    is_published: true,
    sort_order: 1,
  },
];

export function heroImageStyle(slide: Pick<HeroSlide, "focal_x" | "focal_y" | "zoom">) {
  const x = clamp(slide.focal_x ?? 50, 0, 100);
  const y = clamp(slide.focal_y ?? 50, 0, 100);
  const zoom = clamp(slide.zoom ?? 100, 100, 200);
  return {
    objectFit: "cover" as const,
    objectPosition: `${x}% ${y}%`,
    transform: `scale(${zoom / 100})`,
    transformOrigin: `${x}% ${y}%`,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

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
