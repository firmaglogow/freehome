import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import AwardsGrid from "@/components/dlaczego-my/AwardsGrid";
import CountUp from "@/components/dlaczego-my/CountUp";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { site, people } from "@/lib/site";
import {
  stats,
  trademark,
  certificates,
  companyAwards,
  rankings,
  grzegorzAwards,
  dariaAwards,
  partnerships,
} from "@/lib/awards";

export const metadata = pageMetadata({
  title: "Dlaczego my",
  description:
    `Nagrody, rankingi i status prawny FREE HOME: Orły Nieruchomości GOLD ×5, Prestiżowa Marka 2026 TOP 1, Złota Firma, TOP 25 Otodom, ${site.reviewsCount}+ opinii Google 5,0 i Osobowość Roku 2025. Zobacz, dlaczego warto nam zaufać.`,
  path: "/dlaczego-my",
  ogImage: "/og/o-nas.jpg",
  ogTitle: "Dlaczego FREE HOME — nagrody i wyróżnienia",
});

const grzegorz = people.find((p) => p.slug === "grzegorz-lukasik");
const daria = people.find((p) => p.slug === "daria-lukasik");

// Przełącznik sekcji „Pisali o nas" (media/prasa). Na razie OFF — nie mamy jeszcze
// realnych publikacji, a puste kafelki „Miejsce na publikację" osłabiały stronę.
// Gdy pojawią się artykuły: wstaw treści w sekcji niżej i ustaw na `true` (jedna zmiana).
const SHOW_PRESS = false;

// Trzy najmocniejsze wyróżnienia — „spotlight" otwierający stronę zamiast statusu ®.
type Spot = {
  id: string;
  tag: string;
  title: string;
  blurb: string;
  logo?: string;
  icon?: "sparkle";
};
const spotlight: Spot[] = [
  {
    id: "osobowosc-roku",
    tag: "Grzegorz Łukasik",
    title: "Osobowość Roku 2025",
    blurb:
      "Wybór mieszkańców powiatu głogowskiego w kategorii Biznes i Przedsiębiorczość. Nagroda odebrana na gali wojewódzkiej we Wrocławiu.",
    logo: "/nagrody/osobowosc-roku.webp",
  },
  {
    id: "orly-gold",
    tag: "5× z rzędu · 2022–2026",
    title: "Orły Nieruchomości GOLD",
    blurb:
      "Pięć lat nieprzerwanie w gronie 3,37% najlepiej ocenianych firm nieruchomości w Polsce — na podstawie opinii klientów.",
    logo: "/nagrody/orly-gold.webp",
  },
  {
    id: "prestizowa-marka",
    tag: "1. miejsce w Polsce",
    title: "Prestiżowa Marka 2026",
    blurb:
      "Tytuł TOP 1 za realizację usług w standardzie premium i dbałość o każdy detal procesu sprzedaży.",
    logo: "/nagrody/prestizowa-marka.webp",
  },
];

export default function DlaczegoMyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Dlaczego my", path: "/dlaczego-my" }])}
      />

      <PageHeader
        eyebrow="Dlaczego my"
        title="Nie musisz wierzyć nam na słowo"
        subtitle={`${site.reviewsCount} osób oceniło nas na 5,0 w Google. Oto cały dorobek, który za tym stoi.`}
        image="/hero/panorama2.webp"
      />

      {/* SEKCJA 1+2 — wstęp + LICZBY (animowane liczniki) */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-cream/75">
              Przez 10 lat zbudowaliśmy coś więcej niż biuro nieruchomości —
              markę, której zaufały setki rodzin, doceniły niezależne instytucje
              i potwierdziły twarde dane. Poniżej cały nasz dorobek, czarno na
              złotym.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={(i % 3) * 70}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-gold-500/20 bg-forest-800 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/45 hover:shadow-[0_20px_50px_-24px_rgba(197,164,78,0.5)]">
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <CountUp
                    value={s.value}
                    className="block font-display text-4xl text-gold-400 [text-shadow:0_2px_18px_rgba(197,164,78,0.35)] sm:text-5xl"
                  />
                  <p className="mt-2 text-sm font-semibold text-cream">
                    {s.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-cream/55">
                    {s.sub}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SEKCJA SPOTLIGHT — trzy najmocniejsze wyróżnienia */}
      <section className="relative overflow-hidden border-t border-gold-500/10 bg-forest-900 py-16 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[100px]" />
        <Container className="relative">
          <SectionHeading
            align="center"
            eyebrow="Najważniejsze wyróżnienia"
            title="Trzy powody, dla których nas zapamiętasz"
            subtitle="Z dziesiątek nagród i tytułów wybraliśmy te, które mówią najwięcej: o ludziach, o powtarzalności i o pozycji nr 1."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {spotlight.map((s, i) => (
              <Reveal key={s.id} delay={i * 110}>
                <div className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-gold-500/25 bg-gradient-to-b from-forest-800 to-forest-950 p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-gold-500/60 hover:shadow-[0_30px_80px_-30px_rgba(197,164,78,0.55)]">
                  <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-500/15 blur-3xl transition-all duration-500 group-hover:bg-gold-500/25" />

                  <span className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-cream shadow-sm ring-1 ring-gold-500/30">
                    {s.logo ? (
                      <Image
                        src={s.logo}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-contain p-2.5"
                      />
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#a9772a"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="h-12 w-12"
                      >
                        <path d="M12 3c.6 4.2 1.2 4.8 5.4 5.4-4.2.6-4.8 1.2-5.4 5.4-.6-4.2-1.2-4.8-5.4-5.4C10.8 7.8 11.4 7.2 12 3Z" />
                        <path d="M18.5 14c.25 1.6.65 2 2.25 2.25-1.6.25-2 .65-2.25 2.25-.25-1.6-.65-2-2.25-2.25 1.6-.25 2-.65 2.25-2.25Z" />
                      </svg>
                    )}
                  </span>

                  <span className="relative mt-5 rounded-full border border-gold-500/30 bg-gold-500/5 px-3 py-1 text-xs font-medium text-gold-300">
                    {s.tag}
                  </span>
                  <h3 className="relative mt-3 text-balance font-display text-2xl text-cream transition-colors duration-300 group-hover:text-gold-300">
                    {s.title}
                  </h3>
                  <p className="relative mt-3 text-pretty text-sm leading-relaxed text-cream/70">
                    {s.blurb}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SEKCJA — NAGRODY BRANŻOWE (FIRMA) */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Nagrody branżowe"
            title="Wielokrotnie doceniani przez niezależne instytucje"
            subtitle="Każda nagroda to potwierdzenie najwyższych standardów obsługi — przyznane przez zewnętrznych organizatorów, nie przez nas samych."
          />
          <div className="mt-12">
            <AwardsGrid items={companyAwards} columns={3} />
          </div>
        </Container>
      </section>

      {/* SEKCJA — OCENY I POZYCJE RANKINGOWE */}
      <section className="border-t border-gold-500/10 bg-forest-900 py-16 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Oceny i rankingi"
            title="Twarde dane, nie opinie o sobie"
            subtitle="Pozycje rankingowe oparte wyłącznie na danych: jakości ogłoszeń, opiniach klientów i obiektywnej ocenie portali."
          />
          <div className="mt-12">
            <AwardsGrid items={rankings} columns={3} />
          </div>
        </Container>
      </section>

      {/* SEKCJA — STATUS PRAWNY I KWALIFIKACJE (znak ® jako jeden z dowodów, nie hero) */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Status prawny i kwalifikacje"
            title="Marka chroniona prawem"
            subtitle="FREE HOME jest zastrzeżonym znakiem towarowym, a nasze kwalifikacje potwierdzają niezależne instytucje — to nie są puste deklaracje."
          />
          <div className="mt-12">
            <AwardsGrid items={[trademark, ...certificates]} columns={3} />
          </div>
        </Container>
      </section>

      {/* SEKCJA — LUDZIE */}
      <section className="border-t border-gold-500/10 bg-forest-900 py-16 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Ludzie FREE HOME"
            title="Za marką stoją konkretne osoby"
            subtitle="Wyróżnienia indywidualne, które zdobyli Grzegorz i Daria — w branży i w lokalnej społeczności."
          />

          {/* Grzegorz */}
          {grzegorz && (
            <div className="mt-12">
              <Reveal className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gold-500/15 pb-4">
                <h3 className="font-display text-2xl text-cream">
                  {grzegorz.name}
                </h3>
                <Link
                  href={`/ludzie/${grzegorz.slug}`}
                  className="text-sm font-semibold text-gold-400 transition hover:text-gold-300"
                >
                  Poznaj Grzegorza →
                </Link>
              </Reveal>
              <div className="mt-7">
                <AwardsGrid items={grzegorzAwards} columns={3} />
              </div>
            </div>
          )}

          {/* Daria */}
          {daria && (
            <div className="mt-14">
              <Reveal className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gold-500/15 pb-4">
                <h3 className="font-display text-2xl text-cream">{daria.name}</h3>
                <Link
                  href={`/ludzie/${daria.slug}`}
                  className="text-sm font-semibold text-gold-400 transition hover:text-gold-300"
                >
                  Poznaj Darię →
                </Link>
              </Reveal>
              <div className="mt-7">
                <AwardsGrid items={dariaAwards} columns={3} />
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* SEKCJA — NIESTANDARDOWY MARKETING I WSPÓŁPRACA */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Współpraca i marketing"
            title="Robimy nieruchomości inaczej"
            subtitle="Niestandardowe działania marketingowe i wartościowe relacje, które wyróżniają nas na lokalnym rynku."
          />
          <div className="mt-12">
            <AwardsGrid items={partnerships} columns={2} />
          </div>
        </Container>
      </section>

      {/* SEKCJA — MEDIA / PRASA. Ukryta do czasu realnych publikacji (SHOW_PRESS). */}
      {SHOW_PRESS && (
        <section className="border-t border-gold-500/10 bg-forest-900 py-16 sm:py-24">
          <Container>
            <SectionHeading
              align="center"
              eyebrow="W mediach"
              title="Pisali o nas"
              subtitle="Materiały prasowe, wywiady i wzmianki o FREE HOME."
            />
            {/*
              DODAWANIE ARTYKUŁÓW PRASOWYCH:
              zamień poniższe placeholdery na kafelki z realnymi pozycjami, np.
              tytuł publikacji + źródło + data + link/scan. Można wydzielić listę
              do src/lib/press.ts i zmapować ją tutaj, analogicznie do AwardsGrid.
              Gdy treści będą gotowe — ustaw SHOW_PRESS = true (góra pliku).
            */}
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="flex h-full min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-gold-500/25 bg-forest-800/40 p-8 text-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.4}
                      aria-hidden="true"
                      className="h-9 w-9 text-gold-500/50"
                    >
                      <path d="M4 5h13a1 1 0 0 1 1 1v12a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2V5Z" />
                      <path d="M8 9h6M8 13h6M8 17h4" />
                    </svg>
                    <p className="mt-3 text-sm text-cream/45">
                      Miejsce na publikację
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* SEKCJA — ZAMKNIĘCIE + CTA */}
      <section className="border-t border-gold-500/15 bg-gradient-to-b from-forest-900 to-forest-950 py-20 sm:py-24">
        <Container className="max-w-2xl text-center">
          <SectionHeading
            align="center"
            eyebrow="Porozmawiajmy"
            title="Chcesz, żeby Twoja nieruchomość trafiła w takie ręce?"
            subtitle="Cały ten dorobek bierze się z jednego: traktujemy każdą transakcję poważnie. Zróbmy to samo z Twoją."
          />
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="inline-block rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-forest-950 transition hover:bg-gold-400"
            >
              Skontaktuj się z nami
            </Link>
            <Link
              href="/wycena"
              className="inline-block rounded-full border border-gold-500/40 px-8 py-3.5 text-sm font-semibold text-gold-300 transition hover:border-gold-500/70 hover:text-gold-200"
            >
              Zamów bezpłatną wycenę
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
