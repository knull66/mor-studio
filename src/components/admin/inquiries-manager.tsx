"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateInquiryStatus } from "@/app/actions";
import { dictionaries } from "@/lib/i18n/dictionaries";
import type { Inquiry } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";

const SERVICE_LABELS = dictionaries.es.booking.services;

export function InquiriesManager({
  inquiries,
  whatsapp,
}: {
  inquiries: Inquiry[];
  whatsapp?: string;
}) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto border border-sand-deep bg-cream">
      {inquiries.length === 0 ? (
        <p className="p-8 text-sm text-muted">
          Aún no hay solicitudes. Cuando alguien complete el formulario, aparecerán aquí.
        </p>
      ) : (
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-sand text-[0.68rem] uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Servicio</th>
              <th className="px-4 py-3">Fecha evento</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {inquiries.map((item) => (
              <tr key={item.id} className="border-t border-sand-deep align-top">
                <td className="px-4 py-4">
                  <p className="font-medium">{item.client_name}</p>
                  <p className="text-muted">{item.phone}</p>
                  <p className="text-muted">{item.email}</p>
                  {item.message ? (
                    <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted">
                      {item.message}
                    </p>
                  ) : null}
                </td>
                <td className="px-4 py-4">
                  {(item.service_type &&
                    SERVICE_LABELS[item.service_type as keyof typeof SERVICE_LABELS]) ||
                    item.service_type}
                </td>
                <td className="px-4 py-4">
                  {item.event_date ? formatDate(item.event_date) : "—"}
                  <p className="mt-1 text-xs text-muted">
                    Recibida {formatDate(item.created_at)}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 text-[0.65rem] uppercase tracking-widest ${
                      item.status === "pending"
                        ? "bg-sand-deep text-ink"
                        : "bg-charcoal text-cream"
                    }`}
                  >
                    {item.status === "pending" ? "Pendiente" : "Atendido"}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col items-end gap-2">
                    <a
                      href={whatsappUrl(
                        `Hola ${item.client_name}, te escribimos de MOR Studio.`,
                        whatsapp,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="text-taupe-dark"
                    >
                      WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={async () => {
                        const next = item.status === "pending" ? "attended" : "pending";
                        const result = await updateInquiryStatus(item.id, next);
                        if (!result.ok) toast.error(result.error);
                        router.refresh();
                      }}
                    >
                      Marcar {item.status === "pending" ? "atendido" : "pendiente"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
