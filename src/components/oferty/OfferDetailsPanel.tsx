import type { ReactNode } from "react";
import Image from "next/image";
import {
  type Offer,
  formatArea,
  formatPrice,
  formatOfferPlace,
  formatOfferHeading,
} from "@/lib/offers";

type OfferDetailsPanelProps = {
  offer: Offer;
  agentName: string;
  agentPhoto: string;
  agentPhone: string;
  agentPhoneHref: string;
};

// Minimalistyczne ikony liniowe (stroke = currentColor → dziedziczą złoty kolor
// z text-gold-400). Jeden wspólny szkielet gwarantuje identyczny rozmiar i wagę
// linii, dzięki czemu cała siatka statystyk jest równa i symetryczna.
function StatIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      {children}
    </svg>
  );
}

// Powierzchnia — narożniki ramki (symbol „rozmiaru/metrażu").
const AreaIcon = (
  <StatIcon>
    <path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4" />
  </StatIcon>
);
// Pokoje — łóżko.
const RoomsIcon = (
  <StatIcon>
    <path d="M2 20v-7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7" />
    <path d="M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
    <path d="M2 16h20" />
  </StatIcon>
);
// Piętro — schody.
const FloorIcon = (
  <StatIcon>
    <path d="M3 20h3v-3h3v-3h3v-3h3v-3h3" />
  </StatIcon>
);
// Cena za m² — metka.
const PriceIcon = (
  <StatIcon>
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V5a2 2 0 0 1 2-2h8l7.6 7.6a2 2 0 0 1 0 2.8z" />
    <circle cx="7.5" cy="7.5" r="1.3" />
  </StatIcon>
);

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
  const stats: { icon: ReactNode; label: string; value: ReactNode }[] = [
    {
      icon: AreaIcon,
      label: "Powierzchnia",
      value: formatArea(offer.areaTotal),
    },
    { icon: RoomsIcon, label: "Pokoje", value: offer.rooms ?? "—" },
    { icon: FloorIcon, label: "Piętro", value: offer.floor ?? "—" },
    {
      icon: PriceIcon,
      label: "Cena za m²",
      value: offer.pricePerMeter
        ? `${formatPrice(offer.pricePerMeter)}/m²`
        : "—",
    },
  ];

  return (
    <div className="rounded-3xl border border-gold-500/15 bg-forest-800 p-6">
      <p className="text-sm text-cream/60">{formatOfferPlace(offer)}</p>
      <h1 className="mt-1 font-display text-2xl text-cream">
        {formatOfferHeading(offer)}
      </h1>
      <p className="mt-3 font-display text-3xl text-gold-400">
        {formatPrice(offer.price)}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-forest-600/50 bg-forest-600/30 text-sm">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3 bg-forest-900 p-3">
            <span className="flex-none text-gold-400">{s.icon}</span>
            <div className="min-w-0">
              <dt className="text-cream/50">{s.label}</dt>
              <dd className="mt-0.5 text-cream">{s.value}</dd>
            </div>
          </div>
        ))}
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
