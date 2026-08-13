import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { PackagesManager } from "@/components/admin/packages-manager";
import { getAllPackages } from "@/lib/data/queries";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";

export default async function AdminPackagesPage() {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (!user) redirect("/admin/login");

  const packages = await getAllPackages();

  return (
    <AdminShell email={user.email}>
      <h1 className="font-serif text-4xl">Paquetes y precios</h1>
      <p className="mt-2 mb-8 text-sm text-muted">
        Los cambios se reflejan en la web al guardar. Desactiva un paquete para ocultarlo sin
        borrarlo.
      </p>
      <PackagesManager packages={packages} />
    </AdminShell>
  );
}
