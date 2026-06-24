import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import OfferCard from "@/components/ui/OfferCard";
import Reveal from "@/components/ui/Reveal";
import { offers } from "@/lib/offers";

export default function FeaturedOffers() {
  const featured = offers.filter((o) => o.promoted).slice(0, 3);
  const list = featured.length ? featured : offers.slice(0, 3);

  return (
    <section className="bg-forest-950 py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Polecane"
            title="Wybrane oferty"
            subtitle="Nieruchomości, które warto zobaczyć — prosto z naszej bazy."
          />
          <Link
            href="/oferty"
            className="rounded-full border border-gold-500/40 px-5 py-2.5 text-sm font-semibold text-gold-400 transition hover:bg-gold-500 hover:text-forest-950"
          >
            Zobacz wszystkie oferty
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((offer, i) => (
            <Reveal key={offer.id} delay={i * 90}>
              <OfferCard offer={offer} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
