import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import People from "@/components/home/People";
import { awards, site } from "@/lib/site";

export const metadata = {
  title: "O nas",
  description:
    "FREE HOME Nieruchomości — lokalne biuro z Głogowa. Ludzie, których znasz, i transakcje, którym możesz zaufać.",
};

export default function ONasPage() {
  return (
    <>
      <PageHeader
        eyebrow="O nas"
        title="Lokalne biuro, które zna Twoją okolicę"
        subtitle="Jesteśmy z Głogowa i tu pracujemy. Znamy rynek, sąsiedztwa i ludzi."
      />

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-3xl text-cream sm:text-4xl">
            Kim jesteśmy
          </h2>
          <div className="mt-5 space-y-4 text-cream/75 leading-relaxed">
            <p>
              FREE HOME to lokalne biuro nieruchomości z Głogowa, które
              prowadzimy razem — Daria i Grzegorz Łukasik. Nie jesteśmy siecią z
              infolinią i oddziałami w całej Polsce. Jesteśmy stąd. I to jest
              cała różnica.
            </p>
            <p>
              Przez lata pracy w głogowskich nieruchomościach przeszły przez
              nasze ręce setki transakcji — mieszkania, domy, działki. Każda z
              nich nauczyła nas tego samego: że za każdą nieruchomością stoi
              człowiek i jego decyzja, często jedna z najważniejszych w życiu.
              Dlatego pracujemy inaczej. Bez nacisku, bez sztampy, bez
              traktowania klienta jak numer w systemie.
            </p>
            <p>
              Szczerze? Najbardziej cieszą nas nie statuetki, tylko to, że
              klienci wracają i polecają nas dalej. Ponad 254 opinie z oceną 5
              gwiazdek w Google nie wzięły się znikąd — to lata uczciwej,
              konkretnej roboty. Lokalna wiedza, realne ceny, pełne
              zaangażowanie na każdym etapie. Tak właśnie wygląda FREE HOME.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { v: `${site.reviewsCount}+`, l: "opinii klientów" },
              { v: "5,0", l: "średnia ocen" },
              { v: "100%", l: "lokalnie" },
              { v: "2", l: "osoby w zespole" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="rounded-2xl border border-gold-500/15 bg-forest-800 p-5 text-center">
                  <p className="font-display text-3xl text-gold-400">{stat.v}</p>
                  <p className="mt-1 text-xs text-cream/60">{stat.l}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <h2 className="mt-14 font-display text-2xl text-cream">Wyróżnienia</h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {awards.map((a) => (
              <span
                key={a}
                className="rounded-full border border-gold-500/25 bg-gold-500/5 px-4 py-2 text-sm text-gold-300"
              >
                {a}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <People />

      <section className="py-16 text-center">
        <Container>
          <Link
            href="/kontakt"
            className="inline-block rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-forest-950 transition hover:bg-gold-400"
          >
            Skontaktuj się z nami
          </Link>
        </Container>
      </section>
    </>
  );
}
