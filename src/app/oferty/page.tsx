import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import OffersExplorer from "@/components/oferty/OffersExplorer";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Oferty nieruchomości",
  description:
    "Aktualne oferty sprzedaży — domy, mieszkania i działki w Głogowie, Polkowicach i okolicach. FREE HOME Nieruchomości.",
  path: "/oferty",
  ogImage: "/og/oferty.jpg",
});

export default function OfertyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Oferty", path: "/oferty" }])} />
      <PageHeader
        eyebrow="Oferty"
        title="Znajdź swoją nieruchomość"
        subtitle="Domy, mieszkania i działki w Głogowie i okolicach. Filtruj po lokalizacji, cenie i metrażu."
        image="/hero/oferty.jpg"
      />
      <section className="py-12 sm:py-16">
        <Container>
          <OffersExplorer />
        </Container>
      </section>
    </>
  );
}
