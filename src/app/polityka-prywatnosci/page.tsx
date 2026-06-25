import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności FREE HOME Nieruchomości — zasady przetwarzania danych osobowych zgodnie z RODO.",
};

export default function PolitykaPrywatnosciPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dokumenty"
        title="Polityka prywatności"
        subtitle="Zasady przetwarzania danych osobowych w serwisie FREE HOME Nieruchomości."
      />
      <section className="py-16">
        <Container className="max-w-3xl space-y-8 text-sm leading-relaxed text-cream/75">
          <p>
            Niniejsza Polityka prywatności określa zasady przetwarzania i ochrony
            danych osobowych Użytkowników serwisu {site.url} oraz osób
            kontaktujących się z {site.fullName}. Dokument przygotowano zgodnie z
            Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia
            27 kwietnia 2016 r. (dalej „RODO”).
          </p>

          <div>
            <h2 className="font-display text-xl text-cream">
              1. Administrator danych
            </h2>
            <p className="mt-3">
              Administratorem Twoich danych osobowych jest {site.fullName} z
              siedzibą przy {site.address.street}, {site.address.city}.
              <br />
              NIP: {site.legal.nip} · REGON: {site.legal.regon}
              <br />
              Licencja zawodowa: {site.legal.license}
              <br />
              Kontakt w sprawach danych osobowych:{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-gold-400 hover:underline"
              >
                {site.email}
              </a>{" "}
              · tel.{" "}
              <a href={site.phoneHref} className="text-gold-400 hover:underline">
                {site.phone}
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              2. Jakie dane przetwarzamy
            </h2>
            <p className="mt-3">
              W zależności od formy kontaktu i zakresu współpracy możemy
              przetwarzać: imię i nazwisko, numer telefonu, adres e-mail, treść
              wiadomości oraz informacje o nieruchomości lub preferencjach
              zakupowych, które przekazujesz nam dobrowolnie. W przypadku zawarcia
              umowy pośrednictwa przetwarzamy także dane niezbędne do jej
              realizacji (m.in. adres nieruchomości, dane do umowy).
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              3. Cele i podstawy prawne przetwarzania
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                odpowiedź na zapytanie wysłane formularzem lub telefonicznie oraz
                podjęcie działań przed zawarciem umowy — art. 6 ust. 1 lit. b)
                RODO;
              </li>
              <li>
                realizacja umowy pośrednictwa w obrocie nieruchomościami — art. 6
                ust. 1 lit. b) RODO;
              </li>
              <li>
                wypełnienie obowiązków prawnych (m.in. podatkowych i
                rachunkowych) — art. 6 ust. 1 lit. c) RODO;
              </li>
              <li>
                realizacja prawnie uzasadnionego interesu administratora, w tym
                obsługa zapytań, dochodzenie lub obrona roszczeń oraz analiza
                ruchu w serwisie — art. 6 ust. 1 lit. f) RODO;
              </li>
              <li>
                działania marketingowe prowadzone na podstawie Twojej zgody —
                art. 6 ust. 1 lit. a) RODO.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              4. Odbiorcy danych
            </h2>
            <p className="mt-3">
              Twoje dane mogą być przekazywane podmiotom wspierającym nas w
              prowadzeniu działalności, wyłącznie w niezbędnym zakresie i na
              podstawie odpowiednich umów: dostawcom usług IT i hostingu, biuru
              rachunkowemu, kancelarii prawnej i notarialnej, a w przypadku
              finansowania zakupu — współpracującemu ekspertowi kredytowemu (Lendi).
              Dane nie są sprzedawane podmiotom trzecim.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              5. Okres przechowywania danych
            </h2>
            <p className="mt-3">
              Dane przechowujemy przez czas niezbędny do realizacji celu, dla
              którego zostały zebrane: przez okres prowadzenia korespondencji i
              obsługi zapytania, przez czas trwania umowy oraz po jej zakończeniu —
              do upływu okresów przedawnienia roszczeń i wygaśnięcia obowiązków
              wynikających z przepisów prawa (w szczególności podatkowych). Dane
              przetwarzane na podstawie zgody przechowujemy do czasu jej wycofania.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              6. Twoje prawa
            </h2>
            <p className="mt-3">
              W związku z przetwarzaniem danych przysługuje Ci prawo do: dostępu
              do danych i otrzymania ich kopii, sprostowania, usunięcia,
              ograniczenia przetwarzania, przenoszenia danych, wniesienia
              sprzeciwu wobec przetwarzania opartego na uzasadnionym interesie
              administratora oraz — w zakresie danych przetwarzanych na podstawie
              zgody — prawo do jej wycofania w dowolnym momencie bez wpływu na
              zgodność z prawem przetwarzania sprzed wycofania. Aby skorzystać z
              tych praw, skontaktuj się z nami pod adresem{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-gold-400 hover:underline"
              >
                {site.email}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              7. Prawo do skargi
            </h2>
            <p className="mt-3">
              Jeżeli uznasz, że przetwarzanie Twoich danych narusza przepisy RODO,
              masz prawo wnieść skargę do organu nadzorczego — Prezesa Urzędu
              Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              8. Dobrowolność podania danych
            </h2>
            <p className="mt-3">
              Podanie danych jest dobrowolne, jednak niezbędne do udzielenia
              odpowiedzi na zapytanie oraz do zawarcia i realizacji umowy. Brak
              podania danych może uniemożliwić nawiązanie współpracy.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              9. Profilowanie
            </h2>
            <p className="mt-3">
              Twoje dane nie są wykorzystywane do zautomatyzowanego podejmowania
              decyzji, w tym profilowania wywołującego wobec Ciebie skutki prawne.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              10. Pliki cookies
            </h2>
            <p className="mt-3">
              Serwis korzysta z plików cookies. Szczegółowe informacje znajdziesz
              w{" "}
              <Link
                href="/polityka-cookies"
                className="text-gold-400 hover:underline"
              >
                Polityce cookies
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
