import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import OfferCard from "@/components/ui/OfferCard";
import { people } from "@/lib/site";
import { offers, resolveAgentSlug } from "@/lib/offers";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd, personJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/ludzie/[slug]">) {
  const { slug } = await props.params;
  const person = people.find((p) => p.slug === slug);
  if (!person) return { title: "Osoba nieznaleziona" };
  return pageMetadata({
    title: person.name,
    description: person.partner
      ? `${person.name} — ${person.role}, zaufany partner kredytowy (Lendi) współpracujący z FREE HOME Nieruchomości w Głogowie.`
      : `${person.name} — ${person.role} w FREE HOME Nieruchomości (Głogów).`,
    path: `/ludzie/${person.slug}/`,
    ogImage: "/og/zespol.jpg",
  });
}

export default async function PersonPage(props: PageProps<"/ludzie/[slug]">) {
  const { slug } = await props.params;
  const person = people.find((p) => p.slug === slug);
  if (!person) notFound();

  const agentOffers = offers.filter((o) => resolveAgentSlug(o) === person.slug);
  const hasPhone = !!person.phone && /\d/.test(person.phone);
  const hasEmail = !!person.email && person.email.includes("@");
  const telHref = hasPhone
    ? `tel:+48${person.phone!.replace(/\s/g, "")}`
    : undefined;

  return (
    <article className="pt-28 pb-20">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Zespół", path: "/ludzie" },
            { name: person.name, path: `/ludzie/${person.slug}/` },
          ]),
          personJsonLd(person),
        ]}
      />
      <Container>
        <nav aria-label="Okruszki" className="mb-6 text-sm text-cream/55">
          <Link href="/ludzie" className="hover:text-gold-300">
            ← Wróć do zespołu
          </Link>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[340px_1fr]">
          {/* Profil */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-3xl border border-gold-500/15 bg-forest-800">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 340px"
                  priority
                  className="object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h1 className="font-display text-3xl text-cream">
                  {person.name}
                </h1>
                <p className="mt-1 text-sm text-gold-400">{person.role}</p>
                {person.partnerLabel && (
                  <p className="mt-0.5 text-xs uppercase tracking-wide text-cream/60">
                    {person.partnerLabel}
                  </p>
                )}

                <div className="mt-5 space-y-2 text-sm">
                  {hasPhone ? (
                    <a
                      href={telHref}
                      className="block font-semibold text-gold-400 hover:underline"
                    >
                      tel. {person.phone}
                    </a>
                  ) : (
                    <p className="text-cream/70">tel. {person.phone}</p>
                  )}
                  {hasEmail ? (
                    <a
                      href={`mailto:${person.email}`}
                      className="block break-all text-cream/70 hover:text-gold-300"
                    >
                      {person.email}
                    </a>
                  ) : (
                    <p className="break-all text-cream/70">{person.email}</p>
                  )}
                </div>

                {person.partner ? (
                  <a
                    href={telHref ?? "/uslugi/kredyty"}
                    className="mt-6 block rounded-full bg-gold-500 px-6 py-3 text-center text-sm font-semibold text-forest-950 transition hover:bg-gold-400"
                  >
                    Skontaktuj się w sprawie kredytu
                  </a>
                ) : (
                  <Link
                    href="/kontakt"
                    className="mt-6 block rounded-full bg-gold-500 px-6 py-3 text-center text-sm font-semibold text-forest-950 transition hover:bg-gold-400"
                  >
                    Napisz do nas
                  </Link>
                )}
              </div>
            </div>
          </aside>

          {/* Opis + oferty */}
          <div>
            <h2 className="font-display text-2xl text-cream">O mnie</h2>
            <p className="mt-4 text-base leading-relaxed text-cream/75">
              {person.bio}
            </p>

            {person.partner ? (
              <>
                <h2 className="mt-12 font-display text-2xl text-cream">
                  Kredyty i finansowanie
                </h2>
                <div className="mt-6 rounded-2xl border border-gold-500/15 bg-forest-800 p-6">
                  <p className="text-sm leading-relaxed text-cream/75">
                    {person.name.split(" ")[0]} jest naszym zaufanym partnerem
                    kredytowym (Lendi) — nie zajmuje się sprzedażą
                    nieruchomości, tylko finansowaniem. Jeśli potrzebujesz
                    kredytu hipotecznego lub ubezpieczenia, skontaktuj się
                    bezpośrednio albo poznaj naszą usługę finansowania.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/uslugi/kredyty"
                      className="rounded-full border border-gold-500/30 px-6 py-3 text-sm font-semibold text-gold-400 transition hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-300"
                    >
                      Poznaj usługę: Finansowanie →
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="mt-12 font-display text-2xl text-cream">
                  Oferty {person.name.split(" ")[0]}
                </h2>
                {agentOffers.length > 0 ? (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {agentOffers.map((o) => (
                      <OfferCard key={o.id} offer={o} />
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 rounded-2xl border border-gold-500/15 bg-forest-800 p-6 text-sm text-cream/70">
                    Aktualnie brak ofert przypisanych do tego agenta.{" "}
                    <Link
                      href="/oferty"
                      className="font-semibold text-gold-400 hover:underline"
                    >
                      Zobacz wszystkie oferty
                    </Link>
                    .
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </article>
  );
}
