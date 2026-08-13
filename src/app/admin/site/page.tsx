import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { SiteManager } from "@/components/admin/site-manager";
import { getAllBeforeAfterPairs, getAllHeroSlides, getAllInstagramStrip, getSiteSettings } from "@/lib/data/queries";
import { DEFAULT_BEFORE_AFTER, DEFAULT_HERO_SLIDES, DEFAULT_INSTAGRAM_STRIP } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";

export default async function AdminSitePage() {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (!user) redirect("/admin/login");

  const [settings, dbSlides, dbPairs, dbStrip] = await Promise.all([
    getSiteSettings(),
    getAllHeroSlides(),
    getAllBeforeAfterPairs(),
    getAllInstagramStrip(),
  ]);
  const slides = dbSlides.length ? dbSlides : DEFAULT_HERO_SLIDES;
  const beforeAfter = dbPairs.length ? dbPairs : DEFAULT_BEFORE_AFTER;
  const instagramStrip = dbStrip.length ? dbStrip : DEFAULT_INSTAGRAM_STRIP;

  return (
    <AdminShell email={user.email}>
      <h1 className="font-serif text-4xl">Sitio web</h1>
      <p className="mt-2 mb-8 text-sm text-muted">
        Redes, contacto, slider, antes y después, y la tira de fotos de Instagram.
      </p>
      <SiteManager
        settings={settings}
        slides={slides}
        beforeAfter={beforeAfter}
        instagramStrip={instagramStrip}
      />
    </AdminShell>
  );
}
