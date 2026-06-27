import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import OfferCard from "@/components/ui/OfferCard";
import DevelopmentBody from "@/components/rynek/DevelopmentBody";
import { formatArea, formatPrice } from "@/lib/offers";
import { people, site } from "@/lib/site";
import {
  developments,
  getDevelopment,
  offersForDevelopment,
} from "@/lib/developments";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return developments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(
  props: PageProps<"/rynek-pierwotny/[slug]">
) {
  const { slug } = await props.params;
  const dev = getDevelopment(slug);
  if (!dev) return { title: "Inwestycja nieznaleziona" };
  return pageMetadata({
    title: `${dev.name} — ${dev.developer}`,
    description:
      dev.tagline ??
      dev.intro ??
      `Inwestycja deweloperska ${dev.name} (${dev.developer}). Aktualne oferty z rynku pierwotnego — FREE HOME Nieruchomości.`,
    path: `/rynek-pierwotny/${dev.slug}/`,
    ogImage: "/og/rynek-pierwotny.jpg",
  });
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

  // Opiekun inwestycji: override z konfiguracji, w przeciwnym razie agent z ofert
  // tej inwestycji (auto z Esti), a na końcu fallback na pierwszą osobę z zespołu.
  const agentSlug = dev.agentSlug ?? list.find((o) => o.agent)?.agent ?? null;
  const agent = people.find((p) => p.slug === agentSlug) ?? people[0];
  const agentHasPhone = !!agent.phone && /\d/.test(agent.phone);
  const agentPhone = agentHasPhone ? agent.phone! : site.phone;
  const agentPhoneHref = agentHasPhone
    ? `tel:+48${agent.phone!.replace(/\s/g, "")}`
    : site.phoneHref;

  const agentInfo = {
    name: agent.name,
    role: agent.role,
    photo: agent.photo,
    phone: agentPhone,
    phoneHref: agentPhoneHref,
    email: agent.email ?? null,
  };

  // Mapa Google (embed bez klucza API) — wyśrodkowana na lokalizacji inwestycji.
  const mapQuery = dev.mapQuery ?? dev.location ?? null;
  const mapSrc = mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(
        mapQuery
      )}&z=14&hl=pl&output=embed`
    : null;
  const mapLink = mapQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        mapQuery
      )}`
    : null;

  return (
    <article className="pt-28 pb-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Rynek pierwotny", path: "/rynek-pierwotny" },
          { name: dev.name, path: `/rynek-pierwotny/${dev.slug}/` },
        ])}
      />
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
              className="object-contain p-8 scale-[1.15]"
            />
          </div>

          <div>
            <p className="eyebrow">Rynek pierwotny</p>
            <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">
              {dev.name}
            </h1>
            {dev.location ? (
              <p className="mt-2 flex items-center gap-1.5 text-cream/70">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 flex-none text-gold-400"
                  fill="currentColor"
                >
                  <path d="M12 2c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                </svg>
                {dev.location}
              </p>
            ) : null}
            <p className="mt-1 text-lg text-cream/75">{dev.developer}</p>

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

        {/* Opis osiedla (zwijany) + opiekun inwestycji + mapa */}
        <DevelopmentBody
          tagline={dev.tagline}
          intro={dev.intro}
          sections={dev.sections}
          location={dev.location}
          agent={agentInfo}
          mapSrc={mapSrc}
          mapLink={mapLink}
        />

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
