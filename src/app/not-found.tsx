import Link from "next/link";
import Container from "@/components/ui/Container";

export const metadata = {
  title: "Strona nie znaleziona",
  description: "Nie znaleźliśmy strony, której szukasz.",
};

// Globalna strona 404 — renderowana w obrębie root layoutu (Header + Footer),
// w klimacie marki (ciemna zieleń + złoto, typografia Cinzel/Cormorant).
// Przy output: "export" Next generuje statyczny /404.html.
export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden py-24">
      {/* Złota poświata — zielono-złoty klimat marki */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(197,164,78,0.12),transparent_60%)]" />
      <Container className="text-center">
        <p className="eyebrow">Błąd 404</p>
        <p className="mt-6 font-display text-7xl font-bold leading-none text-gold-400 sm:text-8xl">
          404
        </p>
        <h1 className="mx-auto mt-6 max-w-xl font-display text-3xl text-cream sm:text-4xl">
          Ups, ta strona się wyprowadziła
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-cream/70">
          Nie znaleźliśmy strony, której szukasz. Może została przeniesiona albo
          link jest nieaktualny. Wróć na stronę główną lub zobacz nasze oferty.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Link
            href="/"
            className="rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-forest-950 transition hover:bg-gold-400"
          >
            Strona główna
          </Link>
          <Link
            href="/oferty"
            className="rounded-full border border-gold-500/50 px-8 py-3.5 text-sm font-semibold text-cream transition hover:border-gold-500 hover:bg-gold-500/10"
          >
            Zobacz oferty
          </Link>
          <Link
            href="/kontakt"
            className="rounded-full border border-gold-500/50 px-8 py-3.5 text-sm font-semibold text-cream transition hover:border-gold-500 hover:bg-gold-500/10"
          >
            Kontakt
          </Link>
        </div>
      </Container>
    </section>
  );
}
