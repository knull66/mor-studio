import { createClient } from "@/lib/supabase/server";
import { SEED_PACKAGES, SEED_PORTFOLIO, SEED_TESTIMONIALS } from "@/lib/data/seed";
import { DEFAULT_BEFORE_AFTER, DEFAULT_HERO_SLIDES, DEFAULT_INSTAGRAM_STRIP, DEFAULT_SETTINGS } from "@/lib/site";
import type {
  BeforeAfterPair,
  HeroSlide,
  Inquiry,
  InstagramStripItem,
  PortfolioItem,
  ServicePackage,
  SiteSettings,
  Testimonial,
} from "@/lib/types";

function isMissingRelation(error: { message?: string; code?: string } | null) {
  if (!error) return false;
  return error.code === "PGRST205" || Boolean(error.message?.includes("schema cache"));
}

function mapPackage(row: Record<string, unknown>): ServicePackage {
  return {
    id: String(row.id),
    title: String(row.title),
    category: row.category as ServicePackage["category"],
    price: Number(row.price),
    description: String(row.description ?? ""),
    features: Array.isArray(row.features) ? (row.features as string[]) : [],
    duration: String(row.duration ?? ""),
    title_en: row.title_en ? String(row.title_en) : "",
    description_en: row.description_en ? String(row.description_en) : "",
    features_en: Array.isArray(row.features_en) ? (row.features_en as string[]) : [],
    duration_en: row.duration_en ? String(row.duration_en) : "",
    is_featured: Boolean(row.is_featured),
    is_active: row.is_active !== false,
    sort_order: Number(row.sort_order ?? 0),
    created_at: row.created_at ? String(row.created_at) : undefined,
  };
}

function mapPortfolioCategory(value: unknown): PortfolioItem["category"] {
  const category = String(value ?? "");
  if (category === "studio" || category === "exteriors") return "photography";
  if (category === "brides" || category === "makeup" || category === "photography" || category === "hair") {
    return category;
  }
  return "photography";
}

function mapPortfolio(row: Record<string, unknown>): PortfolioItem {
  return {
    id: String(row.id),
    title: String(row.title ?? ""),
    category: mapPortfolioCategory(row.category),
    image_url: String(row.image_url),
    alt: row.alt ? String(row.alt) : null,
    sort_order: Number(row.sort_order ?? 0),
    is_published: row.is_published !== false,
    created_at: row.created_at ? String(row.created_at) : undefined,
  };
}

export async function getPackages(): Promise<ServicePackage[]> {
  const supabase = await createClient();
  if (!supabase) return SEED_PACKAGES.filter((item) => item.is_active);

  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) return isMissingRelation(error) ? SEED_PACKAGES.filter((item) => item.is_active) : [];
  return (data ?? []).map(mapPackage);
}

export async function getAllPackages(): Promise<ServicePackage[]> {
  const supabase = await createClient();
  if (!supabase) return SEED_PACKAGES;

  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data ?? []).map(mapPackage);
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  const supabase = await createClient();
  if (!supabase) return SEED_PORTFOLIO;

  const { data, error } = await supabase
    .from("portfolio")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) return isMissingRelation(error) ? SEED_PORTFOLIO : [];
  return (data ?? []).map(mapPortfolio);
}

export async function getAllPortfolio(): Promise<PortfolioItem[]> {
  const supabase = await createClient();
  if (!supabase) return SEED_PORTFOLIO;

  const { data, error } = await supabase
    .from("portfolio")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return [];
  return data.map(mapPortfolio);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  if (!supabase) return SEED_TESTIMONIALS;

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) return isMissingRelation(error) ? SEED_TESTIMONIALS : [];
  return (data ?? []).map(mapTestimonial);
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  if (!supabase) return SEED_TESTIMONIALS;

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []).map(mapTestimonial);
}

function mapTestimonial(row: Record<string, unknown>): Testimonial {
  return {
    id: String(row.id),
    client_name: String(row.client_name),
    role: String(row.role ?? ""),
    quote: String(row.quote),
    role_en: row.role_en ? String(row.role_en) : "",
    quote_en: row.quote_en ? String(row.quote_en) : "",
    rating: Number(row.rating ?? 5),
    is_published: row.is_published !== false,
  };
}

export async function getInquiries(): Promise<Inquiry[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map((row) => ({
    id: String(row.id),
    client_name: String(row.client_name),
    email: row.email ? String(row.email) : null,
    phone: String(row.phone),
    event_date: row.event_date ? String(row.event_date) : null,
    service_type: row.service_type ? String(row.service_type) : null,
    message: row.message ? String(row.message) : null,
    status: (row.status as Inquiry["status"]) ?? "pending",
    created_at: String(row.created_at),
  }));
}

export async function getAdminStats() {
  const [packages, portfolio, inquiries] = await Promise.all([
    getAllPackages(),
    getAllPortfolio(),
    getInquiries(),
  ]);

  return {
    packages: packages.filter((item) => item.is_active).length,
    portfolio: portfolio.length,
    pending: inquiries.filter((item) => item.status === "pending").length,
    attended: inquiries.filter((item) => item.status === "attended").length,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  if (!supabase) return DEFAULT_SETTINGS;

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", "main")
    .maybeSingle();

  if (error || !data) return DEFAULT_SETTINGS;

  return {
    instagram: String(data.instagram ?? DEFAULT_SETTINGS.instagram),
    facebook: String(data.facebook ?? ""),
    tiktok: String(data.tiktok ?? ""),
    whatsapp: String(data.whatsapp ?? DEFAULT_SETTINGS.whatsapp),
    phone_display: String(data.phone_display ?? DEFAULT_SETTINGS.phone_display),
    email: String(data.email ?? DEFAULT_SETTINGS.email),
    address: String(data.address ?? DEFAULT_SETTINGS.address),
    hours: String(data.hours ?? DEFAULT_SETTINGS.hours),
    announcement_es: String(data.announcement_es ?? ""),
    announcement_en: String(data.announcement_en ?? ""),
    announcement_enabled: data.announcement_enabled === true,
  };
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const supabase = await createClient();
  if (!supabase) return DEFAULT_HERO_SLIDES;

  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) return isMissingRelation(error) ? DEFAULT_HERO_SLIDES : [];
  return (data ?? []).map(mapHero);
}

export async function getAllHeroSlides(): Promise<HeroSlide[]> {
  const supabase = await createClient();
  if (!supabase) return DEFAULT_HERO_SLIDES;

  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data ?? []).map(mapHero);
}

function mapHero(row: Record<string, unknown>): HeroSlide {
  return {
    id: String(row.id),
    image_url: String(row.image_url),
    alt: String(row.alt ?? ""),
    caption: String(row.caption ?? ""),
    sort_order: Number(row.sort_order ?? 0),
    is_published: row.is_published !== false,
  };
}

function mapBeforeAfter(row: Record<string, unknown>): BeforeAfterPair {
  return {
    id: String(row.id),
    before_image_url: String(row.before_image_url),
    after_image_url: String(row.after_image_url),
    title: String(row.title ?? ""),
    before_label: String(row.before_label ?? ""),
    after_label: String(row.after_label ?? ""),
    sort_order: Number(row.sort_order ?? 0),
    is_published: row.is_published !== false,
  };
}

export async function getBeforeAfterPairs(): Promise<BeforeAfterPair[]> {
  const supabase = await createClient();
  if (!supabase) return DEFAULT_BEFORE_AFTER;

  const { data, error } = await supabase
    .from("before_after_pairs")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) return isMissingRelation(error) ? DEFAULT_BEFORE_AFTER : [];
  return (data ?? []).map(mapBeforeAfter);
}

export async function getAllBeforeAfterPairs(): Promise<BeforeAfterPair[]> {
  const supabase = await createClient();
  if (!supabase) return DEFAULT_BEFORE_AFTER;

  const { data, error } = await supabase
    .from("before_after_pairs")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data ?? []).map(mapBeforeAfter);
}

function mapInstagramStrip(row: Record<string, unknown>): InstagramStripItem {
  return {
    id: String(row.id),
    image_url: String(row.image_url),
    alt: String(row.alt ?? ""),
    sort_order: Number(row.sort_order ?? 0),
    is_published: row.is_published !== false,
  };
}

export async function getInstagramStrip(): Promise<InstagramStripItem[]> {
  const supabase = await createClient();
  if (!supabase) return DEFAULT_INSTAGRAM_STRIP;

  const { data, error } = await supabase
    .from("instagram_strip")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) return isMissingRelation(error) ? DEFAULT_INSTAGRAM_STRIP : [];
  return (data ?? []).map(mapInstagramStrip);
}

export async function getAllInstagramStrip(): Promise<InstagramStripItem[]> {
  const supabase = await createClient();
  if (!supabase) return DEFAULT_INSTAGRAM_STRIP;

  const { data, error } = await supabase
    .from("instagram_strip")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data ?? []).map(mapInstagramStrip);
}
