import PageHeader from "@/components/ui/PageHeader";
import ContactSection from "@/components/home/ContactSection";

export const metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj się z FREE HOME Nieruchomości — biuro przy ul. Grodzkiej 18 w Głogowie. Telefon, e-mail i formularz.",
};

export default function KontaktPage() {
  return (
    <>
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
