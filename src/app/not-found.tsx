import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-taupe-dark">404</p>
      <h1 className="mt-4 font-serif text-5xl">This page does not exist</h1>
      <p className="mt-2 font-serif text-3xl text-muted">Esta página no existe</p>
      <Link href="/" className="outlined-btn mt-8 border-ink text-ink">
        Home / Inicio
      </Link>
    </div>
  );
}
