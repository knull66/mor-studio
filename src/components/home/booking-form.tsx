"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { startStripeCheckout, submitInquiry } from "@/app/actions";
import { useI18n } from "@/lib/i18n/language-provider";
import { useSite } from "@/lib/site-provider";
import { BOOKING_SERVICE_IDS } from "@/lib/constants";
import { localizedPackage } from "@/lib/packages";
import { centsToUsd, depositCents } from "@/lib/deposit";
import type { PaymentMethod, ServicePackage } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";

export function BookingForm({
  packages,
  stripeEnabled,
  initialPackageId,
  initialMethod,
}: {
  packages: ServicePackage[];
  stripeEnabled: boolean;
  initialPackageId?: string;
  initialMethod?: PaymentMethod;
}) {
  const { t, locale } = useI18n();
  const { settings } = useSite();
  const [pending, setPending] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>(
    stripeEnabled && initialMethod === "stripe" ? "stripe" : "whatsapp",
  );
  const [packageId, setPackageId] = useState(initialPackageId ?? "");

  const selectedPackage = useMemo(
    () => packages.find((item) => item.id === packageId) ?? null,
    [packages, packageId],
  );
  const depositLabel = selectedPackage
    ? formatMoney(centsToUsd(depositCents(selectedPackage.price)), locale)
    : null;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      client_name: String(data.get("client_name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      event_date: String(data.get("event_date") ?? ""),
      service_type: String(data.get("service_type") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
      package_id: packageId || undefined,
    };

    if (method === "stripe") {
      if (!stripeEnabled) {
        toast.error(t.booking.stripeMissing);
        return;
      }
      if (!packageId) {
        toast.error(t.booking.package);
        return;
      }
      setPending(true);
      const result = await startStripeCheckout({ ...payload, locale });
      setPending(false);
      if (!result.ok || !result.url) {
        toast.error(result.error ?? t.booking.error);
        return;
      }
      toast.success(t.booking.successStripe);
      window.location.href = result.url;
      return;
    }

    setPending(true);
    const result = await submitInquiry(payload);
    setPending(false);

    if (!result.ok) {
      toast.error(result.error ?? t.booking.error);
      return;
    }

    const serviceLabel =
      t.booking.services[payload.service_type as keyof typeof t.booking.services] ??
      payload.service_type;
    const packageTitle = selectedPackage
      ? localizedPackage(selectedPackage, locale, t).title
      : "";

    toast.success(t.booking.success);
    window.open(
      whatsappUrl(
        t.whatsapp.booking(
          payload.client_name,
          packageTitle || serviceLabel,
          payload.event_date,
          payload.message,
        ),
        settings.whatsapp,
      ),
      "_blank",
      "noopener,noreferrer",
    );
    form.reset();
    setPackageId("");
    setMethod("whatsapp");
  }

  return (
    <section id="reservar" className="bg-sand px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow={t.booking.eyebrow}
          title={t.booking.title}
          description={t.booking.description}
        />
      </Reveal>
      <Reveal delay={0.08}>
        <form
          onSubmit={onSubmit}
          className="relative mx-auto mt-12 grid max-w-3xl gap-4 bg-cream p-6 sm:p-10 md:grid-cols-2"
        >
          {stripeEnabled ? (
          <fieldset className="md:col-span-2">
            <legend className="text-xs uppercase tracking-[0.16em] text-muted">
              {t.booking.method}
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label
                className={`cursor-pointer border px-4 py-4 text-sm ${
                  method === "whatsapp" ? "border-charcoal bg-white" : "border-sand-deep bg-cream"
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="whatsapp"
                  checked={method === "whatsapp"}
                  onChange={() => setMethod("whatsapp")}
                  className="sr-only"
                />
                <span className="block font-medium text-ink">{t.booking.methodWhatsapp}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted">
                  {t.booking.methodWhatsappHint}
                </span>
              </label>
              <label
                className={`cursor-pointer border px-4 py-4 text-sm ${
                  method === "stripe" ? "border-charcoal bg-white" : "border-sand-deep bg-cream"
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="stripe"
                  checked={method === "stripe"}
                  onChange={() => setMethod("stripe")}
                  className="sr-only"
                />
                <span className="block font-medium text-ink">{t.booking.methodStripe}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted">
                  {t.booking.methodStripeHint}
                </span>
              </label>
            </div>
          </fieldset>
          ) : null}

          <label className="block text-xs uppercase tracking-[0.16em] text-muted">
            {t.booking.name}
            <input
              required
              name="client_name"
              className="mt-2 w-full border border-sand-deep bg-white px-4 py-3 text-sm text-ink outline-none focus:border-taupe"
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.16em] text-muted">
            {t.booking.phone}
            <input
              required
              name="phone"
              type="tel"
              className="mt-2 w-full border border-sand-deep bg-white px-4 py-3 text-sm text-ink outline-none focus:border-taupe"
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.16em] text-muted">
            {t.booking.email}
            <input
              required={method === "stripe"}
              name="email"
              type="email"
              className="mt-2 w-full border border-sand-deep bg-white px-4 py-3 text-sm text-ink outline-none focus:border-taupe"
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.16em] text-muted">
            {t.booking.eventDate}
            <input
              name="event_date"
              type="date"
              className="mt-2 w-full border border-sand-deep bg-white px-4 py-3 text-sm text-ink outline-none focus:border-taupe"
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.16em] text-muted">
            {t.booking.service}
            <select
              key={`${locale}-service`}
              name="service_type"
              defaultValue={BOOKING_SERVICE_IDS[0]}
              className="mt-2 w-full border border-sand-deep bg-white px-4 py-3 text-sm text-ink outline-none focus:border-taupe"
            >
              {BOOKING_SERVICE_IDS.map((id) => (
                <option key={id} value={id}>
                  {t.booking.services[id]}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs uppercase tracking-[0.16em] text-muted">
            {t.booking.package}
            <select
              key={`${locale}-package`}
              required={method === "stripe"}
              value={packageId}
              onChange={(event) => setPackageId(event.target.value)}
              className="mt-2 w-full border border-sand-deep bg-white px-4 py-3 text-sm text-ink outline-none focus:border-taupe"
            >
              <option value="">{t.booking.packageNone}</option>
              {packages.map((item) => {
                const { title } = localizedPackage(item, locale, t);
                return (
                  <option key={item.id} value={item.id}>
                    {title} · {formatMoney(item.price, locale)}
                  </option>
                );
              })}
            </select>
          </label>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <label className="block text-xs uppercase tracking-[0.16em] text-muted md:col-span-2">
            {t.booking.message}
            <textarea
              name="message"
              rows={4}
              className="mt-2 w-full border border-sand-deep bg-white px-4 py-3 text-sm text-ink outline-none focus:border-taupe"
              placeholder={t.booking.placeholder}
            />
          </label>
          {method === "stripe" && depositLabel ? (
            <p className="text-sm text-muted md:col-span-2">
              {t.booking.depositNote}{" "}
              <span className="text-ink">
                {t.packages.depositOf}: {depositLabel}
              </span>
            </p>
          ) : null}
          <button type="submit" disabled={pending} className="solid-btn md:col-span-2 disabled:opacity-60">
            {pending
              ? t.booking.sending
              : method === "stripe"
                ? t.booking.submitStripe
                : t.booking.submit}
          </button>
        </form>
      </Reveal>
    </section>
  );
}
