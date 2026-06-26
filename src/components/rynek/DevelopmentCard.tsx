import Image from "next/image";
import Link from "next/link";
import { type Development, offersForDevelopment } from "@/lib/developments";
import { formatPrice } from "@/lib/offers";

// Kafelek osiedla w galerii „Rynek pierwotny": logo (na jasnej płycie, żeby
// było czytelne niezależnie od kolorów loga) + nazwa + deweloper + skrót oferty.
export default function DevelopmentCard({ dev }: { dev: Development }) {
  const list = offersForDevelopment(dev);
  const count = list.length;
  const prices = list.map((o) => o.price).filter((n) => n > 0);
  const priceFrom = prices.length ? Math.min(...prices) : null;

  return (
    <Link
      href={`/rynek-pierwotny/${dev.slug}`}
      className="group block overflow-hidden rounded-2xl border border-gold-500/15 bg-forest-800 transition hover:border-gold-500/45 hover:shadow-2xl hover:shadow-black/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ivory">
        <Image
          src={dev.logo}
          alt={dev.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-8 transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-wider text-gold-400/80">
          {dev.developer}
        </p>
        <h3 className="mt-1 font-display text-xl text-cream group-hover:text-gold-300">
          {dev.name}
        </h3>
        <p className="mt-2 text-sm text-cream/70">
          {count > 0 ? (
            <>
              {count} {count === 1 ? "oferta" : count < 5 ? "oferty" : "ofert"}
              {priceFrom ? ` · od ${formatPrice(priceFrom)}` : ""}
            </>
          ) : (
            "Wkrótce oferty"
          )}
        </p>
      </div>
    </Link>
  );
}
