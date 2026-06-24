import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Placeholder from "@/components/ui/Placeholder";

export const metadata = {
  title: "Polityka cookies",
  description:
    "Polityka plików cookies serwisu FREE HOME Nieruchomości — jakie pliki wykorzystujemy i w jakim celu.",
};

export default function PolitykaCookiesPage() {
  return (
    <>
      <PageHeader eyebrow="Dokumenty" title="Polityka cookies" />
      <section className="py-16">
        <Container className="max-w-3xl space-y-6 text-sm leading-relaxed text-cream/75">
          <Placeholder>
            Pełna treść polityki cookies do uzupełnienia. Powinna opisywać
            rodzaje plików (niezbędne, analityczne, marketingowe) oraz sposób
            zarządzania zgodą.
          </Placeholder>
          <p>
            Serwis wykorzystuje pliki cookies w celu zapewnienia poprawnego
            działania strony oraz analizy ruchu. Możesz zarządzać zgodą w
            ustawieniach przeglądarki.
          </p>
        </Container>
      </section>
    </>
  );
}
