"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "@/app/actions";

export function LoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const result = await signIn(new FormData(event.currentTarget));
    setPending(false);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-4">
      <label className="text-xs uppercase tracking-[0.16em] text-muted">
        Correo
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className="mt-2 w-full border border-sand-deep bg-white px-4 py-3 text-sm outline-none focus:border-taupe"
        />
      </label>
      <label className="text-xs uppercase tracking-[0.16em] text-muted">
        Contraseña
        <input
          required
          type="password"
          name="password"
          autoComplete="current-password"
          className="mt-2 w-full border border-sand-deep bg-white px-4 py-3 text-sm outline-none focus:border-taupe"
        />
      </label>
      <button type="submit" disabled={pending} className="solid-btn mt-2">
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
