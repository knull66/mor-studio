import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { PortfolioManager } from "@/components/admin/portfolio-manager";
import { getAllPortfolio } from "@/lib/data/queries";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";

export default async function AdminPortfolioPage() {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (!user) redirect("/admin/login");

  const items = await getAllPortfolio();

  return (
    <AdminShell email={user.email}>
      <h1 className="font-serif text-4xl">Portafolio</h1>
      <p className="mt-2 mb-8 text-sm text-muted">
        Sube, ordena y elimina fotografías. Se publican en la galería del sitio.
      </p>
      <PortfolioManager items={items} />
    </AdminShell>
  );
}
