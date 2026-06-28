import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import AwardsGrid from "@/components/dlaczego-my/AwardsGrid";
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
    `Nagrody, rankingi i status prawny FREE HOME: Orły Nieruchomości GOLD ×5, Prestiżowa Marka 2026, Złota Firma, TOP 25 Otodom, ${site.reviewsCount}+ opinii Google 5,0 i zastrzeżony znak towarowy ®. Zobacz, dlaczego warto nam zaufać.`,
  path: "/dlaczego-my",
  ogImage: "/og/o-nas.jpg",
  ogTitle: "Dlaczego FREE HOME — nagrody i wyróżnienia",
});

const grzegorz = people.find((p) => p.slug === "grzegorz-lukasik");
const daria = people.find((p) => p.slug === "daria-lukasik");

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
        image="/hero/klucze-dom.webp"
      />

      {/* SEKCJA 1+2 — wstęp + LICZBY */}
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
                <div className="h-full rounded-2xl border border-gold-500/20 bg-forest-800 p-6 text-center">
                  <p className="font-display text-4xl text-gold-400 sm:text-5xl">
                    {s.value}
                  </p>
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

      {/* SEKCJA 3 — STATUS PRAWNY MARKI + certyfikaty */}
      <section className="border-t border-gold-500/10 bg-forest-900 py-16 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Status prawny i kwalifikacje"
            title="Marka chroniona prawem"
            subtitle="To nie są puste deklaracje — FREE HOME jest zastrzeżonym znakiem towarowym, a nasze kwalifikacje potwierdzają niezależne instytucje."
          />

          <Reveal className="mx-auto mt-12 max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-br from-forest-800 to-forest-950 p-8 sm:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-500/10 blur-3xl" />
              <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-forest-950/60 text-gold-400 ring-1 ring-gold-500/30">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.4}
                    aria-hidden="true"
                    className="h-12 w-12"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9.6 16.5V7.5h3a2.25 2.25 0 0 1 0 4.5h-3M12.2 12 15 16.5" />
                  </svg>
                </span>
                <div>
                  <span className="rounded-full border border-gold-500/25 bg-gold-500/5 px-3 py-0.5 text-xs font-medium text-gold-300">
                    Status prawny
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-cream sm:text-3xl">
                    {trademark.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-cream/80">
                    {trademark.desc}
                  </p>
                  <p className="mt-4 text-sm text-cream/55">
                    <span className="text-cream/40">Organizator: </span>
                    {trademark.organizer}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <h3 className="mt-14 text-center font-display text-xl text-cream/90">
            Certyfikaty i licencje
          </h3>
          <div className="mt-7">
            <AwardsGrid items={certificates} columns={3} />
          </div>
        </Container>
      </section>

      {/* SEKCJA 4 — NAGRODY BRANŻOWE (FIRMA) */}
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

      {/* SEKCJA 5 — OCENY I POZYCJE RANKINGOWE */}
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

      {/* SEKCJA 6 — LUDZIE */}
      <section className="py-16 sm:py-24">
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

      {/* SEKCJA dodatkowa — NIESTANDARDOWY MARKETING I WSPÓŁPRACA */}
      <section className="border-t border-gold-500/10 bg-forest-900 py-16 sm:py-24">
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

      {/* SEKCJA 7 — MEDIA / PRASA (placeholder do uzupełnienia) */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="W mediach"
            title="Pisali o nas"
            subtitle="Materiały prasowe, wywiady i wzmianki o FREE HOME. Sekcja w przygotowaniu — wkrótce pojawią się tu konkretne publikacje."
          />
          {/*
            DODAWANIE ARTYKUŁÓW PRASOWYCH (na przyszłość):
            zamień poniższe placeholdery na kafelki z realnymi pozycjami, np.
            tytuł publikacji + źródło + data + link/scan. Można wydzielić listę
            do src/lib/press.ts i zmapować ją tutaj, analogicznie do AwardsGrid.
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

      {/* SEKCJA 8 — ZAMKNIĘCIE + CTA */}
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
