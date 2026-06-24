import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function ValuationCTA() {
  return (
    <section className="bg-gold-500 py-16 sm:py-20">
      <Container>
        <Reveal className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-3xl text-forest-950 sm:text-4xl">
              Sprawdź, ile warta jest Twoja nieruchomość
            </h2>
            <p className="mt-3 text-base text-forest-950/80">
              Bezpłatna, niezobowiązująca wycena od lokalnych ekspertów. Bez
              spamu, bez nacisków.
            </p>
          </div>
          <Link
            href="/wycena"
            className="flex-none rounded-full bg-forest-950 px-8 py-4 text-sm font-semibold text-cream transition hover:bg-forest-800"
          >
            Wyceń za darmo
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
