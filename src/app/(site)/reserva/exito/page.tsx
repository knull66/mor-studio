import Link from "next/link";
import { cookies } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { recordPaidStripeInquiry } from "@/lib/payments";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/lib/i18n/config";
import { formatMoney } from "@/lib/utils";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDictionary(locale);
  const { session_id: sessionId } = await searchParams;

  let paid = false;
  let packageTitle = "";
  let amountLabel = "";

  if (sessionId) {
    const stripe = getStripe();
    const session = stripe
      ? await stripe.checkout.sessions.retrieve(sessionId).catch(() => null)
      : null;

    if (session?.payment_status === "paid") {
      paid = true;
      packageTitle = session.metadata?.package_title ?? "";
      if (session.amount_total != null) {
        amountLabel = formatMoney(session.amount_total / 100, locale);
      }
      await recordPaidStripeInquiry({
        client_name: session.metadata?.client_name || session.customer_details?.name || "Cliente Stripe",
        email: session.metadata?.email || session.customer_details?.email || session.customer_email || "",
        phone: session.metadata?.phone || session.customer_details?.phone || "",
        event_date: session.metadata?.event_date || undefined,
        service_type: session.metadata?.service_type || undefined,
        message: session.metadata?.message || undefined,
        stripe_checkout_session_id: session.id,
        package_id: session.metadata?.package_id || undefined,
        package_title: session.metadata?.package_title || undefined,
        amount_cents: session.amount_total ?? Number(session.metadata?.amount_cents || 0),
      });
    }
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-taupe-dark">
        {t.checkout.eyebrow}
      </p>
      <h1 className="mt-4 font-serif text-4xl sm:text-5xl">
        {paid ? t.checkout.successTitle : t.checkout.pendingTitle}
      </h1>
      <p className="mt-6 text-sm leading-relaxed text-muted">
        {paid ? t.checkout.successBody : t.checkout.pendingBody}
      </p>
      {paid && (packageTitle || amountLabel) ? (
        <p className="mt-4 text-sm text-ink">
          {packageTitle}
          {packageTitle && amountLabel ? " · " : ""}
          {amountLabel ? t.checkout.depositPaid.replace("{amount}", amountLabel) : ""}
        </p>
      ) : null}
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link href="/" className="solid-btn">
          {t.checkout.back}
        </Link>
        <Link href="/#paquetes" className="outlined-btn border-ink text-ink">
          {t.checkout.packages}
        </Link>
      </div>
    </section>
  );
}
