"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  type Offer,
  formatArea,
  formatPrice,
  formatOfferPlace,
  formatOfferHeading,
} from "@/lib/offers";

// Ikony parametrów (te same co w OfferDetailsPanel) — spójny język wizualny.
function StatIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
const AreaIcon = (
  <StatIcon>
    <path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4" />
  </StatIcon>
);
const RoomsIcon = (
  <StatIcon>
    <path d="M3 11V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4M3 11h18M3 11v6m18-6v6M6 11V9m0 0h5v2" />
  </StatIcon>
);
const FloorIcon = (
  <StatIcon>
    <path d="M3 20h3v-3h3v-3h3v-3h3v-3h3" />
  </StatIcon>
);
const PriceIcon = (
  <StatIcon>
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-6.2-6.2a2 2 0 0 1-.6-1.4V5a1 1 0 0 1 1-1h7a2 2 0 0 1 1.4.6l6.4 6.4a2 2 0 0 1 0 2.8z" />
    <circle cx="8.5" cy="8.5" r="1.3" />
  </StatIcon>
);

// Kinowy hero oferty: zdjęcie wiodące na całą szerokość z powolnym zoomem
// i parallaxem, ciemnozielone przyciemnienie pod tekst, złota poświata oraz
// szklana karta z ceną i kluczowymi parametrami. To JEDYNY <h1> strony.
export default function OfferHero({
  offer,
  leadImage,
  photoCount,
  phoneHref,
}: {
  offer: Offer;
  leadImage: string;
  photoCount: number;
  phoneHref: string;
}) {
  const imgRef = useRef<HTMLDivElement | null>(null);

  // Parallax — tło sunie wolniej niż scroll (efekt głębi). Wyłączony przy
  // prefers-reduced-motion. rAF throttluje aktualizacje dla płynności.
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = Math.min(window.scrollY * 0.28, 160);
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const stats: { label: string; value: React.ReactNode; icon: React.ReactNode }[] =
    [
      {
        label: "Powierzchnia",
        value: formatArea(offer.areaTotal),
        icon: AreaIcon,
      },
      { label: "Pokoje", value: offer.rooms ?? "—", icon: RoomsIcon },
      { label: "Piętro", value: offer.floor ?? "—", icon: FloorIcon },
      {
        label: "Cena za m²",
        value: offer.pricePerMeter
          ? `${formatPrice(offer.pricePerMeter)}/m²`
          : "—",
        icon: PriceIcon,
      },
    ];

  return (
    <section
      id="oferta-hero"
      className="relative isolate flex min-h-[78vh] items-end overflow-hidden border-b border-gold-500/10 pt-36 pb-12 sm:min-h-[84vh] sm:pb-16 print:hidden"
    >
      {/* Tło: zdjęcie wiodące z parallaxem + kinowym zoomem (osobne warstwy,
          żeby transformy się nie nakładały). Wyższy kontener daje zapas na
          przesuw parallaxu bez odsłaniania krawędzi. */}
      <div
        ref={imgRef}
        className="absolute inset-x-0 -top-[8%] -z-20 h-[116%] will-change-transform"
      >
        {leadImage ? (
          <Image
            src={leadImage}
            alt={formatOfferHeading(offer)}
            fill
            priority
            sizes="100vw"
            className="fh-hero-img object-cover object-center"
          />
        ) : (
          <div className="h-full w-full bg-forest-900" />
        )}
      </div>

      {/* Przyciemnienie pod tekst + złota poświata + zlanie z tłem strony */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950 via-forest-950/72 to-forest-950/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-950/85 via-transparent to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_18%,rgba(197,164,78,0.20),transparent_55%)]"
        aria-hidden
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          {/* Pigułki: numer oferty, liczba zdjęć (bez etykiety transakcji) */}
          <div className="fh-hero-rise fh-hero-rise-1 flex flex-wrap items-center gap-2.5">
            <span className="rounded-full border border-cream/20 bg-forest-950/45 px-3 py-1 text-xs text-cream/80 backdrop-blur">
              Oferta {offer.id}
            </span>
            {photoCount > 0 ? (
              <button
                type="button"
                onClick={() => scrollTo("galeria")}
                className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-forest-950/45 px-3 py-1 text-xs text-cream/80 backdrop-blur transition hover:border-gold-400/50 hover:text-gold-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path
                    d="M4 5h16v11H4zM2 20h20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {photoCount} zdjęć
              </button>
            ) : null}
          </div>

          <h1 className="fh-hero-rise fh-hero-rise-2 mt-4 font-display text-4xl leading-[1.08] text-cream drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl">
            {formatOfferHeading(offer)}
          </h1>

          <p className="fh-hero-rise fh-hero-rise-2 mt-3 flex items-center gap-2 text-base text-cream/85 sm:text-lg">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 flex-none text-gold-400"
              aria-hidden="true"
            >
              <path
                d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="10"
                r="2.4"
                stroke="currentColor"
                strokeWidth="1.7"
              />
            </svg>
            {formatOfferPlace(offer)}
          </p>

          {/* Szklana karta: cena + CTA + kluczowe parametry */}
          <div className="fh-hero-rise fh-hero-rise-3 mt-7 w-full max-w-2xl rounded-2xl border border-gold-500/20 bg-forest-950/55 p-5 backdrop-blur-md sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-cream/55">
                  Cena
                </p>
                <p className="font-display text-3xl text-gold-400 sm:text-4xl">
                  {formatPrice(offer.price)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {photoCount > 0 ? (
                  <button
                    type="button"
                    onClick={() => scrollTo("galeria")}
                    className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
                  >
                    Zobacz zdjęcia
                  </button>
                ) : null}
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-gold-500/35 px-5 py-2.5 text-sm font-semibold text-cream/90 transition hover:border-gold-500/60 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/70"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.5.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .56 3.5 1 1 0 0 1-.24 1z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Zadzwoń
                </a>
              </div>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-gold-500/15 pt-5 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex-none text-gold-400">
                    {s.icon}
                  </span>
                  <div className="flex flex-col">
                    <dt className="text-[0.7rem] uppercase tracking-wider text-cream/55">
                      {s.label}
                    </dt>
                    <dd className="mt-0.5 font-display text-lg text-cream sm:text-xl">
                      {s.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Wskazówka „przewiń do galerii" */}
      {photoCount > 0 ? (
        <button
          type="button"
          onClick={() => scrollTo("galeria")}
          aria-label="Przewiń do galerii"
          className="fh-bob absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-cream/55 transition hover:text-gold-300 lg:block"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : null}
    </section>
  );
}
