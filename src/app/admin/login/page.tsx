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
            El panel usa Supabase Auth. Copia <code className="text-ink">.env.example</code> a
            <code className="text-ink"> .env.local</code>, pega tu URL y anon key, ejecuta{" "}
            <code className="text-ink">supabase/schema.sql</code> en el SQL Editor y crea un
            usuario en Authentication.
          </p>
        ) : (
          <LoginForm />
        )}
        <a href="/" className="mt-8 block text-center text-sm text-muted hover:text-ink">
          ← Volver al sitio
        </a>
      </div>
    </div>
  );
}
