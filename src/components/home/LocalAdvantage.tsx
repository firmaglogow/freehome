import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const points = [
  {
    title: "Znamy Głogów",
    desc: "Każda ulica, każde osiedle, realne ceny. Lokalna wiedza, której nie ma żadna sieć ogólnopolska.",
  },
  {
    title: "Osobisty kontakt",
    desc: "Trafiasz do konkretnej osoby, nie do infolinii. Jesteśmy z Tobą na każdym etapie.",
  },
  {
    title: "Zaufanie i opinie",
    desc: `Jedno z najlepiej ocenianych biur w mieście — ponad ${site.reviewsCount} opinii 5 gwiazdek.`,
  },
];

export default function LocalAdvantage() {
  return (
    <section className="border-y border-gold-500/10 bg-forest-800 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-gold-500/15">
              <Image
                src="/hero/lokalnebiuro.webp"
                alt="Zabytkowa kolegiata w Głogowie na tle dramatycznego nieba"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <p className="eyebrow">Nasz wyróżnik</p>
            <h2 className="mt-3 text-3xl leading-tight text-cream sm:text-4xl">
              Lokalne biuro &gt; bezosobowa sieć
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/75">
              Jesteśmy stąd. Daria i Grzegorz — dwie osoby, które znają Głogów i
              okolice na wylot. U nas nieruchomość to nie numer w systemie, tylko
              Twój dom, Twoja decyzja i nasza wspólna sprawa.
            </p>

            <div className="mt-8 space-y-5">
              {points.map((p) => (
                <div key={p.title} className="flex gap-4">
                  <span className="mt-1.5 h-2 w-2 flex-none rotate-45 bg-gold-500" />
                  <div>
                    <h3 className="text-lg text-cream">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-cream/70">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
