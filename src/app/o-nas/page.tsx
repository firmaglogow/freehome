import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import People from "@/components/home/People";
import AwardSeal from "@/components/ui/AwardSeal";
import { site } from "@/lib/site";
import { awardHighlights as awards } from "@/lib/awards";
import { history } from "@/lib/history";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "O nas",
  description:
    "FREE HOME Nieruchomości — lokalne biuro z Głogowa. Ludzie, których znasz, i transakcje, którym możesz zaufać.",
  path: "/o-nas",
  ogImage: "/og/o-nas.jpg",
});

export default function ONasPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "O nas", path: "/o-nas" }])} />
      <PageHeader
        eyebrow="O nas"
        title="Lokalne biuro, które zna Twoją okolicę"
        subtitle="Jesteśmy z Głogowa i tu pracujemy. Znamy rynek, sąsiedztwa i ludzi."
        image="/hero/panorama.webp"
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
              klienci wracają i polecają nas dalej. Ponad {site.reviewsCount}{" "}
              opinii z oceną 5 gwiazdek w Google nie wzięły się znikąd — to lata uczciwej,
              konkretnej roboty. Lokalna wiedza, realne ceny, pełne
              zaangażowanie na każdym etapie. Tak właśnie wygląda FREE HOME.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { v: "10", l: "lat na rynku" },
              { v: `${site.reviewsCount}+`, l: "opinii klientów" },
              { v: "5,0", l: "średnia ocen" },
              { v: "100%", l: "lokalnie" },
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
                className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/5 px-4 py-2 text-sm text-gold-300"
              >
                <AwardSeal className="h-4 w-4 shrink-0 text-gold-400" />
                {a}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm">
            <Link
              href="/dlaczego-my"
              className="inline-flex items-center gap-1.5 font-semibold text-gold-400 transition hover:text-gold-300"
            >
              Zobacz wszystkie nagrody i wyróżnienia
              <span aria-hidden="true">→</span>
            </Link>
          </p>
        </Container>
      </section>

      {/* Oś czasu — droga firmy 2016–2026 */}
      <section className="border-t border-gold-500/10 bg-forest-900 py-16 sm:py-24">
        <Container className="max-w-3xl">
          <div className="text-center">
            <p className="eyebrow">Nasza droga</p>
            <h2 className="mt-3 font-display text-3xl text-cream sm:text-4xl">
              Historia FREE HOME
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-cream/70">
              Droga, którą przeszliśmy, by stać się Twoim zaufanym partnerem —
              od pierwszych transakcji po dekadę skuteczności.
            </p>
          </div>

          <ol className="relative mt-12 space-y-7 border-l border-gold-500/20 pl-7 sm:pl-9">
            {history.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 60} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-4 ring-forest-900 ${
                    m.highlight ? "bg-gold-400" : "bg-gold-500/50"
                  }`}
                  style={{ left: "-2.05rem" }}
                />
                <div
                  className={`rounded-2xl border p-5 sm:p-6 ${
                    m.highlight
                      ? "border-gold-500/40 bg-gold-500/[0.06]"
                      : "border-gold-500/15 bg-forest-800"
                  }`}
                >
                  <span className="inline-block rounded-full border border-gold-500/30 bg-forest-950/40 px-3 py-0.5 font-display text-sm text-gold-300">
                    {m.year}
                  </span>
                  <h3 className="mt-3 font-display text-xl text-cream">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-cream/75 leading-relaxed">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
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
