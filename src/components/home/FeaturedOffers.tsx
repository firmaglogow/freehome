import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import OfferCard from "@/components/ui/OfferCard";
import Reveal from "@/components/ui/Reveal";
import { offers } from "@/lib/offers";

export default function FeaturedOffers() {
  // Strona główna: pokazujemy 8 NAJNOWSZYCH ofert (układ 4 + 4 na desktopie),
  // sortowanych po addDate malejąco. Dzięki temu nowo dodana w CRM oferta sama
  // wskakuje na górę przy każdym imporcie (cron przebudowuje stronę) — bez
  // ręcznego wybierania. Fallback na updatedAt, gdy addDate puste (dane mock).
  const list = [...offers]
    .sort((a, b) =>
      (b.addDate ?? b.updatedAt ?? "").localeCompare(a.addDate ?? a.updatedAt ?? "")
    )
    .slice(0, 8);

  // Brak ofert (np. pusty build bez danych z importera Esti) — nie pokazujemy
  // pustej sekcji „Najnowsze oferty". Na żywej stronie lista zawsze ma dane
  // z Esti, więc sekcja jest widoczna normalnie.
  if (list.length === 0) return null;

  return (
    <section className="bg-forest-950 py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Świeżo w ofercie"
            title="Najnowsze oferty"
            subtitle="Ostatnio dodane nieruchomości — prosto z naszej bazy, aktualizowane na bieżąco."
          />
          <Link
            href="/oferty"
            className="rounded-full border border-gold-500/40 px-5 py-2.5 text-sm font-semibold text-gold-400 transition hover:bg-gold-500 hover:text-forest-950"
          >
            Zobacz wszystkie oferty
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((offer, i) => (
            <Reveal key={offer.id} delay={(i % 4) * 80}>
              <OfferCard offer={offer} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
