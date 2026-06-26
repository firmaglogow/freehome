import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import OfferCard from "@/components/ui/OfferCard";
import OfferGallery from "@/components/oferty/OfferGallery";
import ContactForm from "@/components/ContactForm";
import Placeholder from "@/components/ui/Placeholder";
import { offers, formatArea, formatPrice } from "@/lib/offers";
import { sanitizeOfferHtml } from "@/lib/sanitizeHtml";
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

  const agent = people.find((p) => p.slug === offer.agent) ?? people[0];
  const agentHasPhone = !!agent.phone && /\d/.test(agent.phone);
  const agentPhone = agentHasPhone ? agent.phone! : site.phone;
  const agentPhoneHref = agentHasPhone
    ? `tel:+48${agent.phone!.replace(/\s/g, "")}`
    : site.phoneHref;
  const similar = offers
    .filter((o) => o.id !== offer.id && o.type === offer.type)
    .slice(0, 3);
  const fallbackSimilar =
    similar.length > 0
      ? similar
      : offers.filter((o) => o.id !== offer.id).slice(0, 3);

  // Galeria: zdjęcia (type=119) i osobno plany/rzuty (type=120) — rozdzielone
  // już w imporcie. Gdy brak galerii, używamy zdjęcia głównego.
  const galleryImages =
    offer.gallery && offer.gallery.length > 0
      ? offer.gallery
      : offer.image
        ? [offer.image]
        : [];
  const plans = offer.plans ?? [];

  // Opis: preferujemy bezpieczny HTML z Esti (descriptionHtml) — z <strong>/<br>.
  const descHtml = sanitizeOfferHtml(offer.descriptionHtml);

  // Mapa lokalizacji — embed Google Maps bez klucza API (output=embed), pin na
  // dokładnych współrzędnych z Esti. Spójne z mapami na podstronach inwestycji.
  const mapSrc = offer.geo
    ? `https://www.google.com/maps?q=${offer.geo.lat},${offer.geo.lng}&z=15&hl=pl&output=embed`
    : null;
  const mapLink = offer.geo
    ? `https://www.google.com/maps/search/?api=1&query=${offer.geo.lat},${offer.geo.lng}`
    : null;

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
            <OfferGallery
              images={galleryImages}
              plans={plans}
              title={offer.title}
              badge="Sprzedaż"
            />

            <h2 className="mt-10 font-display text-2xl text-cream">
              Opis nieruchomości
            </h2>
            <div className="mt-4">
              {descHtml ? (
                <div
                  className="space-y-3 text-base leading-relaxed text-cream/80 [&_b]:font-semibold [&_b]:text-cream [&_strong]:font-semibold [&_strong]:text-cream [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: descHtml }}
                />
              ) : offer.description ? (
                <div className="space-y-3 whitespace-pre-line text-base leading-relaxed text-cream/80">
                  {offer.description}
                </div>
              ) : (
                <Placeholder>
                  Opis oferty {offer.id} zostanie uzupełniony.
                </Placeholder>
              )}
            </div>

            {/* Mapa lokalizacji (Google Maps embed, bez klucza API) */}
            {mapSrc ? (
              <div className="mt-10">
                <div className="flex items-end justify-between gap-4">
                  <h2 className="font-display text-2xl text-cream">
                    Lokalizacja
                  </h2>
                  {mapLink ? (
                    <a
                      href={mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gold-400 hover:underline"
                    >
                      Otwórz w Google Maps →
                    </a>
                  ) : null}
                </div>
                <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-3xl border border-gold-500/15">
                  <iframe
                    src={mapSrc}
                    title={`Mapa — ${offer.location ?? offer.title}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full"
                    style={{ border: 0 }}
                  />
                </div>
                <p className="mt-2 text-xs text-cream/45">
                  Lokalizacja przybliżona — dokładny adres podajemy przy
                  kontakcie.
                </p>
              </div>
            ) : null}
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
                    href={agentPhoneHref}
                    className="text-gold-400 hover:underline"
                  >
                    {agentPhone}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-gold-500/15 bg-forest-800 p-6">
              <h3 className="text-lg text-cream">Zapytaj o tę ofertę</h3>
              <p className="mt-1 mb-4 text-sm text-cream/60">
                Podaj numer — oddzwonimy z szczegółami oferty {offer.id}.
              </p>
              <ContactForm compact context={offer.id} />
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
