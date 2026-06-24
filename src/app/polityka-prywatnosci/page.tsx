import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Placeholder from "@/components/ui/Placeholder";
import { site } from "@/lib/site";

export const metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności FREE HOME Nieruchomości — zasady przetwarzania danych osobowych (RODO).",
};

export default function PolitykaPrywatnosciPage() {
  return (
    <>
      <PageHeader eyebrow="Dokumenty" title="Polityka prywatności" />
      <section className="py-16">
        <Container className="max-w-3xl space-y-6 text-sm leading-relaxed text-cream/75">
          <Placeholder>
            Pełna treść polityki prywatności (RODO) do uzupełnienia z prawnikiem.
            Poniżej dane administratora danych.
          </Placeholder>
          <div>
            <h2 className="font-display text-xl text-cream">
              Administrator danych
            </h2>
            <p className="mt-3">
              {site.fullName}, {site.address.street}, {site.address.city}
              <br />
              NIP: {site.legal.nip} · REGON: {site.legal.regon}
              <br />
              Licencja: {site.legal.license}
              <br />
              E-mail:{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-gold-400 hover:underline"
              >
                {site.email}
              </a>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
