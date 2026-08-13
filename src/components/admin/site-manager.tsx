"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  createHeroSlide,
  deleteHeroSlide,
  updateHeroOrder,
  updateSiteSettings,
} from "@/app/actions";
import type { HeroSlide, SiteSettings } from "@/lib/types";

export function SiteManager({
  settings,
  slides,
}: {
  settings: SiteSettings;
  slides: HeroSlide[];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  async function onSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const result = await updateSiteSettings(new FormData(event.currentTarget));
    setSaving(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Redes y contacto actualizados.");
    router.refresh();
  }

  async function onUploadSlide(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setUploading(true);
    const result = await createHeroSlide(new FormData(form));
    setUploading(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Foto añadida al slider.");
    form.reset();
    router.refresh();
  }

  return (
    <div className="space-y-12">
      <section>
        <h2 className="font-serif text-2xl">Redes y contacto</h2>
        <p className="mt-1 mb-6 text-sm text-muted">
          Estos datos aparecen en el pie, WhatsApp y la barra de información. Puedes pegar la URL
          completa o solo el usuario.
        </p>
        <form onSubmit={onSaveSettings} className="grid gap-4 border border-sand-deep bg-cream p-6 md:grid-cols-2">
          <label className="text-xs uppercase tracking-[0.16em] text-muted">
            Instagram
            <input
              name="instagram"
              defaultValue={settings.instagram}
              placeholder="https://instagram.com/usuario o @usuario"
              className="mt-2 w-full border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.16em] text-muted">
            Facebook
            <input
              name="facebook"
              defaultValue={settings.facebook}
              placeholder="URL o nombre de página"
              className="mt-2 w-full border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.16em] text-muted">
            TikTok
            <input
              name="tiktok"
              defaultValue={settings.tiktok}
              placeholder="@usuario o URL"
              className="mt-2 w-full border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.16em] text-muted">
            WhatsApp (solo números, con código de país)
            <input
              name="whatsapp"
              defaultValue={settings.whatsapp}
              placeholder="12105485300"
              className="mt-2 w-full border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.16em] text-muted">
            Teléfono visible
            <input
              name="phone_display"
              defaultValue={settings.phone_display}
              placeholder="+1 (210) 548-5300"
              className="mt-2 w-full border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.16em] text-muted">
            Correo
            <input
              name="email"
              type="email"
              defaultValue={settings.email}
              className="mt-2 w-full border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.16em] text-muted md:col-span-2">
            Dirección
            <input
              name="address"
              defaultValue={settings.address}
              className="mt-2 w-full border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
            />
          </label>
          <button type="submit" disabled={saving} className="solid-btn md:col-span-2">
            {saving ? "Guardando…" : "Guardar redes y contacto"}
          </button>
        </form>
      </section>

      <section>
        <h2 className="font-serif text-2xl">Slider de inicio</h2>
        <p className="mt-1 mb-6 text-sm text-muted">
          Fotos grandes del carrusel principal. Si no subes ninguna, se muestran las de demostración.
        </p>
        <form
          onSubmit={onUploadSlide}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            const file = event.dataTransfer.files[0];
            if (file && inputRef.current) {
              const dt = new DataTransfer();
              dt.items.add(file);
              inputRef.current.files = dt.files;
            }
          }}
          className={`border border-dashed p-6 ${dragging ? "border-taupe bg-sand" : "border-sand-deep bg-cream"}`}
        >
          <div className="flex items-center gap-3 text-sm text-muted">
            <Upload className="size-4" />
            Arrastra una foto horizontal o selecciónala. Ideal 2400px de ancho.
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <input ref={inputRef} required type="file" name="file" accept="image/*" className="text-sm" />
            <input
              name="alt"
              placeholder="Texto alternativo"
              className="border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
            />
            <input
              name="caption"
              placeholder="Pie (opcional)"
              className="border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
            />
          </div>
          <button type="submit" disabled={uploading} className="solid-btn mt-4">
            {uploading ? "Subiendo…" : "Añadir al slider"}
          </button>
        </form>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {slides.map((item, index) => (
            <article key={item.id} className="overflow-hidden border border-sand-deep bg-cream">
              <div className="relative aspect-[16/10]">
                <Image src={item.image_url} alt={item.alt || "Slide"} fill className="object-cover" />
              </div>
              <div className="flex items-center justify-between gap-2 p-3">
                <p className="text-sm">{item.alt || item.caption || `Foto ${index + 1}`}</p>
                {!item.id.startsWith("seed-") ? (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      className="p-1 disabled:opacity-30"
                      onClick={async () => {
                        await updateHeroOrder(item.id, "up");
                        router.refresh();
                      }}
                    >
                      <ArrowUp className="size-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === slides.length - 1}
                      className="p-1 disabled:opacity-30"
                      onClick={async () => {
                        await updateHeroOrder(item.id, "down");
                        router.refresh();
                      }}
                    >
                      <ArrowDown className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1 text-red-700"
                      onClick={async () => {
                        if (!confirm("¿Quitar esta foto del slider?")) return;
                        const result = await deleteHeroSlide(item.id, item.image_url);
                        if (!result.ok) toast.error(result.error);
                        else toast.success("Eliminada.");
                        router.refresh();
                      }}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-[0.65rem] uppercase tracking-widest text-muted">Demo</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
