// Własny loader obrazów dla eksportu statycznego (GitHub Pages).
// next/image NIE dokłada automatycznie basePath do obrazków
// (patrz docs: next.config > basePath > Images), więc robimy to tutaj.
// Dzięki temu nie trzeba zmieniać <Image src=...> w żadnym komponencie.
//
// ⚠️ Prefiks musi być taki sam jak `basePath` w next.config.ts.
// Jeśli kiedyś podepniesz własną domenę (strona w root), ustaw BASE_PATH = "".
const BASE_PATH = "/freehome";

export default function imageLoader({ src }: { src: string }): string {
  // Zewnętrzne adresy (http/https) zostawiamy bez zmian.
  if (/^https?:\/\//.test(src)) return src;
  return `${BASE_PATH}${src}`;
}
