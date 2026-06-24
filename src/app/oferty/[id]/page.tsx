import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import OfferCard from "@/components/ui/OfferCard";
import ContactForm from "@/components/ContactForm";
import Placeholder from "@/components/ui/Placeholder";
import { offers, formatArea, formatPrice } from "@/lib/offers";
import { people, site } from "@/lib/site";

export function generateStaticParams() {
  return offers.map((o) => ({ id: o.id }));
}

export async function generateMetadata(props: PageProps<"/oferty/[id]">) {
  const { id } = await props.params;
  const offer = offers.find((o) => o.id === id);
  if (!offer) return { title: "Oferta nieznaleziona" };
  return {
    title: offer.title,
    description: `${offer.type} · ${offer.location} · ${formatArea(
      offer.areaTotal
    )} · ${formatPrice(offer.price)}.`,
  };
}

export default async function OfferPage(props: PageProps<"/oferty/[id]">) {
  const { id } = await props.params;
  const offer = offers.find((o) => o.id === id);
  if (!offer) notFound();

  const agent = people[0];
  const similar = offers
    .filter((o) => o.id !== offer.id && o.type === offer.type)
    .slice(0, 3);
  const fallbackSimilar =
    similar.length > 0
      ? similar
      : offers.filter((o) => o.id !== offer.id).slice(0, 3);

  return (
    <article className="pt-28 pb-20">
      <Container>
        <nav className="mb-6 text-sm text-cream/55">
          <Link href="/oferty" className="hover:text-gold-300">
            ← Wróć do ofert
          </Link>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Galeria + opis */}
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-gold-500/15">
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-forest-950/80 px-3 py-1 text-xs font-medium text-gold-300 backdrop-blur">
                {offer.transaction === "sprzedaz" ? "Sprzedaż" : "Wynajem"}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-dashed border-gold-500/25 bg-gold-500/5"
                >
                  <span className="absolute inset-0 grid place-items-center text-center text-[11px] text-gold-300/80">
                    foto {i + 2}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-cream/45">
              Galeria zdjęć pojawi się automatycznie po imporcie oferty z EstiCRM
              (Etap 2).
            </p>

            <h2 className="mt-10 font-display text-2xl text-cream">
              Opis nieruchomości
            </h2>
            <div className="mt-4">
              <Placeholder>
                Pełny opis oferty {offer.id} zostanie zaciągnięty z systemu
                EstiCRM (Etap 2) lub uzupełniony ręcznie.
              </Placeholder>
            </div>
          </div>

          {/* Panel boczny */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-3xl border border-gold-500/15 bg-forest-800 p-6">
              <p className="text-sm text-cream/60">
                {offer.type} · {offer.location}
              </p>
              <h1 className="mt-1 font-display text-2xl text-cream">
                {offer.title}
              </h1>
              <p className="mt-3 font-display text-3xl text-gold-400">
                {formatPrice(offer.price)}
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-forest-600/50 bg-forest-600/30 text-sm">
                <div className="bg-forest-900 p-3">
                  <dt className="text-cream/50">Powierzchnia</dt>
                  <dd className="mt-0.5 text-cream">
                    {formatArea(offer.areaTotal)}
                  </dd>
                </div>
                <div className="bg-forest-900 p-3">
                  <dt className="text-cream/50">Pokoje</dt>
                  <dd className="mt-0.5 text-cream">{offer.rooms ?? "—"}</dd>
                </div>
                <div className="bg-forest-900 p-3">
                  <dt className="text-cream/50">Piętro</dt>
                  <dd className="mt-0.5 text-cream">{offer.floor ?? "—"}</dd>
                </div>
                <div className="bg-forest-900 p-3">
                  <dt className="text-cream/50">Cena za m²</dt>
                  <dd className="mt-0.5 text-cream">
                    {offer.pricePerMeter
                      ? `${formatPrice(offer.pricePerMeter)}/m²`
                      : "—"}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex items-center gap-3 rounded-xl border border-gold-500/15 bg-forest-900 p-3">
                <div className="relative h-12 w-12 flex-none overflow-hidden rounded-full">
                  <Image
                    src={agent.photo}
                    alt={agent.name}
                    fill
                    sizes="48px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="text-sm">
                  <p className="text-cream">{agent.name}</p>
                  <a
                    href={site.phoneHref}
                    className="text-gold-400 hover:underline"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-gold-500/15 bg-forest-800 p-6">
              <h3 className="text-lg text-cream">Zapytaj o tę ofertę</h3>
              <p className="mt-1 mb-4 text-sm text-cream/60">
                Podaj numer — oddzwonimy z szczegółami oferty {offer.id}.
              </p>
              <ContactForm compact />
            </div>
          </aside>
        </div>

        {/* Podobne oferty */}
        <div className="mt-16">
          <h2 className="font-display text-2xl text-cream">Podobne oferty</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fallbackSimilar.map((o) => (
              <OfferCard key={o.id} offer={o} />
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
