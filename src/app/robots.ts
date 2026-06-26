import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Wymuszone statyczne generowanie — przy output: "export" trasy metadanych
// muszą być w pełni statyczne (inaczej build zgłasza błąd dla /robots.txt).
export const dynamic = "force-static";

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
