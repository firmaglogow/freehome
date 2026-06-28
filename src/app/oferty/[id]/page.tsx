import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import OfferCard from "@/components/ui/OfferCard";
import OfferGallery from "@/components/oferty/OfferGallery";
import OfferDetailsPanel from "@/components/oferty/OfferDetailsPanel";
import OfferDescription from "@/components/oferty/OfferDescription";
import ContactForm from "@/components/ContactForm";
import Placeholder from "@/components/ui/Placeholder";
import {
  offers,
  formatArea,
  formatPrice,
  formatTransactionBadge,
  resolveAgentSlug,
} from "@/lib/offers";
import { sanitizeOfferHtml } from "@/lib/sanitizeHtml";
import { people, site } from "@/lib/site";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd, offerJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return offers.map((o) => ({ id: o.id }));
}

export async function generateMetadata(props: PageProps<"/oferty/[id]">) {
  const { id } = await props.params;
  const offer = offers.find((o) => o.id === id);
  if (!offer) return { title: "Oferta nieznaleziona" };
  return pageMetadata({
    title: offer.title,
    description: `${offer.type} · ${offer.location} · ${formatArea(
      offer.areaTotal
    )} · ${formatPrice(offer.price)}.`,
    path: `/oferty/${offer.id}/`,
    // Karta social pokazuje zdjęcie nieruchomości; gdy brak — markowy OG ofert.
    ogImage: offer.image || "/og/oferty.jpg",
  });
}

export default async function OfferPage(props: PageProps<"/oferty/[id]">) {
  const { id } = await props.params;
  const offer = offers.find((o) => o.id === id);
  if (!offer) notFound();

  const agent = people.find((p) => p.slug === resolveAgentSlug(offer)) ?? people[0];
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
      <JsonLd
        data={[
          offerJsonLd(offer),
          breadcrumbJsonLd([
            { name: "Oferty", path: "/oferty" },
            { name: offer.title, path: `/oferty/${offer.id}/` },
          ]),
        ]}
      />
      <Container>
        <nav aria-label="Okruszki" className="mb-6 text-sm text-cream/55">
          <Link href="/oferty" className="hover:text-gold-300">
            ← Wróć do ofert
          </Link>
        </nav>

        {/* Jedyny h1 strony. Tytuł oferty wizualnie pojawia się w panelu z ceną
            (renderowanym dwukrotnie: mobile + desktop), więc tam jest tylko <p>.
            Ten sr-only h1 gwarantuje poprawną hierarchię (h1 → h2) w obu
            układach, niezależnie od kolejności kolumn w siatce. */}
        <h1 className="sr-only">{offer.title}</h1>

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Galeria + opis */}
          <div>
            <OfferGallery
              images={galleryImages}
              plans={plans}
              title={offer.title}
              badge={formatTransactionBadge(offer)}
            />

            {/* Telefon: moduł z ceną i szczegółami zaraz po zdjęciach. */}
            <div className="mt-6 lg:hidden">
              <OfferDetailsPanel
                offer={offer}
                agentName={agent.name}
                agentPhoto={agent.photo}
                agentPhone={agentPhone}
                agentPhoneHref={agentPhoneHref}
              />
            </div>

            <h2 className="mt-10 font-display text-2xl text-cream">
              Opis nieruchomości
            </h2>
            {descHtml || offer.description ? (
              <OfferDescription html={descHtml} text={offer.description} />
            ) : (
              <div className="mt-4">
                <Placeholder>
                  Opis oferty {offer.id} zostanie uzupełniony.
                </Placeholder>
              </div>
            )}

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
                <p className="mt-2 text-xs text-cream/60">
                  Lokalizacja przybliżona — dokładny adres podajemy przy
                  kontakcie.
                </p>
              </div>
            ) : null}
          </div>

          {/* Panel boczny */}
          <aside className="h-fit lg:sticky lg:top-24">
            {/* Desktop: ten sam moduł z ceną w przyklejonym panelu bocznym.
                Na telefonie ukryty — pokazujemy jego kopię pod galerią. */}
            <div className="hidden lg:block">
              <OfferDetailsPanel
                offer={offer}
                agentName={agent.name}
                agentPhoto={agent.photo}
                agentPhone={agentPhone}
                agentPhoneHref={agentPhoneHref}
              />
            </div>

            <div className="rounded-3xl border border-gold-500/15 bg-forest-800 p-6 lg:mt-5">
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
