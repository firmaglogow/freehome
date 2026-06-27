import Image from "next/image";
import Link from "next/link";
import {
  formatArea,
  formatOfferPlace,
  formatPrice,
  type Offer,
} from "@/lib/offers";

export default function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Link
      href={`/oferty/${offer.id}`}
      className="group block overflow-hidden rounded-2xl border border-gold-500/10 bg-forest-800 transition hover:border-gold-500/40 hover:shadow-2xl hover:shadow-black/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-forest-950/80 px-3 py-1 text-xs font-medium text-gold-300 backdrop-blur">
          Sprzedaż
        </span>
        {offer.promoted && (
          <span className="absolute right-3 top-3 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-forest-950">
            Wyróżniona
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-sm text-cream/60">
          {offer.type} · {formatOfferPlace(offer)}
        </p>
        <h3 className="mt-1 line-clamp-1 text-lg text-cream group-hover:text-gold-300">
          {offer.title}
        </h3>
        <p className="mt-2 font-display text-xl text-gold-400">
          {formatPrice(offer.price)}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-cream/70">
          <span>{formatArea(offer.areaTotal)}</span>
          {offer.rooms ? <span>{offer.rooms} pok.</span> : null}
          {offer.floor ? <span>piętro {offer.floor}</span> : null}
          {offer.pricePerMeter ? (
            <span>{formatPrice(offer.pricePerMeter)}/m²</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
