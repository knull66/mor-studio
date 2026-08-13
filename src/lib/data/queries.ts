import { createClient } from "@/lib/supabase/server";
import { SEED_PACKAGES, SEED_PORTFOLIO, SEED_TESTIMONIALS } from "@/lib/data/seed";
import type {
  Inquiry,
  PortfolioItem,
  ServicePackage,
  Testimonial,
} from "@/lib/types";

function mapPackage(row: Record<string, unknown>): ServicePackage {
  return {
    id: String(row.id),
    title: String(row.title),
    category: row.category as ServicePackage["category"],
    price: Number(row.price),
    description: String(row.description ?? ""),
    features: Array.isArray(row.features) ? (row.features as string[]) : [],
    duration: String(row.duration ?? ""),
    is_featured: Boolean(row.is_featured),
    is_active: row.is_active !== false,
    sort_order: Number(row.sort_order ?? 0),
    created_at: row.created_at ? String(row.created_at) : undefined,
  };
}

function mapPortfolio(row: Record<string, unknown>): PortfolioItem {
  return {
    id: String(row.id),
    title: String(row.title ?? ""),
    category: row.category as PortfolioItem["category"],
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

  if (error || !data?.length) return SEED_PACKAGES.filter((item) => item.is_active);
  return data.map(mapPackage);
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

  if (error || !data?.length) return SEED_PORTFOLIO;
  return data.map(mapPortfolio);
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

  if (error || !data?.length) return SEED_TESTIMONIALS;
  return data.map((row) => ({
    id: String(row.id),
    client_name: String(row.client_name),
    role: String(row.role ?? ""),
    quote: String(row.quote),
    rating: Number(row.rating ?? 5),
  }));
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
    packages: packages.length,
    portfolio: portfolio.length,
    pending: inquiries.filter((item) => item.status === "pending").length,
    attended: inquiries.filter((item) => item.status === "attended").length,
  };
}
