"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteTestimonial, upsertTestimonial } from "@/app/actions";
import type { Testimonial } from "@/lib/types";

const EMPTY: Partial<Testimonial> = {
  client_name: "",
  role: "",
  quote: "",
  role_en: "",
  quote_en: "",
  rating: 5,
  is_published: true,
};

export function TestimonialsManager({ items }: { items: Testimonial[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const result = await upsertTestimonial(new FormData(event.currentTarget));
    setPending(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Testimonio guardado.");
    setEditing(null);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <button type="button" className="solid-btn" onClick={() => setEditing(EMPTY)}>
        Nuevo testimonio
      </button>

      {editing ? (
        <form onSubmit={onSubmit} className="grid gap-3 border border-sand-deep bg-cream p-6 md:grid-cols-2">
          {editing.id ? <input type="hidden" name="id" value={editing.id} /> : null}
          <input
            required
            name="client_name"
            defaultValue={editing.client_name}
            placeholder="Nombre"
            className="border border-sand-deep px-3 py-2 text-sm"
          />
          <input
            name="role"
            defaultValue={editing.role}
            placeholder="Rol · ciudad (español)"
            className="border border-sand-deep px-3 py-2 text-sm"
          />
          <textarea
            required
            name="quote"
            defaultValue={editing.quote}
            placeholder="Testimonio en español"
            className="border border-sand-deep px-3 py-2 text-sm md:col-span-2"
            rows={4}
          />
          <input
            name="role_en"
            defaultValue={editing.role_en}
            placeholder="Role · city (English)"
            className="border border-sand-deep px-3 py-2 text-sm"
          />
          <input
            name="rating"
            type="number"
            min={1}
            max={5}
            defaultValue={editing.rating ?? 5}
            className="border border-sand-deep px-3 py-2 text-sm"
          />
          <textarea
            name="quote_en"
            defaultValue={editing.quote_en}
            placeholder="Testimonial in English"
            className="border border-sand-deep px-3 py-2 text-sm md:col-span-2"
            rows={4}
          />
          <label className="flex items-center gap-2 text-sm md:col-span-2">
            <input type="checkbox" name="is_published" defaultChecked={editing.is_published !== false} />
            Publicado
          </label>
          <div className="flex gap-3 md:col-span-2">
            <button type="submit" disabled={pending} className="solid-btn">
              {pending ? "Guardando…" : "Guardar"}
            </button>
            <button type="button" className="outlined-btn" onClick={() => setEditing(null)}>
              Cancelar
            </button>
          </div>
        </form>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {items.length === 0 ? (
          <p className="border border-sand-deep bg-cream p-8 text-sm text-muted md:col-span-2">
            Aún no hay testimonios. Los de demostración dejan de verse cuando Supabase está conectado:
            añade los reales aquí.
          </p>
        ) : (
          items.map((item) => (
            <article key={item.id} className="border border-sand-deep bg-cream p-5">
              <p className="font-serif text-xl leading-snug">“{item.quote}”</p>
              <p className="mt-4 text-sm font-medium">{item.client_name}</p>
              <p className="text-xs uppercase tracking-widest text-muted">{item.role}</p>
              <p className="mt-2 text-xs text-muted">
                {item.is_published === false ? "Oculto" : "Publicado"} · {item.rating}★
              </p>
              <div className="mt-4 flex gap-3 text-sm">
                <button type="button" onClick={() => setEditing(item)}>
                  Editar
                </button>
                <button
                  type="button"
                  className="text-red-700"
                  onClick={async () => {
                    if (!confirm("¿Eliminar testimonio?")) return;
                    const result = await deleteTestimonial(item.id);
                    if (!result.ok) toast.error(result.error);
                    else toast.success("Eliminado.");
                    router.refresh();
                  }}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
