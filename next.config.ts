import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statyczny eksport — generuje folder `out/` do wrzucenia na GitHub Pages
  // (lub dowolny hosting plików statycznych). Bez serwera Node.
  output: "export",
  // GitHub Pages nie obsługuje optymalizacji obrazów Next.js — serwujemy je 1:1.
  images: { unoptimized: true },
  // Adresy z ukośnikiem na końcu (/oferty/) → poprawne odświeżanie podstron na GH Pages.
  trailingSlash: true,
  // Strona działa pod adresem https://firmaglogow.github.io/freehome/ (repo "freehome"),
  // więc wszystkie linki i assety muszą mieć prefiks "/freehome".
  // ⚠️ Jeśli kiedyś podepniesz własną domenę (np. freehome.com.pl), usuń te dwie linie.
  basePath: "/freehome",
};

export default nextConfig;
