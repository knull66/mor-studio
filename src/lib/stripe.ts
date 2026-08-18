import Stripe from "stripe";
import { SITE } from "@/lib/constants";

export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export function siteUrl() {
  return SITE.url.replace(/\/$/, "");
}
