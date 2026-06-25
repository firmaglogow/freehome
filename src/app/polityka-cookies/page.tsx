import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata = {
  title: "Polityka cookies",
  description:
    "Polityka plików cookies serwisu FREE HOME Nieruchomości — jakie pliki wykorzystujemy i w jakim celu.",
};

export default function PolitykaCookiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dokumenty"
        title="Polityka cookies"
        subtitle="Informacje o plikach cookies wykorzystywanych w serwisie FREE HOME Nieruchomości."
      />
      <section className="py-16">
        <Container className="max-w-3xl space-y-8 text-sm leading-relaxed text-cream/75">
          <p>
            Niniejsza Polityka cookies wyjaśnia, czym są pliki cookies, w jakim
            celu serwis {site.url} z nich korzysta oraz jak możesz zarządzać
            zgodą na ich wykorzystywanie.
          </p>

          <div>
            <h2 className="font-display text-xl text-cream">
              1. Czym są pliki cookies
            </h2>
            <p className="mt-3">
              Cookies to niewielkie pliki tekstowe zapisywane na Twoim urządzeniu
              (komputerze, tablecie, telefonie) podczas przeglądania serwisu.
              Pozwalają one rozpoznać Twoje urządzenie przy kolejnej wizycie i
              zapamiętać wybrane ustawienia. Cookies nie służą do identyfikacji
              tożsamości i nie zawierają oprogramowania szkodliwego.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              2. Rodzaje wykorzystywanych plików cookies
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <span className="text-cream">Niezbędne</span> — konieczne do
                prawidłowego działania serwisu i jego podstawowych funkcji. Nie
                wymagają zgody, ponieważ bez nich strona nie działałaby
                poprawnie.
              </li>
              <li>
                <span className="text-cream">Analityczne</span> — pomagają
                zrozumieć, w jaki sposób odwiedzający korzystają z serwisu (np.
                które podstrony są najczęściej oglądane), co pozwala nam ulepszać
                stronę. Wykorzystywane na podstawie Twojej zgody.
              </li>
              <li>
                <span className="text-cream">Marketingowe</span> — mogą być
                wykorzystywane do prezentowania treści dopasowanych do Twoich
                zainteresowań. Wykorzystywane wyłącznie na podstawie Twojej zgody.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              3. Zarządzanie zgodą i ustawieniami
            </h2>
            <p className="mt-3">
              W każdej chwili możesz zmienić ustawienia dotyczące plików cookies w
              swojej przeglądarce — ograniczyć lub zablokować ich obsługę, a także
              usunąć pliki już zapisane. Sposób zarządzania cookies różni się w
              zależności od przeglądarki; odpowiednie opcje znajdziesz zwykle w
              sekcji „Prywatność” lub „Ustawienia”. Ograniczenie obsługi cookies
              może wpłynąć na niektóre funkcje serwisu.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              4. Cookies podmiotów zewnętrznych
            </h2>
            <p className="mt-3">
              Serwis może korzystać z usług dostawców zewnętrznych (np. narzędzi
              analitycznych czy map), którzy mogą zapisywać własne pliki cookies.
              Pliki te podlegają politykom prywatności odpowiednich dostawców.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-cream">
              5. Kontakt
            </h2>
            <p className="mt-3">
              W razie pytań dotyczących plików cookies napisz do nas:{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-gold-400 hover:underline"
              >
                {site.email}
              </a>
              . Zasady przetwarzania danych osobowych opisaliśmy w{" "}
              <Link
                href="/polityka-prywatnosci"
                className="text-gold-400 hover:underline"
              >
                Polityce prywatności
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
