import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";
import { isSupabaseConfigured } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Acceso administrativo",
};

export default function LoginPage() {
  const configured = isSupabaseConfigured();

  return (
    <div className="flex min-h-full items-center justify-center bg-cream px-6 py-16">
      <div className="w-full max-w-md border border-sand-deep bg-white p-8 sm:p-10">
        <p className="font-serif text-center text-3xl tracking-[0.12em]">MOR Studio</p>
        <p className="mt-2 text-center text-[0.62rem] uppercase tracking-[0.28em] text-taupe-dark">
          Acceso administrativo
        </p>
        {!configured ? (
          <p className="mt-8 text-sm leading-relaxed text-muted">
            Falta configurar Supabase en <code className="text-ink">.env.local</code>. Reinicia
            el servidor y vuelve a intentar.
          </p>
        ) : null}
        <LoginForm />
        <p className="mt-6 text-center text-xs leading-relaxed text-muted">
          En este computador: <span className="text-ink">localhost:3000/admin/login</span>.
          Desde otro lugar, usa la URL pública del sitio + <span className="text-ink">/admin/login</span>.
        </p>
        <a href="/" className="mt-6 block text-center text-sm text-muted hover:text-ink">
          ← Volver al sitio
        </a>
      </div>
    </div>
  );
}
