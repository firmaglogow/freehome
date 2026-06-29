import type { MetadataRoute } from "next";
import { site, people, services } from "@/lib/site";
import { offers } from "@/lib/offers";
import { developments } from "@/lib/developments";
import { posts } from "@/lib/blog";

// Wymuszone statyczne generowanie — przy output: "export" trasy metadanych
// muszą być w pełni statyczne (analogicznie do robots.ts).
export const dynamic = "force-static";

// Mapa strony generowana podczas `next build` (output: "export") → statyczny
// /sitemap.xml. Łączy strony statyczne z dynamicznymi (oferty, zespół, usługi,
// inwestycje, blog). Adres bazowy z site.url (sterowany NEXT_PUBLIC_SITE_URL).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const url = (path: string) => (path === "/" ? `${base}/` : `${base}${path}/`);

  // Strony statyczne — priorytet wg ważności dla biznesu.
  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/oferty", priority: 0.9, changeFrequency: "daily" },
    { path: "/rynek-pierwotny", priority: 0.8, changeFrequency: "weekly" },
    { path: "/uslugi", priority: 0.7, changeFrequency: "monthly" },
    { path: "/o-nas", priority: 0.6, changeFrequency: "monthly" },
    { path: "/dlaczego-my", priority: 0.7, changeFrequency: "monthly" },
    { path: "/ludzie", priority: 0.6, changeFrequency: "monthly" },
    { path: "/dla-klienta", priority: 0.6, changeFrequency: "monthly" },
    { path: "/opinie", priority: 0.6, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/wycena", priority: 0.7, changeFrequency: "monthly" },
    { path: "/praca", priority: 0.5, changeFrequency: "monthly" },
    { path: "/kontakt", priority: 0.7, changeFrequency: "monthly" },
    { path: "/regulamin", priority: 0.2, changeFrequency: "yearly" },
    { path: "/polityka-prywatnosci", priority: 0.2, changeFrequency: "yearly" },
    { path: "/polityka-cookies", priority: 0.2, changeFrequency: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: url(r.path),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const offerEntries: MetadataRoute.Sitemap = offers.map((o) => ({
    url: url(`/oferty/${o.id}`),
    lastModified: o.updatedAt ? new Date(o.updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const developmentEntries: MetadataRoute.Sitemap = developments.map((d) => ({
    url: url(`/rynek-pierwotny/${d.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
    url: url(`/uslugi/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const peopleEntries: MetadataRoute.Sitemap = people.map((p) => ({
    url: url(`/ludzie/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: url(`/blog/${p.slug}`),
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...offerEntries,
    ...developmentEntries,
    ...serviceEntries,
    ...peopleEntries,
    ...blogEntries,
  ];
}
