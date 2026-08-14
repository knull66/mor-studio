"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Camera, Globe, LayoutDashboard, LogOut, MessageSquare, Package, Quote } from "lucide-react";
import { signOut } from "@/app/actions";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/admin/site", label: "Sitio y slider", icon: Globe },
  { href: "/admin/portfolio", label: "Portafolio", icon: Camera },
  { href: "/admin/packages", label: "Paquetes", icon: Package },
  { href: "/admin/testimonials", label: "Testimonios", icon: Quote },
  { href: "/admin/inquiries", label: "Solicitudes", icon: MessageSquare },
];

export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-full bg-sand">
      <div className="mx-auto flex min-h-full max-w-7xl flex-col lg:flex-row">
        <aside className="border-b border-sand-deep bg-cream px-5 py-6 lg:w-64 lg:border-r lg:border-b-0">
          <Link href="/" className="font-serif text-2xl tracking-[0.1em]">
            MOR Studio
          </Link>
          <p className="mt-1 text-[0.6rem] uppercase tracking-[0.28em] text-taupe-dark">
            Panel admin
          </p>
          <nav className="mt-8 flex gap-2 overflow-x-auto lg:flex-col">
            {LINKS.map((link) => {
              const active =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap px-3 py-2 text-sm",
                    active ? "bg-charcoal text-cream" : "text-ink/80 hover:bg-sand",
                  )}
                >
                  <link.icon className="size-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 hidden text-xs text-muted lg:block">{email}</div>
          <button
            type="button"
            className="mt-4 flex items-center gap-2 text-sm text-muted hover:text-ink"
            onClick={async () => {
              await signOut();
              router.push("/admin/login");
              router.refresh();
            }}
          >
            <LogOut className="size-4" />
            Salir
          </button>
        </aside>
        <div className="flex-1 px-5 py-8 sm:px-8">{children}</div>
      </div>
    </div>
  );
}
