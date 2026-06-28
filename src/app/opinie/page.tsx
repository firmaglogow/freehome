import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import GoogleMark from "@/components/ui/GoogleMark";
import { reviews, site } from "@/lib/site";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Opinie",
  description: `Ponad ${site.reviewsCount} opinii klientów FREE HOME Nieruchomości. Zobacz, co mówią o współpracy z nami.`,
  path: "/opinie",
  ogImage: "/og/opinie.jpg",
});

// Dane strukturalne opinii (Review + AggregateRating) — pomagają Google wyświetlić
// gwiazdki w wynikach i wzmacniają SEO treścią opinii klientów.
const reviewsJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.fullName,
  url: `${site.url}/opinie`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    reviewCount: String(site.reviewsCount),
  },
  review: reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    reviewBody: r.text,
  })),
};

export default function OpiniePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Opinie", path: "/opinie" }])} />
      <JsonLd data={reviewsJsonLd} />
      <PageHeader
        eyebrow="Opinie"
        title="Co mówią nasi klienci"
        subtitle={`Ponad ${site.reviewsCount} opinii i średnia 5,0. Zaufanie, na które pracujemy każdego dnia.`}
        image="/hero/opinie.webp"
      />

      <section className="py-16 sm:py-20">
        <Container>
          <Link
            href="/dla-klienta"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-forest-800 px-4 py-2 text-sm font-semibold text-gold-400 transition hover:border-gold-500/50 hover:bg-forest-600"
          >
            <span className="text-base leading-none">←</span> Wróć do: Dla klienta
          </Link>

          {/* Bezpośredni dostęp do wizytówki Google — klient może sam zobaczyć
              komplet opinii i ocenę u źródła. */}
          <a
            href={site.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-10 flex flex-col items-center gap-5 rounded-2xl border border-gold-500/20 bg-forest-800 p-6 text-center transition hover:border-gold-500/40 hover:bg-forest-800/80 sm:flex-row sm:justify-between sm:text-left"
          >
            <span className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white ring-1 ring-gold-500/20">
                <GoogleMark className="h-8 w-8" />
              </span>
              <span>
                <span className="flex items-center justify-center gap-2 sm:justify-start">
                  <span className="font-display text-2xl leading-none text-cream">
                    5,0
                  </span>
                  <span className="text-gold-400" aria-label="5 na 5 gwiazdek">
                    ★★★★★
                  </span>
                </span>
                <span className="mt-1 block text-sm text-cream/70">
                  {site.reviewsCount}+ opinii na wizytówce Google
                </span>
              </span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-forest-950">
              Zobacz opinie w Google ↗
            </span>
          </a>

          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {reviews.map((r, i) => (
              <figure
                key={i}
                className="mb-6 break-inside-avoid rounded-2xl border border-gold-500/15 bg-forest-800 p-6"
              >
                <div className="text-gold-400" aria-label="5 na 5 gwiazdek">
                  ★★★★★
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-cream/80">
                  „{r.text}"
                </blockquote>
                <figcaption className="mt-4 flex items-center justify-between gap-2 text-sm font-semibold text-cream">
                  <span>— {r.name}</span>
                  {r.source && (
                    <span className="text-xs font-normal text-cream/60">
                      {r.source}
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-cream/50">
            Wszystkie opinie pochodzą z naszej wizytówki Google (średnia 5,0).
          </p>
        </Container>
      </section>
    </>
  );
}
