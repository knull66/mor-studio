import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { TeamManager } from "@/components/admin/team-manager";
import { getAllTeamMembers } from "@/lib/data/queries";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";

export default async function AdminTeamPage() {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (!user) redirect("/admin/login");

  const members = await getAllTeamMembers();

  return (
    <AdminShell email={user.email}>
      <h1 className="font-serif text-4xl">Equipo</h1>
      <p className="mt-2 mb-8 text-sm text-muted">
        Textos y fotos de Elisabeth, y de quien se sume al estudio. Cada perfil puede tener versión
        en inglés y hasta dos fotos.
      </p>
      <TeamManager members={members} />
    </AdminShell>
  );
}
