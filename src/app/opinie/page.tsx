import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import { reviews, site } from "@/lib/site";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Opinie",
  description: `Ponad ${site.reviewsCount} opinii klientów FREE HOME Nieruchomości. Zobacz, co mówią o współpracy z nami.`,
  path: "/opinie",
  ogImage: "/og/opinie.jpg",
});

export default function OpiniePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Opinie", path: "/opinie" }])} />
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
                    <span className="text-xs font-normal text-cream/40">
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
