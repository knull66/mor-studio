import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "@/lib/utils";

/** Cliente sin cookies: inserta solicitudes desde el webhook de Stripe. */
export function createServiceClient() {
  if (!isSupabaseConfigured()) return null;

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) return null;

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
