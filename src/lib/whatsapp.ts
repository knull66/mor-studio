import { SITE } from "@/lib/constants";
import { digitsOnly } from "@/lib/site";

export function whatsappUrl(message: string, phone = SITE.whatsapp) {
  const number = digitsOnly(phone) || SITE.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
