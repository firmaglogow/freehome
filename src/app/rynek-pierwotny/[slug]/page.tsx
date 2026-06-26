import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import OfferCard from "@/components/ui/OfferCard";
import { formatArea, formatPrice } from "@/lib/offers";
import {
  developments,
  getDevelopment,
  offersForDevelopment,
} from "@/lib/developments";

export function generateStaticParams() {
  return developments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(
  props: PageProps<"/rynek-pierwotny/[slug]">
) {
  const { slug } = await props.params;
  const dev = getDevelopment(slug);
  if (!dev) return { title: "Inwestycja nieznaleziona" };
  return {
    title: `${dev.name} — ${dev.developer}`,
    description:
      dev.description ??
      `Inwestycja deweloperska ${dev.name} (${dev.developer}). Aktualne oferty z rynku pierwotnego — FREE HOME Nieruchomości.`,
  };
}

export default async function DevelopmentPage(
  props: PageProps<"/rynek-pierwotny/[slug]">
) {
  const { slug } = await props.params;
  const dev = getDevelopment(slug);
  if (!dev) notFound();

  // „Mechanizm bliźniaczy": te same komponenty i to samo źródło danych co listing
  // ofert — tylko przefiltrowane po inwestycji. Oferty wpadają i aktualizują się
  // automatycznie przy każdym imporcie z Esti.
  const list = offersForDevelopment(dev);
  const count = list.length;
  const prices = list.map((o) => o.price).filter((n) => n > 0);
  const areas = list.map((o) => o.areaTotal).filter((n) => n > 0);
  const priceFrom = prices.length ? Math.min(...prices) : null;
  const areaFrom = areas.length ? Math.min(...areas) : null;
  const areaTo = areas.length ? Math.max(...areas) : null;

  const areaLabel =
    areaFrom != null && areaTo != null
      ? areaFrom === areaTo
        ? formatArea(areaFrom)
        : `${formatArea(areaFrom)} – ${formatArea(areaTo)}`
      : "—";

  return (
    <article className="pt-28 pb-20">
      <Container>
        <nav className="mb-6 text-sm text-cream/55">
          <Link href="/rynek-pierwotny" className="hover:text-gold-300">
            ← Wróć do inwestycji
          </Link>
        </nav>

        {/* Nagłówek: logo + nazwa + deweloper + dane inwestycji */}
        <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:items-center">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-gold-500/15 bg-ivory">
            <Image
              src={dev.logo}
              alt={dev.name}
              fill
              sizes="(max-width: 1024px) 100vw, 320px"
              priority
              className="object-contain p-8"
            />
          </div>

          <div>
            <p className="eyebrow">Rynek pierwotny</p>
            <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">
              {dev.name}
            </h1>
            <p className="mt-2 text-lg text-cream/75">{dev.developer}</p>

            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-forest-600/50 bg-forest-600/30 text-sm sm:grid-cols-4">
              <div className="bg-forest-900 p-3">
                <dt className="text-cream/50">Dostępne oferty</dt>
                <dd className="mt-0.5 text-cream">{count > 0 ? count : "—"}</dd>
              </div>
              <div className="bg-forest-900 p-3">
                <dt className="text-cream/50">Ceny</dt>
                <dd className="mt-0.5 text-cream">
                  {priceFrom != null ? `od ${formatPrice(priceFrom)}` : "—"}
                </dd>
              </div>
              <div className="bg-forest-900 p-3">
                <dt className="text-cream/50">Powierzchnie</dt>
                <dd className="mt-0.5 text-cream">{areaLabel}</dd>
              </div>
              <div className="bg-forest-900 p-3">
                <dt className="text-cream/50">Realizacja</dt>
                <dd className="mt-0.5 text-cream">{dev.readyDate ?? "—"}</dd>
              </div>
            </dl>
          </div>
        </div>

        {dev.description ? (
          <div className="mt-10 max-w-3xl whitespace-pre-line text-base leading-relaxed text-cream/80">
            {dev.description}
          </div>
        ) : null}

        {/* Lista ofert tej inwestycji (mechanizm bliźniaczy) */}
        <div className="mt-12">
          <h2 className="font-display text-2xl text-cream">
            Dostępne oferty{count > 0 ? ` (${count})` : ""}
          </h2>
          {count === 0 ? (
            <div className="mt-6 rounded-2xl border border-gold-500/15 bg-forest-800 p-12 text-center text-cream/70">
              Aktualnie brak dostępnych ofert w tej inwestycji. Zadzwoń —
              chętnie opowiemy o planowanych etapach i terminach.
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((o) => (
                <OfferCard key={o.id} offer={o} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}
