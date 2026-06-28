import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import { faq } from "@/lib/faq";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Najczęstsze pytania (FAQ)",
  description:
    "Najczęstsze pytania o kupno i sprzedaż nieruchomości w Głogowie: prowizja, koszty zakupu (PCC, notariusz), potrzebne dokumenty, umowa na wyłączność, kredyt hipoteczny. Odpowiada FREE HOME Nieruchomości.",
  path: "/faq",
});

// Dane strukturalne FAQPage — dają szansę na rozszerzony wynik (rich snippets)
// w Google. Budowane z tej samej tablicy, którą wyświetla akordeon poniżej,
// więc treść widoczna i treść dla wyszukiwarki są zawsze spójne.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "FAQ", path: "/faq" }])} />
      <JsonLd data={faqJsonLd} />
      <PageHeader
        eyebrow="FAQ"
        title="Najczęściej zadawane pytania"
        subtitle="Kupno, sprzedaż, koszty, dokumenty, kredyt — odpowiadamy na pytania, które najczęściej słyszymy od klientów w Głogowie."
        image="/hero/klucze-dom.webp"
      />

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Link
            href="/dla-klienta"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-forest-800 px-4 py-2 text-sm font-semibold text-gold-400 transition hover:border-gold-500/50 hover:bg-forest-600"
          >
            <span className="text-base leading-none">←</span> Wróć do: Dla klienta
          </Link>

          {/* Akordeon na natywnym <details> — działa bez JS, treść jest w kodzie
              strony (dobre dla SEO), w pełni obsługiwany klawiaturą i czytnikami. */}
          <div className="space-y-4">
            {faq.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-gold-500/15 bg-forest-800 transition open:border-gold-500/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-6 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-400 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-lg text-cream transition group-open:text-gold-300">
                    {f.q}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-500/30 text-gold-400 transition group-open:rotate-180">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="-mt-1 px-6 pb-6 text-sm leading-relaxed text-cream/75">
                  {f.a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-gold-500/15 bg-forest-800 p-8 text-center">
            <p className="text-cream/80">
              Nie znalazłeś odpowiedzi na swoje pytanie?
            </p>
            <Link
              href="/kontakt"
              className="mt-4 inline-block rounded-full bg-gold-500 px-7 py-3 text-sm font-semibold text-forest-950 transition hover:bg-gold-400"
            >
              Zadzwoń lub napisz do nas
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
