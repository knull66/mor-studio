"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult, InquiryInput } from "@/lib/types";

async function requireUser() {
  const supabase = await createClient();
  if (!supabase) {
    throw new Error("Supabase no está configurado.");
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("No autorizado.");
  }
  return supabase;
}

export async function submitInquiry(input: InquiryInput): Promise<ActionResult> {
  const name = input.client_name.trim();
  const phone = input.phone.trim();

  if (name.length < 2) return { ok: false, error: "Escribe tu nombre." };
  if (phone.length < 8) return { ok: false, error: "Escribe un teléfono válido." };

  const supabase = await createClient();
  if (!supabase) {
    return { ok: true };
  }

  const { error } = await supabase.from("inquiries").insert({
    client_name: name,
    email: input.email?.trim() || null,
    phone,
    event_date: input.event_date || null,
    service_type: input.service_type || null,
    message: input.message?.trim() || null,
    status: "pending",
  });

  if (error) {
    return { ok: false, error: "No pudimos guardar tu solicitud. Escríbenos por WhatsApp." };
  }

  revalidatePath("/admin/inquiries");
  return { ok: true };
}

export async function signIn(formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();

  if (!supabase) {
    return {
      ok: false,
      error: "Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: "Correo o contraseña incorrectos." };
  return { ok: true };
}

export async function signOut() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
}

export async function upsertPackage(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await requireUser();
    const id = String(formData.get("id") ?? "");
    const payload = {
      title: String(formData.get("title") ?? "").trim(),
      category: String(formData.get("category") ?? "makeup"),
      price: Number(formData.get("price") ?? 0),
      description: String(formData.get("description") ?? "").trim(),
      duration: String(formData.get("duration") ?? "").trim(),
      features: String(formData.get("features") ?? "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      is_featured: formData.get("is_featured") === "on",
      is_active: formData.get("is_active") === "on",
      sort_order: Number(formData.get("sort_order") ?? 0),
    };

    if (!payload.title || Number.isNaN(payload.price)) {
      return { ok: false, error: "Título y precio son obligatorios." };
    }

    const query = id
      ? supabase.from("packages").update(payload).eq("id", id)
      : supabase.from("packages").insert(payload);

    const { error } = await query;
    if (error) return { ok: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/admin/packages");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Error al guardar." };
  }
}

export async function togglePackage(id: string, isActive: boolean): Promise<ActionResult> {
  try {
    const supabase = await requireUser();
    const { error } = await supabase.from("packages").update({ is_active: isActive }).eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/admin/packages");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Error al actualizar." };
  }
}

export async function deletePackage(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireUser();
    const { error } = await supabase.from("packages").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/admin/packages");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Error al eliminar." };
  }
}

export async function createPortfolioItem(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await requireUser();
    const file = formData.get("file");
    const title = String(formData.get("title") ?? "").trim();
    const category = String(formData.get("category") ?? "studio");

    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, error: "Selecciona una imagen." };
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("portfolio")
      .upload(path, file, { contentType: file.type, upsert: false });

    if (uploadError) return { ok: false, error: uploadError.message };

    const {
      data: { publicUrl },
    } = supabase.storage.from("portfolio").getPublicUrl(path);

    const { data: last } = await supabase
      .from("portfolio")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { error } = await supabase.from("portfolio").insert({
      title,
      category,
      image_url: publicUrl,
      alt: title,
      is_published: true,
      sort_order: (last?.sort_order ?? 0) + 1,
    });

    if (error) return { ok: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/admin/portfolio");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Error al subir." };
  }
}

export async function deletePortfolioItem(id: string, imageUrl: string): Promise<ActionResult> {
  try {
    const supabase = await requireUser();
    const { error } = await supabase.from("portfolio").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };

    const marker = "/storage/v1/object/public/portfolio/";
    const idx = imageUrl.indexOf(marker);
    if (idx !== -1) {
      const path = decodeURIComponent(imageUrl.slice(idx + marker.length));
      await supabase.storage.from("portfolio").remove([path]);
    }

    revalidatePath("/");
    revalidatePath("/admin/portfolio");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Error al eliminar." };
  }
}

export async function updatePortfolioOrder(id: string, direction: "up" | "down"): Promise<ActionResult> {
  try {
    const supabase = await requireUser();
    const { data: items, error } = await supabase
      .from("portfolio")
      .select("id, sort_order")
      .order("sort_order", { ascending: true });

    if (error || !items) return { ok: false, error: error?.message ?? "Sin datos." };

    const index = items.findIndex((item) => item.id === id);
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (index < 0 || swapWith < 0 || swapWith >= items.length) return { ok: true };

    const current = items[index];
    const neighbor = items[swapWith];
    await Promise.all([
      supabase.from("portfolio").update({ sort_order: neighbor.sort_order }).eq("id", current.id),
      supabase.from("portfolio").update({ sort_order: current.sort_order }).eq("id", neighbor.id),
    ]);

    revalidatePath("/");
    revalidatePath("/admin/portfolio");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Error al reordenar." };
  }
}

export async function updateInquiryStatus(id: string, status: "pending" | "attended"): Promise<ActionResult> {
  try {
    const supabase = await requireUser();
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Error al actualizar." };
  }
}

export async function updateSiteSettings(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await requireUser();
    const payload = {
      id: "main",
      instagram: String(formData.get("instagram") ?? "").trim(),
      facebook: String(formData.get("facebook") ?? "").trim(),
      tiktok: String(formData.get("tiktok") ?? "").trim(),
      whatsapp: String(formData.get("whatsapp") ?? "").trim(),
      phone_display: String(formData.get("phone_display") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      address: String(formData.get("address") ?? "").trim(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("site_settings").upsert(payload, { onConflict: "id" });
    if (error) {
      return {
        ok: false,
        error:
          error.message.includes("schema cache") || error.code === "PGRST205"
            ? "Falta crear las tablas. Ejecuta supabase/migration-site.sql en el SQL Editor de Supabase."
            : error.message,
      };
    }

    revalidatePath("/");
    revalidatePath("/admin/site");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Error al guardar." };
  }
}

export async function createHeroSlide(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await requireUser();
    const file = formData.get("file");
    const alt = String(formData.get("alt") ?? "").trim();
    const caption = String(formData.get("caption") ?? "").trim();

    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, error: "Selecciona una imagen para el slider." };
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `hero/${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("portfolio")
      .upload(path, file, { contentType: file.type, upsert: false });

    if (uploadError) return { ok: false, error: uploadError.message };

    const {
      data: { publicUrl },
    } = supabase.storage.from("portfolio").getPublicUrl(path);

    const { data: last } = await supabase
      .from("hero_slides")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { error } = await supabase.from("hero_slides").insert({
      image_url: publicUrl,
      alt: alt || "MOR Studio",
      caption,
      is_published: true,
      sort_order: (last?.sort_order ?? 0) + 1,
    });

    if (error) {
      return {
        ok: false,
        error:
          error.message.includes("schema cache") || error.code === "PGRST205"
            ? "Falta crear las tablas. Ejecuta supabase/migration-site.sql en el SQL Editor de Supabase."
            : error.message,
      };
    }

    revalidatePath("/");
    revalidatePath("/admin/site");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Error al subir." };
  }
}

export async function deleteHeroSlide(id: string, imageUrl: string): Promise<ActionResult> {
  try {
    const supabase = await requireUser();
    const { error } = await supabase.from("hero_slides").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };

    const marker = "/storage/v1/object/public/portfolio/";
    const idx = imageUrl.indexOf(marker);
    if (idx !== -1) {
      const path = decodeURIComponent(imageUrl.slice(idx + marker.length));
      await supabase.storage.from("portfolio").remove([path]);
    }

    revalidatePath("/");
    revalidatePath("/admin/site");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Error al eliminar." };
  }
}

export async function updateHeroOrder(id: string, direction: "up" | "down"): Promise<ActionResult> {
  try {
    const supabase = await requireUser();
    const { data: items, error } = await supabase
      .from("hero_slides")
      .select("id, sort_order")
      .order("sort_order", { ascending: true });

    if (error || !items) return { ok: false, error: error?.message ?? "Sin datos." };

    const index = items.findIndex((item) => item.id === id);
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (index < 0 || swapWith < 0 || swapWith >= items.length) return { ok: true };

    const current = items[index];
    const neighbor = items[swapWith];
    await Promise.all([
      supabase.from("hero_slides").update({ sort_order: neighbor.sort_order }).eq("id", current.id),
      supabase.from("hero_slides").update({ sort_order: current.sort_order }).eq("id", neighbor.id),
    ]);

    revalidatePath("/");
    revalidatePath("/admin/site");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Error al reordenar." };
  }
}
