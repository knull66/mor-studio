"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { deleteTeamMember, updateTeamOrder, upsertTeamMember } from "@/app/actions";
import type { TeamMember } from "@/lib/types";

const EMPTY: Partial<TeamMember> = {
  name: "",
  role: "",
  role_en: "",
  bio: "",
  bio_en: "",
  bio_2: "",
  bio_2_en: "",
  is_founder: false,
  is_published: true,
  sort_order: 0,
};

export function TeamManager({ members }: { members: TeamMember[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Partial<TeamMember> | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const result = await upsertTeamMember(new FormData(event.currentTarget));
    setPending(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Perfil guardado.");
    setEditing(null);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <button type="button" className="solid-btn" onClick={() => setEditing(EMPTY)}>
        Añadir persona
      </button>

      {editing ? (
        <form onSubmit={onSubmit} className="grid gap-3 border border-sand-deep bg-cream p-6 md:grid-cols-2">
          {editing.id ? <input type="hidden" name="id" value={editing.id} /> : null}
          <input
            required
            name="name"
            defaultValue={editing.name}
            placeholder="Nombre"
            className="border border-sand-deep px-3 py-2 text-sm md:col-span-2"
          />
          <input
            name="role"
            defaultValue={editing.role}
            placeholder="Cargo (español)"
            className="border border-sand-deep px-3 py-2 text-sm"
          />
          <input
            name="role_en"
            defaultValue={editing.role_en}
            placeholder="Role (English)"
            className="border border-sand-deep px-3 py-2 text-sm"
          />
          <textarea
            name="bio"
            defaultValue={editing.bio}
            placeholder="Primer párrafo (español)"
            className="border border-sand-deep px-3 py-2 text-sm md:col-span-2"
            rows={4}
          />
          <textarea
            name="bio_en"
            defaultValue={editing.bio_en}
            placeholder="First paragraph (English)"
            className="border border-sand-deep px-3 py-2 text-sm md:col-span-2"
            rows={4}
          />
          <textarea
            name="bio_2"
            defaultValue={editing.bio_2}
            placeholder="Segundo párrafo (español, opcional)"
            className="border border-sand-deep px-3 py-2 text-sm md:col-span-2"
            rows={3}
          />
          <textarea
            name="bio_2_en"
            defaultValue={editing.bio_2_en}
            placeholder="Second paragraph (English, optional)"
            className="border border-sand-deep px-3 py-2 text-sm md:col-span-2"
            rows={3}
          />
          <label className="text-xs uppercase tracking-[0.16em] text-muted">
            Foto principal {editing.image_url ? "(deja vacío para conservar)" : ""}
            <input type="file" name="image" accept="image/*" className="mt-2 block w-full text-sm" />
          </label>
          <label className="text-xs uppercase tracking-[0.16em] text-muted">
            Segunda foto (opcional)
            <input type="file" name="image_2" accept="image/*" className="mt-2 block w-full text-sm" />
          </label>
          {editing.image_url ? (
            <div className="relative aspect-[3/4] max-w-[140px] overflow-hidden bg-sand">
              <Image src={editing.image_url} alt="" fill className="object-cover" />
            </div>
          ) : null}
          {editing.image_url_2 ? (
            <div>
              <div className="relative aspect-[3/4] max-w-[140px] overflow-hidden bg-sand">
                <Image src={editing.image_url_2} alt="" fill className="object-cover" />
              </div>
              <label className="mt-2 flex items-center gap-2 text-xs">
                <input type="checkbox" name="remove_image_2" />
                Quitar segunda foto
              </label>
            </div>
          ) : null}
          <input
            name="sort_order"
            type="number"
            defaultValue={editing.sort_order ?? 0}
            placeholder="Orden"
            className="border border-sand-deep px-3 py-2 text-sm"
          />
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="is_founder" defaultChecked={editing.is_founder} />
              Perfil destacado
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="is_published" defaultChecked={editing.is_published !== false} />
              Publicado
            </label>
          </div>
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
        {members.length === 0 ? (
          <p className="border border-sand-deep bg-cream p-8 text-sm text-muted md:col-span-2">
            Aún no hay perfiles. Ejecuta supabase/migration-team.sql en Supabase para cargar a
            Elisabeth; después podrás cambiar fotos y textos, o sumar al equipo.
          </p>
        ) : (
          members.map((item, index) => (
            <article key={item.id} className="border border-sand-deep bg-cream p-5">
              <div className="flex gap-4">
                {item.image_url ? (
                  <div className="relative size-20 shrink-0 overflow-hidden bg-sand">
                    <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                  </div>
                ) : null}
                <div className="min-w-0">
                  <p className="font-serif text-2xl">{item.name}</p>
                  <p className="text-xs uppercase tracking-widest text-muted">{item.role}</p>
                  <p className="mt-2 text-xs text-muted">
                    {item.is_published ? "Publicado" : "Oculto"}
                    {item.is_founder ? " · Destacado" : ""}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <button type="button" onClick={() => setEditing(item)}>
                  Editar
                </button>
                <button
                  type="button"
                  disabled={index === 0}
                  className="disabled:opacity-30"
                  onClick={async () => {
                    await updateTeamOrder(item.id, "up");
                    router.refresh();
                  }}
                >
                  <ArrowUp className="inline size-4" />
                </button>
                <button
                  type="button"
                  disabled={index === members.length - 1}
                  className="disabled:opacity-30"
                  onClick={async () => {
                    await updateTeamOrder(item.id, "down");
                    router.refresh();
                  }}
                >
                  <ArrowDown className="inline size-4" />
                </button>
                <button
                  type="button"
                  className="text-red-700"
                  onClick={async () => {
                    if (!confirm(`¿Quitar a ${item.name} del sitio?`)) return;
                    const result = await deleteTeamMember(item.id, item.image_url, item.image_url_2);
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
