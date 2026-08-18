import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { isSiteEnabled } from "@/lib/site-enabled";

export default function robots(): MetadataRoute.Robots {
  if (!isSiteEnabled()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/mantenimiento"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
