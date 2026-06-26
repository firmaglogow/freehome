import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Generuje statyczny /robots.txt podczas `next build` (output: "export").
// Zezwala na pełną indeksację i wskazuje robotom mapę strony.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
