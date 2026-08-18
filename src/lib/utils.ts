import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/lib/i18n/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number, locale: Locale = "es") {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "es-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMoney(value: number, locale: Locale = "es") {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(value: string | Date, locale: Locale = "es") {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function unsplash(id: string, width = 1600) {
  const photo = id.startsWith("photo-") ? id : `photo-${id}`;
  return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${width}&q=80`;
}
