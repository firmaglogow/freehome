import Image from "next/image";
import {
  type Offer,
  formatArea,
  formatPrice,
  formatOfferPlace,
} from "@/lib/offers";

type OfferDetailsPanelProps = {
  offer: Offer;
  agentName: string;
  agentPhoto: string;
  agentPhone: string;
  agentPhoneHref: string;
};

// Moduł „cena + szczegóły" oferty. Renderowany dwukrotnie: raz pod galerią na
// telefonach (lg:hidden), raz w przyklejonym panelu bocznym na desktopie
// (hidden lg:block). Dane lokalizacji (typ · miasto, osiedle, ulica) pokazujemy
// w obu wariantach przez formatOfferPlace.
export default function OfferDetailsPanel({
  offer,
  agentName,
  agentPhoto,
  agentPhone,
  agentPhoneHref,
}: OfferDetailsPanelProps) {
  return (
    <div className="rounded-3xl border border-gold-500/15 bg-forest-800 p-6">
      <p className="text-sm text-cream/60">
        {offer.type} · {formatOfferPlace(offer)}
      </p>
      <h1 className="mt-1 font-display text-2xl text-cream">{offer.title}</h1>
      <p className="mt-3 font-display text-3xl text-gold-400">
        {formatPrice(offer.price)}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-forest-600/50 bg-forest-600/30 text-sm">
        <div className="bg-forest-900 p-3">
          <dt className="text-cream/50">Powierzchnia</dt>
          <dd className="mt-0.5 text-cream">{formatArea(offer.areaTotal)}</dd>
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
            src={agentPhoto}
            alt={agentName}
            fill
            sizes="48px"
            className="object-cover object-top"
          />
        </div>
        <div className="text-sm">
          <p className="text-cream">{agentName}</p>
          <a href={agentPhoneHref} className="text-gold-400 hover:underline">
            {agentPhone}
          </a>
        </div>
      </div>
    </div>
  );
}
