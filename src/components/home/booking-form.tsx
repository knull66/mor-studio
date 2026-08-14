"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { submitInquiry } from "@/app/actions";
import { useI18n } from "@/lib/i18n/language-provider";
import { useSite } from "@/lib/site-provider";
import { BOOKING_SERVICE_IDS } from "@/lib/constants";
import { whatsappUrl } from "@/lib/whatsapp";

export function BookingForm() {
  const { t, locale } = useI18n();
  const { settings } = useSite();
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);

    const payload = {
      client_name: String(data.get("client_name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      event_date: String(data.get("event_date") ?? ""),
      service_type: String(data.get("service_type") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    const result = await submitInquiry(payload);
    setPending(false);

    if (!result.ok) {
      toast.error(result.error ?? t.booking.error);
      return;
    }

    const serviceLabel =
      t.booking.services[payload.service_type as keyof typeof t.booking.services] ??
      payload.service_type;

    toast.success(t.booking.success);
    window.open(
      whatsappUrl(
        t.whatsapp.booking(
          payload.client_name,
          serviceLabel,
          payload.event_date,
          payload.message,
        ),
        settings.whatsapp,
      ),
      "_blank",
      "noopener,noreferrer",
    );
    form.reset();
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
          <label className="block text-xs uppercase tracking-[0.16em] text-muted md:col-span-2">
            {t.booking.service}
            <select
              key={locale}
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
          <button type="submit" disabled={pending} className="solid-btn md:col-span-2">
            {pending ? t.booking.sending : t.booking.submit}
          </button>
        </form>
      </Reveal>
    </section>
  );
}
