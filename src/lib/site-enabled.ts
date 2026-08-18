/** Kill switch de Vercel. No está en el admin: solo SITE_ENABLED en el entorno. */
export function isSiteEnabled() {
  const value = process.env.SITE_ENABLED?.trim().toLowerCase();
  if (!value) return true;
  return !["0", "false", "off", "no", "disabled"].includes(value);
}
