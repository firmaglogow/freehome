// Lekka sanityzacja HTML opisu z Esti. Źródło (CRM agencji) jest zaufane, ale
// renderujemy przez dangerouslySetInnerHTML, więc dla bezpieczeństwa zostawiamy
// wyłącznie nieszkodliwe tagi formatujące i USUWAMY wszystkie atrybuty
// (żadnych on*, style, href itp.). Bez żadnej zależności npm — działa też przy
// statycznym buildzie na hostingu.
const ALLOWED_TAGS = new Set([
  "b",
  "strong",
  "i",
  "em",
  "u",
  "br",
  "p",
  "ul",
  "ol",
  "li",
  "span",
]);

export function sanitizeOfferHtml(html: string | null | undefined): string {
  if (!html) return "";

  let out = html;

  // 1) Wytnij całe bloki <script>/<style> razem z zawartością.
  out = out.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, "");

  // 2) Przejdź po wszystkich tagach: dozwolone zostają (bez atrybutów),
  //    pozostałe są usuwane (ich treść tekstowa zostaje).
  out = out.replace(
    /<\/?([a-zA-Z0-9]+)\b[^>]*?(\/?)>/g,
    (match, tag: string, selfClose: string) => {
      const name = tag.toLowerCase();
      if (!ALLOWED_TAGS.has(name)) return "";
      if (match.startsWith("</")) return `</${name}>`;
      if (name === "br") return "<br />";
      return selfClose ? `<${name} />` : `<${name}>`;
    }
  );

  return out.trim();
}
