import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import OfferCard from "@/components/ui/OfferCard";
import { formatArea, formatPrice } from "@/lib/offers";
import { people, site } from "@/lib/site";
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
      dev.tagline ??
      dev.intro ??
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

  // Opiekun inwestycji: override z konfiguracji, w przeciwnym razie agent z ofert
  // tej inwestycji (auto z Esti), a na końcu fallback na pierwszą osobę z zespołu.
  const agentSlug = dev.agentSlug ?? list.find((o) => o.agent)?.agent ?? null;
  const agent = people.find((p) => p.slug === agentSlug) ?? people[0];
  const agentHasPhone = !!agent.phone && /\d/.test(agent.phone);
  const agentPhone = agentHasPhone ? agent.phone! : site.phone;
  const agentPhoneHref = agentHasPhone
    ? `tel:+48${agent.phone!.replace(/\s/g, "")}`
    : site.phoneHref;

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

        {/* Opis osiedla + opiekun inwestycji */}
        {dev.tagline || dev.intro || dev.sections?.length ? (
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
            <div>
              {dev.tagline ? (
                <p className="font-display text-2xl text-gold-400">
                  {dev.tagline}
                </p>
              ) : null}
              {dev.intro ? (
                <p className="mt-4 text-lg leading-relaxed text-cream/85">
                  {dev.intro}
                </p>
              ) : null}

              {dev.sections?.map((section, i) => (
                <section key={section.heading ?? i} className="mt-8">
                  {section.heading ? (
                    <h2 className="font-display text-xl text-cream">
                      {section.heading}
                    </h2>
                  ) : null}
                  {section.paragraphs?.map((p, j) => (
                    <p
                      key={j}
                      className="mt-3 text-base leading-relaxed text-cream/80"
                    >
                      {p}
                    </p>
                  ))}
                  {section.bullets?.length ? (
                    <ul className="mt-4 space-y-2.5">
                      {section.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 text-cream/80">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold-400"
                          />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            {/* Opiekun inwestycji — jak karta agenta przy ofercie */}
            <aside className="h-fit lg:sticky lg:top-24">
              <div className="rounded-3xl border border-gold-500/15 bg-forest-800 p-6">
                <p className="text-sm text-cream/60">Opiekun inwestycji</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="relative h-16 w-16 flex-none overflow-hidden rounded-full">
                    <Image
                      src={agent.photo}
                      alt={agent.name}
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="font-display text-lg text-cream">
                      {agent.name}
                    </p>
                    <p className="text-sm text-cream/60">{agent.role}</p>
                  </div>
                </div>

                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-cream/50">Telefon</dt>
                    <dd>
                      <a
                        href={agentPhoneHref}
                        className="font-medium text-gold-400 hover:underline"
                      >
                        {agentPhone}
                      </a>
                    </dd>
                  </div>
                  {agent.email ? (
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-cream/50">E-mail</dt>
                      <dd>
                        <a
                          href={`mailto:${agent.email}`}
                          className="font-medium text-gold-400 hover:underline break-all"
                        >
                          {agent.email}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                </dl>

                <a
                  href={agentPhoneHref}
                  className="mt-6 block rounded-xl bg-gold-500 px-4 py-3 text-center text-sm font-semibold text-forest-950 transition hover:bg-gold-400"
                >
                  Zadzwoń i zapytaj o ofertę
                </a>
              </div>
            </aside>
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
