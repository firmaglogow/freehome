import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Placeholder from "@/components/ui/Placeholder";
import { site } from "@/lib/site";

export const metadata = {
  title: "Regulamin",
  description:
    "Regulamin świadczenia usług oraz korzystania z serwisu FREE HOME Nieruchomości.",
};

export default function RegulaminPage() {
  return (
    <>
      <PageHeader eyebrow="Dokumenty" title="Regulamin" />
      <section className="py-16">
        <Container className="max-w-3xl space-y-6 text-sm leading-relaxed text-cream/75">
          <Placeholder>
            Pełna treść regulaminu serwisu i świadczenia usług do uzupełnienia z
            prawnikiem.
          </Placeholder>
          <p>
            Operatorem serwisu jest {site.fullName}, {site.address.street},{" "}
            {site.address.city} (NIP: {site.legal.nip}).
          </p>
        </Container>
      </section>
    </>
  );
}
