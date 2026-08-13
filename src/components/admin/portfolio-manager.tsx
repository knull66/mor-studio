"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  createPortfolioItem,
  deletePortfolioItem,
  updatePortfolioOrder,
} from "@/app/actions";
import type { PortfolioItem } from "@/lib/types";

const CATEGORIES = [
  { id: "brides", label: "Novias" },
  { id: "makeup", label: "Maquillaje" },
  { id: "studio", label: "Estudio" },
  { id: "exteriors", label: "Exteriores" },
];

export function PortfolioManager({ items }: { items: PortfolioItem[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [pending, setPending] = useState(false);

  async function upload(file: File, title: string, category: string) {
    const data = new FormData();
    data.set("file", file);
    data.set("title", title);
    data.set("category", category);
    setPending(true);
    const result = await createPortfolioItem(data);
    setPending(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Imagen publicada.");
    router.refresh();
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("file");
    if (!(file instanceof File)) return;
    await upload(file, String(data.get("title") ?? ""), String(data.get("category") ?? "studio"));
    form.reset();
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={onSubmit}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          const file = event.dataTransfer.files[0];
          if (file) {
            const dt = new DataTransfer();
            dt.items.add(file);
            if (inputRef.current) inputRef.current.files = dt.files;
          }
        }}
        className={`border border-dashed p-6 ${dragging ? "border-taupe bg-sand" : "border-sand-deep bg-cream"}`}
      >
        <div className="flex items-center gap-3 text-sm text-muted">
          <Upload className="size-4" />
          Arrastra una imagen o selecciónala. JPG o PNG, idealmente 2000px.
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <input
            ref={inputRef}
            required
            type="file"
            name="file"
            accept="image/*"
            className="text-sm"
          />
          <input
            name="title"
            placeholder="Título"
            className="border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
          />
          <select name="category" className="border border-sand-deep bg-white px-3 py-2 text-sm">
            {CATEGORIES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={pending} className="solid-btn mt-4">
          {pending ? "Subiendo…" : "Publicar"}
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <article key={item.id} className="overflow-hidden border border-sand-deep bg-cream">
            <div className="relative aspect-[4/5]">
              <Image src={item.image_url} alt={item.title} fill className="object-cover" />
            </div>
            <div className="flex items-center justify-between gap-2 p-3">
              <div>
                <p className="text-sm font-medium">{item.title || "Sin título"}</p>
                <p className="text-xs uppercase tracking-widest text-muted">{item.category}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  className="p-1 disabled:opacity-30"
                  onClick={async () => {
                    await updatePortfolioOrder(item.id, "up");
                    router.refresh();
                  }}
                >
                  <ArrowUp className="size-4" />
                </button>
                <button
                  type="button"
                  disabled={index === items.length - 1}
                  className="p-1 disabled:opacity-30"
                  onClick={async () => {
                    await updatePortfolioOrder(item.id, "down");
                    router.refresh();
                  }}
                >
                  <ArrowDown className="size-4" />
                </button>
                <button
                  type="button"
                  className="p-1 text-red-700"
                  onClick={async () => {
                    if (!confirm("¿Eliminar esta imagen?")) return;
                    const result = await deletePortfolioItem(item.id, item.image_url);
                    if (!result.ok) toast.error(result.error);
                    else toast.success("Eliminada.");
                    router.refresh();
                  }}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
