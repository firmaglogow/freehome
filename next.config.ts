import type { NextConfig } from "next";

// basePath sterowany zmienną środowiskową, żeby ten sam kod budował się dla:
//  • GitHub Pages  → https://firmaglogow.github.io/freehome/  (prefiks "/freehome")
//  • własna domena → https://freehome.com.pl/                 (root, prefiks pusty)
// Domyślnie "/freehome" (zachowuje obecny deploy na GH Pages).
// Build na własną domenę: ustaw NEXT_PUBLIC_BASE_PATH="" (pusty string).
// ⚠️ Wartość jest „wpalana" w bundle w czasie buildu i nie da się jej zmienić bez przebudowy.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/freehome";

const nextConfig: NextConfig = {
  // Statyczny eksport — generuje folder `out/` do wrzucenia na GitHub Pages
  // (lub dowolny hosting plików statycznych). Bez serwera Node.
  output: "export",
  // GitHub Pages nie obsługuje optymalizacji obrazów Next.js.
  // Własny loader dokłada basePath do każdego obrazka,
  // bo next/image nie robi tego automatycznie (patrz image-loader.ts).
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
  // Adresy z ukośnikiem na końcu (/oferty/) → poprawne odświeżanie podstron.
  trailingSlash: true,
  // Pomijamy klucz basePath, gdy prefiks jest pusty (własna domena w root).
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
