"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateHeroSlide } from "@/app/actions";
import { heroImageStyle } from "@/lib/site";
import type { HeroSlide } from "@/lib/types";

export function HeroCropEditor({ slide }: { slide: HeroSlide }) {
  const router = useRouter();
  const dragRef = useRef<{ x: number; y: number; focalX: number; focalY: number } | null>(null);
  const [focalX, setFocalX] = useState(slide.focal_x ?? 50);
  const [focalY, setFocalY] = useState(slide.focal_y ?? 50);
  const [zoom, setZoom] = useState(slide.zoom ?? 100);
  const [alt, setAlt] = useState(slide.alt);
  const [caption, setCaption] = useState(slide.caption);
  const [saving, setSaving] = useState(false);

  const style = heroImageStyle({ focal_x: focalX, focal_y: focalY, zoom });

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, focalX, focalY };
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return;
    const box = event.currentTarget.getBoundingClientRect();
    const dx = ((event.clientX - dragRef.current.x) / box.width) * 100;
    const dy = ((event.clientY - dragRef.current.y) / box.height) * 100;
    setFocalX(Math.min(100, Math.max(0, dragRef.current.focalX - dx)));
    setFocalY(Math.min(100, Math.max(0, dragRef.current.focalY - dy)));
  }

  function onPointerUp() {
    dragRef.current = null;
  }

  async function onSave() {
    const data = new FormData();
    data.set("id", slide.id);
    data.set("alt", alt);
    data.set("caption", caption);
    data.set("focal_x", String(Math.round(focalX)));
    data.set("focal_y", String(Math.round(focalY)));
    data.set("zoom", String(Math.round(zoom)));
    setSaving(true);
    const result = await updateHeroSlide(data);
    setSaving(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Recorte del slider guardado.");
    router.refresh();
  }

  return (
    <div className="space-y-3 border-t border-sand-deep p-3">
      <div className="grid grid-cols-[1fr_auto] items-end gap-3">
        <div>
          <p className="mb-2 text-[0.62rem] uppercase tracking-[0.16em] text-muted">Escritorio</p>
          <div
            className="relative aspect-[16/9] cursor-grab overflow-hidden bg-ink touch-none active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <Image
              src={slide.image_url}
              alt=""
              fill
              sizes="400px"
              draggable={false}
              className="pointer-events-none select-none"
              style={style}
            />
          </div>
        </div>
        <div>
          <p className="mb-2 text-[0.62rem] uppercase tracking-[0.16em] text-muted">Móvil</p>
          <div className="relative aspect-[3/4] w-20 overflow-hidden bg-ink">
            <Image
              src={slide.image_url}
              alt=""
              fill
              sizes="80px"
              className="pointer-events-none select-none"
              style={style}
            />
          </div>
        </div>
      </div>
      <p className="text-[0.7rem] text-muted">Arrastra la vista de escritorio para mover el recorte.</p>
      <label className="block text-[0.62rem] uppercase tracking-[0.16em] text-muted">
        Horizontal {Math.round(focalX)}%
        <input
          type="range"
          min={0}
          max={100}
          value={focalX}
          onChange={(event) => setFocalX(Number(event.target.value))}
          className="mt-1 w-full"
        />
      </label>
      <label className="block text-[0.62rem] uppercase tracking-[0.16em] text-muted">
        Vertical {Math.round(focalY)}%
        <input
          type="range"
          min={0}
          max={100}
          value={focalY}
          onChange={(event) => setFocalY(Number(event.target.value))}
          className="mt-1 w-full"
        />
      </label>
      <label className="block text-[0.62rem] uppercase tracking-[0.16em] text-muted">
        Zoom {Math.round(zoom)}%
        <input
          type="range"
          min={100}
          max={200}
          value={zoom}
          onChange={(event) => setZoom(Number(event.target.value))}
          className="mt-1 w-full"
        />
      </label>
      <input
        value={alt}
        onChange={(event) => setAlt(event.target.value)}
        placeholder="Texto alternativo"
        className="w-full border border-sand-deep bg-white px-2 py-1.5 text-sm outline-none"
      />
      <input
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
        placeholder="Pie de foto"
        className="w-full border border-sand-deep bg-white px-2 py-1.5 text-sm outline-none"
      />
      <div className="flex gap-2">
        <button type="button" disabled={saving} className="solid-btn !py-2" onClick={onSave}>
          {saving ? "Guardando…" : "Guardar recorte"}
        </button>
        <button
          type="button"
          className="outlined-btn !py-2"
          onClick={() => {
            setFocalX(50);
            setFocalY(50);
            setZoom(100);
          }}
        >
          Centrar
        </button>
      </div>
    </div>
  );
}
