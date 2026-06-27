import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import { site } from "@/lib/site";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Regulamin",
  description:
    "Regulamin korzystania z serwisu oraz świadczenia usług FREE HOME Nieruchomości.",
  path: "/regulamin",
});

export default function RegulaminPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Regulamin", path: "/regulamin" }])}
      />
      <PageHeader
        eyebrow="Dokumenty"
        title="Regulamin"
        subtitle="Zasady korzystania z serwisu FREE HOME Nieruchomości."
      />
      <section className="py-16">
        <Container className="max-w-3xl space-y-8 text-sm leading-relaxed text-cream/75">
          <div>
            <h2 className="font-display text-xl text-cream">
              § 1. Postanowienia ogólne
            </h2>
            <p className="mt-3">
              Operatorem serwisu dostępnego pod adresem {site.url} jest{" "}
              {site.fullName} z siedzibą przy {site.address.street},{" "}
              {site.address.city} (NIP: {site.legal.nip}, REGON:{" "}
              {site.legal.regon}, licencja zawodowa: {site.legal.license}). Niniejszy
              Regulamin określa zasady korzystania z serwisu oraz warunki kontaktu
              z Operatorem.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              § 2. Zakres serwisu
            </h2>
            <p className="mt-3">
              Serwis ma charakter informacyjny i służy prezentacji oferty oraz
              usług Operatora w zakresie pośrednictwa w obrocie nieruchomościami,
              a także umożliwia kontakt za pośrednictwem formularza, telefonu i
              poczty elektronicznej. Informacje zamieszczone w serwisie, w
              szczególności dotyczące nieruchomości i cen, mają charakter
              zaproszenia do kontaktu i nie stanowią oferty w rozumieniu Kodeksu
              cywilnego.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              § 3. Warunki korzystania
            </h2>
            <p className="mt-3">
              Korzystanie z serwisu jest bezpłatne. Do prawidłowego działania
              serwisu wystarczy urządzenie z dostępem do internetu i aktualną
              przeglądarką internetową. Użytkownik zobowiązuje się do korzystania
              z serwisu zgodnie z prawem i dobrymi obyczajami oraz do
              niepodejmowania działań zakłócających jego funkcjonowanie.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              § 4. Kontakt i świadczenie usług
            </h2>
            <p className="mt-3">
              Skorzystanie z formularza kontaktowego lub innej formy kontaktu
              służy nawiązaniu relacji z Operatorem i nie jest równoznaczne z
              zawarciem umowy pośrednictwa. Szczegółowe warunki współpracy, w tym
              zakres usług i wynagrodzenie, ustalane są indywidualnie w odrębnej
              umowie zawieranej z klientem.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              § 5. Prawa autorskie
            </h2>
            <p className="mt-3">
              Treści zamieszczone w serwisie, w tym teksty, zdjęcia, grafiki i
              układ strony, podlegają ochronie prawnej i stanowią własność
              Operatora lub są wykorzystywane na podstawie odpowiednich uprawnień.
              Kopiowanie i wykorzystywanie tych treści bez zgody Operatora jest
              zabronione.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              § 6. Ochrona danych osobowych
            </h2>
            <p className="mt-3">
              Zasady przetwarzania danych osobowych Użytkowników opisane zostały w{" "}
              <Link
                href="/polityka-prywatnosci"
                className="text-gold-400 hover:underline"
              >
                Polityce prywatności
              </Link>
              , a zasady wykorzystywania plików cookies — w{" "}
              <Link
                href="/polityka-cookies"
                className="text-gold-400 hover:underline"
              >
                Polityce cookies
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              § 7. Reklamacje
            </h2>
            <p className="mt-3">
              Uwagi i reklamacje dotyczące działania serwisu można zgłaszać na
              adres{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-gold-400 hover:underline"
              >
                {site.email}
              </a>
              . Operator rozpatruje zgłoszenia w terminie do 14 dni od ich
              otrzymania.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              § 8. Postanowienia końcowe
            </h2>
            <p className="mt-3">
              W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają
              przepisy prawa polskiego. Operator zastrzega sobie prawo do zmiany
              Regulaminu z ważnych przyczyn; zmiany wchodzą w życie z chwilą
              opublikowania w serwisie.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
