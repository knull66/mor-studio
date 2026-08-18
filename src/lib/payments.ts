import { createServiceClient } from "@/lib/supabase/service";
import type { InquiryInput } from "@/lib/types";

export type StripeInquiryRecord = InquiryInput & {
  stripe_checkout_session_id: string;
  package_id?: string;
  package_title?: string;
  amount_cents?: number | null;
};

export async function recordPaidStripeInquiry(input: StripeInquiryRecord) {
  const supabase = createServiceClient();
  if (!supabase) return { ok: false as const, error: "Supabase no está configurado." };

  const name = input.client_name.trim();
  const phone = input.phone.trim();
  if (name.length < 2) return { ok: false as const, error: "Nombre incompleto." };

  const row = {
    client_name: name,
    email: input.email?.trim() || null,
    phone: phone || "stripe",
    event_date: input.event_date || null,
    service_type: input.service_type || null,
    message: input.message?.trim() || null,
    status: "pending",
    payment_method: "stripe",
    payment_status: "paid",
    stripe_checkout_session_id: input.stripe_checkout_session_id,
    package_id: input.package_id || null,
    package_title: input.package_title || null,
    amount_cents: input.amount_cents ?? null,
  };

  const { error } = await supabase.from("inquiries").insert(row);

  if (!error) return { ok: true as const };

  if (error.code === "23505") return { ok: true as const };

  const { error: fallbackError } = await supabase.from("inquiries").insert({
    client_name: row.client_name,
    email: row.email,
    phone: row.phone,
    event_date: row.event_date,
    service_type: row.service_type,
    message: [
      row.message,
      row.package_title ? `Paquete: ${row.package_title}` : null,
      row.amount_cents != null ? `Depósito pagado: $${(row.amount_cents / 100).toFixed(2)}` : null,
      `Stripe: ${row.stripe_checkout_session_id}`,
    ]
      .filter(Boolean)
      .join("\n"),
    status: "pending",
  });

  if (fallbackError?.code === "23505") return { ok: true as const };
  if (fallbackError) return { ok: false as const, error: fallbackError.message };
  return { ok: true as const };
}
