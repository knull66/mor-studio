import { redirect } from "next/navigation";
import { Camera, MessageSquare, Package } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminStats } from "@/lib/data/queries";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";

export default async function AdminHomePage() {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (!user) redirect("/admin/login");

  const stats = await getAdminStats();

  const cards = [
    { label: "Solicitudes pendientes", value: stats.pending, icon: MessageSquare },
    { label: "Fotos en portafolio", value: stats.portfolio, icon: Camera },
    { label: "Paquetes activos", value: stats.packages, icon: Package },
  ];

  return (
    <AdminShell email={user.email}>
      <h1 className="font-serif text-4xl">Resumen</h1>
      <p className="mt-2 text-sm text-muted">
        Contenido público, precios y citas en un solo lugar.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <article key={card.label} className="border border-sand-deep bg-cream p-6">
            <card.icon className="size-5 text-taupe-dark" />
            <p className="mt-4 font-serif text-4xl">{card.value}</p>
            <p className="mt-1 text-sm text-muted">{card.label}</p>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
