"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deletePackage, togglePackage, upsertPackage } from "@/app/actions";
import type { ServicePackage } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const EMPTY: Partial<ServicePackage> = {
  title: "",
  category: "makeup",
  price: 0,
  description: "",
  duration: "",
  features: [],
  is_featured: false,
  is_active: true,
  sort_order: 0,
};

export function PackagesManager({ packages }: { packages: ServicePackage[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Partial<ServicePackage> | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const result = await upsertPackage(new FormData(event.currentTarget));
    setPending(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Paquete guardado.");
    setEditing(null);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <button type="button" className="solid-btn" onClick={() => setEditing(EMPTY)}>
        Nuevo paquete
      </button>

      {editing ? (
        <form onSubmit={onSubmit} className="grid gap-3 border border-sand-deep bg-cream p-6 md:grid-cols-2">
          {editing.id ? <input type="hidden" name="id" value={editing.id} /> : null}
          <input
            required
            name="title"
            defaultValue={editing.title}
            placeholder="Título"
            className="border border-sand-deep px-3 py-2 text-sm"
          />
          <select
            name="category"
            defaultValue={editing.category}
            className="border border-sand-deep px-3 py-2 text-sm"
          >
            <option value="makeup">Maquillaje</option>
            <option value="hair">Peinados</option>
            <option value="photography">Fotografía</option>
            <option value="bridal_combo">Experiencia MOR</option>
          </select>
          <input
            required
            name="price"
            type="number"
            defaultValue={editing.price}
            placeholder="Precio"
            className="border border-sand-deep px-3 py-2 text-sm"
          />
          <input
            name="duration"
            defaultValue={editing.duration}
            placeholder="Duración"
            className="border border-sand-deep px-3 py-2 text-sm"
          />
          <input
            name="sort_order"
            type="number"
            defaultValue={editing.sort_order ?? 0}
            placeholder="Orden"
            className="border border-sand-deep px-3 py-2 text-sm"
          />
          <textarea
            name="description"
            defaultValue={editing.description}
            placeholder="Descripción"
            className="border border-sand-deep px-3 py-2 text-sm md:col-span-2"
            rows={3}
          />
          <textarea
            name="features"
            defaultValue={(editing.features ?? []).join("\n")}
            placeholder="Un beneficio por línea (español)"
            className="border border-sand-deep px-3 py-2 text-sm md:col-span-2"
            rows={5}
          />
          <p className="text-xs uppercase tracking-[0.16em] text-muted md:col-span-2">
            Versión en inglés (opcional). Si está vacía, el sitio en EN usa el texto en español.
          </p>
          <input
            name="title_en"
            defaultValue={editing.title_en}
            placeholder="Title (English)"
            className="border border-sand-deep px-3 py-2 text-sm"
          />
          <input
            name="duration_en"
            defaultValue={editing.duration_en}
            placeholder="Duration (English)"
            className="border border-sand-deep px-3 py-2 text-sm"
          />
          <textarea
            name="description_en"
            defaultValue={editing.description_en}
            placeholder="Description (English)"
            className="border border-sand-deep px-3 py-2 text-sm md:col-span-2"
            rows={3}
          />
          <textarea
            name="features_en"
            defaultValue={(editing.features_en ?? []).join("\n")}
            placeholder="One benefit per line (English)"
            className="border border-sand-deep px-3 py-2 text-sm md:col-span-2"
            rows={5}
          />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="is_featured" defaultChecked={editing.is_featured} />
            Destacado
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="is_active" defaultChecked={editing.is_active !== false} />
            Activo
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

      <div className="overflow-x-auto border border-sand-deep bg-cream">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-sand text-[0.68rem] uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3">Paquete</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {packages.map((item) => (
              <tr key={item.id} className="border-t border-sand-deep">
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3 text-muted">{item.category}</td>
                <td className="px-4 py-3">{formatPrice(item.price)}</td>
                <td className="px-4 py-3">{item.is_active ? "Activo" : "Oculto"}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => setEditing(item)}>
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        await togglePackage(item.id, !item.is_active);
                        router.refresh();
                      }}
                    >
                      {item.is_active ? "Desactivar" : "Activar"}
                    </button>
                    <button
                      type="button"
                      className="text-red-700"
                      onClick={async () => {
                        if (!confirm("¿Eliminar paquete?")) return;
                        await deletePackage(item.id);
                        router.refresh();
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
