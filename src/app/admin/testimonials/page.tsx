import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";
import { getAllTestimonials } from "@/lib/data/queries";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";

export default async function AdminTestimonialsPage() {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (!user) redirect("/admin/login");

  const items = await getAllTestimonials();

  return (
    <AdminShell email={user.email}>
      <h1 className="font-serif text-4xl">Testimonios</h1>
      <p className="mt-2 mb-8 text-sm text-muted">
        Prueba social en la web. Puedes añadir una versión en inglés para el sitio bilingüe.
      </p>
      <TestimonialsManager items={items} />
    </AdminShell>
  );
}
