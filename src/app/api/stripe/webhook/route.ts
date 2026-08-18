import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getStripe } from "@/lib/stripe";
import { recordPaidStripeInquiry } from "@/lib/payments";
import type Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function inquiryFromSession(session: Stripe.Checkout.Session) {
  const meta = session.metadata ?? {};
  const phone =
    meta.phone ||
    session.customer_details?.phone ||
    "";
  const email =
    meta.email ||
    session.customer_details?.email ||
    session.customer_email ||
    "";
  const name =
    meta.client_name ||
    session.customer_details?.name ||
    "Cliente Stripe";

  return {
    client_name: name,
    email,
    phone,
    event_date: meta.event_date || undefined,
    service_type: meta.service_type || undefined,
    message: meta.message || undefined,
    stripe_checkout_session_id: session.id,
    package_id: meta.package_id || undefined,
    package_title: meta.package_title || undefined,
    amount_cents: session.amount_total ?? Number(meta.amount_cents || 0),
  };
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ error: "Stripe webhook no configurado." }, { status: 501 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Falta la firma." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Firma inválida." }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === "paid" || event.type === "checkout.session.async_payment_succeeded") {
      const result = await recordPaidStripeInquiry(inquiryFromSession(session));
      if (!result.ok) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }
      revalidatePath("/admin/inquiries");
      revalidatePath("/admin");
    }
  }

  return NextResponse.json({ received: true });
}
