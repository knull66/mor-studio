import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { InquiriesManager } from "@/components/admin/inquiries-manager";
import { getInquiries } from "@/lib/data/queries";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";

export default async function AdminInquiriesPage() {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (!user) redirect("/admin/login");

  const inquiries = await getInquiries();

  return (
    <AdminShell email={user.email}>
      <h1 className="font-serif text-4xl">Solicitudes</h1>
      <p className="mt-2 mb-8 text-sm text-muted">
        Contactos del formulario público. Márcalos como atendidos cuando respondas.
      </p>
      <InquiriesManager inquiries={inquiries} />
    </AdminShell>
  );
}
