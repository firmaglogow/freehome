import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import OffersExplorer from "@/components/oferty/OffersExplorer";

export const metadata = {
  title: "Oferty nieruchomości",
  description:
    "Aktualne oferty sprzedaży i wynajmu — domy, mieszkania i działki w Głogowie, Polkowicach i okolicach. FREE HOME Nieruchomości.",
};

export default function OfertyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Oferty"
        title="Znajdź swoją nieruchomość"
        subtitle="Domy, mieszkania i działki w Głogowie i okolicach. Filtruj po lokalizacji, cenie i metrażu."
      />
      <section className="py-12 sm:py-16">
        <Container>
          <OffersExplorer />
        </Container>
      </section>
    </>
  );
}
