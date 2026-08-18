import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { isSiteEnabled } from "@/lib/site-enabled";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isSiteEnabled()) return [];

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
