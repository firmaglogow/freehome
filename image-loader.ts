// Własny loader obrazów dla eksportu statycznego (GitHub Pages).
// next/image NIE dokłada automatycznie basePath do obrazków
// (patrz docs: next.config > basePath > Images), więc robimy to tutaj.
// Dzięki temu nie trzeba zmieniać <Image src=...> w żadnym komponencie.
//
// ⚠️ Prefiks musi być taki sam jak `basePath` w next.config.ts.
// Sterowany tą samą zmienną: domyślnie "/freehome" (GitHub Pages),
// a dla własnej domeny w root buduj z NEXT_PUBLIC_BASE_PATH="" (pusty string).
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/freehome";

export default function imageLoader({ src }: { src: string }): string {
  // Zewnętrzne adresy (http/https) zostawiamy bez zmian.
  if (/^https?:\/\//.test(src)) return src;
  return `${BASE_PATH}${src}`;
}
