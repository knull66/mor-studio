import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { SiteManager } from "@/components/admin/site-manager";
import { getAllHeroSlides, getSiteSettings } from "@/lib/data/queries";
import { DEFAULT_HERO_SLIDES } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";

export default async function AdminSitePage() {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (!user) redirect("/admin/login");

  const [settings, dbSlides] = await Promise.all([getSiteSettings(), getAllHeroSlides()]);
  const slides = dbSlides.length ? dbSlides : DEFAULT_HERO_SLIDES;

  return (
    <AdminShell email={user.email}>
      <h1 className="font-serif text-4xl">Sitio web</h1>
      <p className="mt-2 mb-8 text-sm text-muted">
        Redes sociales, contacto y fotografías del slider de la página de inicio.
      </p>
      <SiteManager settings={settings} slides={slides} />
    </AdminShell>
  );
}
