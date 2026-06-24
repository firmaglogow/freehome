import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Placeholder from "@/components/ui/Placeholder";
import { site } from "@/lib/site";

export const metadata = {
  title: "Opinie",
  description: `Ponad ${site.reviewsCount} opinii klientów FREE HOME Nieruchomości. Zobacz, co mówią o współpracy z nami.`,
};

const placeholderReviews = [
  { name: "[Imię klienta]", text: "[DO UZUPEŁNIENIA — treść opinii z Google.]" },
  { name: "[Imię klienta]", text: "[DO UZUPEŁNIENIA — treść opinii z Google.]" },
  { name: "[Imię klienta]", text: "[DO UZUPEŁNIENIA — treść opinii z Google.]" },
  { name: "[Imię klienta]", text: "[DO UZUPEŁNIENIA — treść opinii z Google.]" },
];

export default function OpiniePage() {
  return (
    <>
      <PageHeader
        eyebrow="Opinie"
        title="Co mówią nasi klienci"
        subtitle={`Ponad ${site.reviewsCount} opinii i średnia 5,0. Zaufanie, na które pracujemy każdego dnia.`}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <Placeholder>
            Sekcja docelowo zaciągnie najnowsze opinie z Google (widżet lub API).
            Poniżej układ przykładowy.
          </Placeholder>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {placeholderReviews.map((r, i) => (
              <Reveal key={i} delay={i * 70}>
                <figure className="h-full rounded-2xl border border-gold-500/15 bg-forest-800 p-6">
                  <div className="text-gold-400">★★★★★</div>
                  <blockquote className="mt-3 text-sm leading-relaxed text-cream/80">
                    {r.text}
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-cream">
                    {r.name}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
