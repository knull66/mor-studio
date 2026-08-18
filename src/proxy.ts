import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function siteIsEnabled() {
  // Leer process.env aquí: el bundler de Proxy solo inyecta vars usadas en este archivo.
  const value = process.env.SITE_ENABLED?.trim().toLowerCase();
  if (!value) return true;
  return !["0", "false", "off", "no", "disabled"].includes(value);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!siteIsEnabled()) {
    if (
      pathname.startsWith("/api/stripe/webhook") ||
      pathname === "/robots.txt" ||
      pathname === "/sitemap.xml"
    ) {
      return NextResponse.next({ request });
    }
    if (pathname === "/mantenimiento") {
      return NextResponse.next({ request });
    }
    const maintenanceUrl = request.nextUrl.clone();
    maintenanceUrl.pathname = "/mantenimiento";
    maintenanceUrl.search = "";
    const response = NextResponse.rewrite(maintenanceUrl);
    response.headers.set("Retry-After", "86400");
    return response;
  }

  if (pathname === "/mantenimiento") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  let supabaseResponse = NextResponse.next({ request });
  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname.startsWith("/admin/login");

  if (!isAdmin) return supabaseResponse;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    if (!isLogin) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/admin/login";
      return NextResponse.redirect(redirectUrl);
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isLogin) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin/login";
    return NextResponse.redirect(redirectUrl);
  }

  if (user && isLogin) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin";
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/",
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
