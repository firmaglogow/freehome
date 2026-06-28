import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

// basePath sterowany zmienną środowiskową, żeby ten sam kod budował się dla:
//  • GitHub Pages  → https://firmaglogow.github.io/freehome/  (prefiks "/freehome")
//  • własna domena → https://freehome.com.pl/                 (root, prefiks pusty)
// Domyślnie "/freehome" (zachowuje obecny deploy na GH Pages).
// Build na własną domenę: ustaw NEXT_PUBLIC_BASE_PATH="" (pusty string).
// ⚠️ Wartość jest „wpalana" w bundle w czasie buildu i nie da się jej zmienić bez przebudowy.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/freehome";

// Patrz komentarz przy `turbopack` niżej. Zwraca katalog projektu, chyba że
// node_modules jest symlinkiem uciekającym poza projekt (CloudLinux nodevenv) —
// wtedy root musi być wyżej, bo Turbopack nie podąża za takim symlinkiem.
function turbopackRoot(): string {
  const projectDir = process.cwd();
  try {
    if (fs.lstatSync(path.join(projectDir, "node_modules")).isSymbolicLink()) {
      return path.join(projectDir, "..");
    }
  } catch {
    // brak node_modules (np. lint bez instalacji) — projekt jako root
  }
  return projectDir;
}

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
  // Turbopack: root MUSI wskazywać katalog projektu (z prawdziwym node_modules).
  // Gdy root pokazuje wyżej (np. na katalog nadrzędny), Turbopack kluczuje
  // manifest komponentów klienta względem złego katalogu → przy `output: export`
  // client component (useState/useContext) renderuje się jak server component
  // z pustym dispatcherem Reacta i prerender wywala się:
  // „Cannot read properties of null (reading 'useState')".
  // Wyjątek: CloudLinux nodevenv potrafi podlinkować node_modules symlinkiem
  // uciekającym poza projekt — Turbopack odmawia wtedy podążania za nim, więc
  // TYLKO w tym przypadku cofamy root do katalogu nadrzędnego.
  turbopack: { root: turbopackRoot() },
  // Limit liczby workerów fazy „Generating static pages" (statyczny eksport).
  // Domyślnie Next bierze (liczba rdzeni − 1) = 13 na tym hoście (14 rdzeni),
  // a każdy worker ładuje pełne dane ofert → suma pamięci przekracza UKRYTY
  // limit LVE konta → kernel ubija build (SIGKILL/OOM, faza ~48/65 stron).
  // `taskset` ogranicza CPU, ale NIE liczbę procesów — dopiero ten klucz ją tnie.
  // 2 workery = bezpieczny kompromis (równoległość + ~6,5× mniej pamięci szczytowej).
  experimental: { cpus: 2 },
  // Pomijamy klucz basePath, gdy prefiks jest pusty (własna domena w root).
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
