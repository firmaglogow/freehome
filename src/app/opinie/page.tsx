import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import ReviewsCarousel from "@/components/opinie/ReviewsCarousel";
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
      />

      <section className="py-16 sm:py-20">
        <Container>
          <ReviewsCarousel reviews={reviews} />

          <p className="mt-10 text-center text-sm text-cream/50">
            Wszystkie opinie pochodzą z naszej wizytówki Google (średnia 5,0).
          </p>
        </Container>
      </section>
    </>
  );
}
