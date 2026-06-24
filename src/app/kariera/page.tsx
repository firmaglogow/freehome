import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Calculator from "@/components/kariera/Calculator";
import KarieraForm from "@/components/kariera/KarieraForm";

export const metadata = {
  title: "Kariera — dołącz do lokalnego biura nieruchomości w Głogowie",
  description:
    "Dołącz do FREE HOME — lokalnego biura nieruchomości z Głogowa z jedną z najlepszych reputacji w mieście. Doświadczenia nie wymagamy. Realny zarobek bez sufitu, wolność zamiast korpo.",
  alternates: { canonical: "/kariera" },
};

const whoCards = [
  {
    title: "Ludzi lubisz",
    desc: "Rozmowa przychodzi Ci naturalnie. Potrafisz słuchać i budować zaufanie — bo to ono sprzedaje, nie sztuczki.",
    icon: (
      <path d="M12 2a5 5 0 100 10 5 5 0 000-10zM3 21a9 9 0 0118 0" />
    ),
  },
  {
    title: "Masz w sobie napęd",
    desc: "Nie czekasz, aż ktoś powie Ci, co robić. Bierzesz sprawy w swoje ręce i chcesz więcej, niż dostać wypłatę za przesiedziane godziny.",
    icon: <path d="M13 2L3 14h7l-1 8 10-12h-7z" />,
  },
  {
    title: "Jesteś stąd albo czujesz to miejsce",
    desc: "Znasz Głogów i okolice — albo chcesz je poznać tak dobrze, jak własną dzielnicę. Lokalność to nasz fundament.",
    icon: <path d="M3 12h4l3 8 4-16 3 8h4" />,
  },
];

const whyPoints = [
  {
    n: "01",
    title: "Marka, która otwiera drzwi",
    desc: "Ponad 254 opinie 5★, nagrody branżowe i pozycja TOP w regionie. Pukasz do klientów z mocnym nazwiskiem za sobą.",
  },
  {
    n: "02",
    title: "Realny zarobek bez sufitu",
    desc: "Model oparty na Twojej skuteczności. Im więcej wnosisz, tym więcej zarabiasz — bez widełek „od-do” trzymających Cię w miejscu.",
  },
  {
    n: "03",
    title: "Nauczymy Cię fachu",
    desc: "Sprawdzony system, skrypty, wsparcie na każdym etapie. Wchodzisz w gotowe, działające know-how — nie uczysz się na własnych błędach.",
  },
  {
    n: "04",
    title: "Wolność, nie korpo",
    desc: "Sam planujesz swój dzień. Żadnych bezsensownych raportów i sztywnych procedur. Liczy się efekt, nie odbębnione godziny.",
  },
];

export default function KarieraPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-gold-500/10 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 pt-36 pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(197,164,78,0.14),transparent_55%)]" />
        <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
        <Container className="relative">
          <Reveal>
            <p className="eyebrow">Dołącz do FREE HOME</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
              Nie szukamy pracownika.
              <span className="mt-2 block font-serif text-2xl font-medium italic text-gold-400 sm:text-3xl lg:text-4xl">
                Szukamy kogoś, kto chce zbudować coś swojego.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">
              FREE HOME to lokalne biuro z Głogowa z jedną z najlepszych
              reputacji w mieście. Otwieramy drzwi dla osoby, która chce robić
              nieruchomości po ludzku — i dobrze na tym zarabiać.
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <a
                href="#formularz"
                className="rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-forest-950 transition hover:bg-gold-400"
              >
                Aplikuj teraz
              </a>
              <a
                href="#dlaczego"
                className="rounded-full border border-gold-500/50 px-8 py-3.5 text-sm font-semibold text-cream transition hover:border-gold-500 hover:bg-gold-500/10"
              >
                Dlaczego warto
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* KOGO SZUKAMY */}
      <section className="bg-forest-900 py-20 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Kogo szukamy"
            title="Charakter ważniejszy niż CV"
            subtitle="Doświadczenia w nieruchomościach nie wymagamy — tego nauczymy. Reszty nauczyć się nie da."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {whoCards.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-gold-500/15 bg-forest-800 p-8 transition duration-300 hover:-translate-y-1 hover:border-gold-500/45">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-5 h-11 w-11 text-gold-400"
                    aria-hidden="true"
                  >
                    {c.icon}
                  </svg>
                  <h3 className="font-display text-xl text-cream">{c.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-cream/70">
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* DLACZEGO WARTO */}
      <section id="dlaczego" className="scroll-mt-24 bg-forest-950 py-20 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Dlaczego warto"
            title="Małe biuro. Wielkie możliwości."
            subtitle="U nas nie jesteś numerem w korporacyjnej tabelce. Jesteś częścią marki, która naprawdę coś znaczy w Głogowie."
          />
          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
            {whyPoints.map((p, i) => (
              <Reveal key={p.n} delay={i * 70}>
                <div className="flex h-full items-start gap-5 rounded-2xl border border-gold-500/15 border-l-2 border-l-gold-500 bg-forest-800 p-6">
                  <span className="font-display text-2xl font-bold leading-none text-gold-400">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-cream">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-cream/70">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* KALKULATOR POTENCJAŁU */}
      <section className="bg-forest-900 py-20 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Podgląd potencjału"
            title="Ile możesz zarobić?"
            subtitle="Przesuń suwak i zobacz przykładowy potencjał miesięczny. To ilustracja, nie obietnica — ale pokazuje, w którą stronę to działa."
          />
          <div className="mt-12">
            <Calculator />
          </div>
        </Container>
      </section>

      {/* FORMULARZ */}
      <section id="formularz" className="scroll-mt-24 bg-forest-950 py-20 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Zgłoszenie"
            title="Wyślij zgłoszenie"
            subtitle="Kilka pól, zero zbędnych formalności. Odezwiemy się szybko."
          />
          <div className="mt-12">
            <KarieraForm />
          </div>
        </Container>
      </section>

      {/* CTA ZAMYKAJĄCE */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-950 to-forest-800 py-20 text-center sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,164,78,0.12),transparent_60%)]" />
        <Container className="relative">
          <Reveal>
            <p className="eyebrow">Jeden telefon może zmienić Twój rok</p>
            <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl text-cream sm:text-4xl">
              Nie czekaj na idealny moment
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-cream/70">
              Najlepsi agenci, z którymi pracujemy, kiedyś też nie wiedzieli, czy
              się nadają. Po prostu spróbowali. Twój ruch.
            </p>
            <a
              href="#formularz"
              className="mt-8 inline-block rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-forest-950 transition hover:bg-gold-400"
            >
              Aplikuj teraz
            </a>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
