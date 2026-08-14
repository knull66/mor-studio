"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  createBeforeAfterPair,
  createHeroSlide,
  createInstagramStripItem,
  deleteBeforeAfterPair,
  deleteHeroSlide,
  deleteInstagramStripItem,
  updateBeforeAfterOrder,
  updateHeroOrder,
  updateInstagramStripOrder,
  updateSiteSettings,
} from "@/app/actions";
import { HeroCropEditor } from "@/components/admin/hero-crop-editor";
import { heroImageStyle } from "@/lib/site";
import type { BeforeAfterPair, HeroSlide, InstagramStripItem, SiteSettings } from "@/lib/types";

export function SiteManager({
  settings,
  slides,
  beforeAfter,
  instagramStrip,
}: {
  settings: SiteSettings;
  slides: HeroSlide[];
  beforeAfter: BeforeAfterPair[];
  instagramStrip: InstagramStripItem[];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingPair, setUploadingPair] = useState(false);
  const [uploadingStrip, setUploadingStrip] = useState(false);
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
          <label className="text-xs uppercase tracking-[0.16em] text-muted md:col-span-2">
            Horario visible
            <input
              name="hours"
              defaultValue={settings.hours}
              placeholder="Mar — Sáb · 10:00 a.m. – 7:00 p.m."
              className="mt-2 w-full border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
            />
          </label>
          <label className="flex items-center gap-2 text-sm md:col-span-2">
            <input
              type="checkbox"
              name="announcement_enabled"
              defaultChecked={settings.announcement_enabled}
            />
            Mostrar barra de anuncio
          </label>
          <label className="text-xs uppercase tracking-[0.16em] text-muted">
            Anuncio (español)
            <input
              name="announcement_es"
              defaultValue={settings.announcement_es}
              placeholder="Promo o aviso en la barra superior"
              className="mt-2 w-full border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.16em] text-muted">
            Anuncio (inglés)
            <input
              name="announcement_en"
              defaultValue={settings.announcement_en}
              placeholder="Promo or notice in the top bar"
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
          Fotos grandes del carrusel principal. Después de subirlas, ajusta recorte, posición y zoom
          para que el sujeto quede bien en móvil y escritorio.
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
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image_url}
                  alt={item.alt || "Slide"}
                  fill
                  className="object-cover"
                  style={heroImageStyle(item)}
                />
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
              {!item.id.startsWith("seed-") ? <HeroCropEditor slide={item} /> : null}
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl">Antes y después</h2>
        <p className="mt-1 mb-6 text-sm text-muted">
          Pares de fotos para el comparador de la web. Si no subes ninguno, la sección no se muestra.
        </p>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            setUploadingPair(true);
            const result = await createBeforeAfterPair(new FormData(form));
            setUploadingPair(false);
            if (!result.ok) {
              toast.error(result.error);
              return;
            }
            toast.success("Comparación añadida.");
            form.reset();
            router.refresh();
          }}
          className="border border-dashed border-sand-deep bg-cream p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-xs uppercase tracking-[0.16em] text-muted">
              Foto de antes
              <input required type="file" name="before" accept="image/*" className="mt-2 block w-full text-sm" />
            </label>
            <label className="text-xs uppercase tracking-[0.16em] text-muted">
              Foto de después
              <input required type="file" name="after" accept="image/*" className="mt-2 block w-full text-sm" />
            </label>
            <input
              name="title"
              placeholder="Título (opcional)"
              className="border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                name="before_label"
                placeholder="Etiqueta antes"
                className="border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
              />
              <input
                name="after_label"
                placeholder="Etiqueta después"
                className="border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
              />
            </div>
          </div>
          <button type="submit" disabled={uploadingPair} className="solid-btn mt-4">
            {uploadingPair ? "Subiendo…" : "Añadir comparación"}
          </button>
        </form>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {beforeAfter.map((item, index) => (
            <article key={item.id} className="overflow-hidden border border-sand-deep bg-cream">
              <div className="grid grid-cols-2">
                <div className="relative aspect-[4/5]">
                  <Image src={item.before_image_url} alt={item.before_label || "Antes"} fill className="object-cover" />
                  <span className="absolute bottom-2 left-2 bg-cream/90 px-2 py-0.5 text-[0.58rem] uppercase tracking-widest">
                    {item.before_label || "Antes"}
                  </span>
                </div>
                <div className="relative aspect-[4/5]">
                  <Image src={item.after_image_url} alt={item.after_label || "Después"} fill className="object-cover" />
                  <span className="absolute right-2 bottom-2 bg-charcoal/85 px-2 py-0.5 text-[0.58rem] uppercase tracking-widest text-cream">
                    {item.after_label || "Después"}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 p-3">
                <p className="text-sm">{item.title || `Comparación ${index + 1}`}</p>
                {!item.id.startsWith("seed-") ? (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      className="p-1 disabled:opacity-30"
                      onClick={async () => {
                        await updateBeforeAfterOrder(item.id, "up");
                        router.refresh();
                      }}
                    >
                      <ArrowUp className="size-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === beforeAfter.length - 1}
                      className="p-1 disabled:opacity-30"
                      onClick={async () => {
                        await updateBeforeAfterOrder(item.id, "down");
                        router.refresh();
                      }}
                    >
                      <ArrowDown className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1 text-red-700"
                      onClick={async () => {
                        if (!confirm("¿Quitar esta comparación?")) return;
                        const result = await deleteBeforeAfterPair(
                          item.id,
                          item.before_image_url,
                          item.after_image_url,
                        );
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

      <section>
        <h2 className="font-serif text-2xl">Tira de Instagram</h2>
        <p className="mt-1 mb-6 text-sm text-muted">
          Fotos cuadradas al final de la página. Cada una abre el perfil de Instagram. Instagram no
          permite leer el feed automáticamente sin una app de Meta, así que aquí subes las fotos que
          quieras mostrar (idealmente 8).
        </p>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            setUploadingStrip(true);
            const result = await createInstagramStripItem(new FormData(form));
            setUploadingStrip(false);
            if (!result.ok) {
              toast.error(result.error);
              return;
            }
            toast.success("Foto añadida a la tira.");
            form.reset();
            router.refresh();
          }}
          className="border border-dashed border-sand-deep bg-cream p-6"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <input required type="file" name="file" accept="image/*" className="text-sm" />
            <input
              name="alt"
              placeholder="Texto alternativo (opcional)"
              className="border border-sand-deep bg-white px-3 py-2 text-sm outline-none"
            />
          </div>
          <button type="submit" disabled={uploadingStrip} className="solid-btn mt-4">
            {uploadingStrip ? "Subiendo…" : "Añadir a la tira"}
          </button>
        </form>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {instagramStrip.map((item, index) => (
            <article key={item.id} className="overflow-hidden border border-sand-deep bg-cream">
              <div className="relative aspect-square">
                <Image src={item.image_url} alt={item.alt || `Foto ${index + 1}`} fill className="object-cover" />
              </div>
              <div className="flex items-center justify-between p-2">
                {!item.id.startsWith("seed-") ? (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      className="p-1 disabled:opacity-30"
                      onClick={async () => {
                        await updateInstagramStripOrder(item.id, "up");
                        router.refresh();
                      }}
                    >
                      <ArrowUp className="size-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === instagramStrip.length - 1}
                      className="p-1 disabled:opacity-30"
                      onClick={async () => {
                        await updateInstagramStripOrder(item.id, "down");
                        router.refresh();
                      }}
                    >
                      <ArrowDown className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1 text-red-700"
                      onClick={async () => {
                        if (!confirm("¿Quitar esta foto de la tira?")) return;
                        const result = await deleteInstagramStripItem(item.id, item.image_url);
                        if (!result.ok) toast.error(result.error);
                        else toast.success("Eliminada.");
                        router.refresh();
                      }}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-[0.58rem] uppercase tracking-widest text-muted">Demo</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
