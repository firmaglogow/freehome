import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import { reviews, site } from "@/lib/site";

export const metadata = {
  title: "Opinie",
  description: `Ponad ${site.reviewsCount} opinii klientów FREE HOME Nieruchomości. Zobacz, co mówią o współpracy z nami.`,
};

export default function OpiniePage() {
  return (
    <>
      <PageHeader
        eyebrow="Opinie"
        title="Co mówią nasi klienci"
        subtitle={`Ponad ${site.reviewsCount} opinii i średnia 5,0. Zaufanie, na które pracujemy każdego dnia.`}
        image="/hero/opinie.jpg"
      />

      <section className="py-16 sm:py-20">
        <Container>
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
