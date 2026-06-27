import PageHeader from "@/components/ui/PageHeader";
import ContactSection from "@/components/home/ContactSection";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Skontaktuj się z FREE HOME Nieruchomości — biuro przy ul. Grodzkiej 18 w Głogowie. Telefon, e-mail i formularz.",
  path: "/kontakt",
  ogImage: "/og/kontakt.jpg",
});

export default function KontaktPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Kontakt", path: "/kontakt" }])} />
      <PageHeader
        eyebrow="Kontakt"
        title="Porozmawiajmy"
        subtitle="Zadzwoń, napisz lub wpadnij do biura. Odpowiadamy szybko."
        image="/hero/kontakt.jpg"
      />
      <ContactSection />
    </>
  );
}
