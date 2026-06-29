"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Przyklejona dolna mini-belka oferty. Pojawia się dopiero po przewinięciu
// hero (IntersectionObserver na sekcji #oferta-hero) i zostaje z użytkownikiem
// jako stałe wezwanie do działania: miniatura + cena + „Zostaw numer".
export default function OfferStickyBar({
  title,
  price,
  image,
  phoneHref,
}: {
  title: string;
  price: string;
  image: string;
  phoneHref: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("oferta-hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { rootMargin: "-100px 0px 0px 0px", threshold: 0 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const goContact = () =>
    document
      .getElementById("zapytaj")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div
      className={
        "fixed inset-x-0 bottom-0 z-40 border-t border-gold-500/20 bg-forest-950/95 backdrop-blur transition-transform duration-300 print:hidden " +
        (show ? "translate-y-0" : "pointer-events-none translate-y-full")
      }
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-8">
        {image ? (
          <div className="relative hidden h-12 w-16 flex-none overflow-hidden rounded-lg border border-gold-500/15 sm:block">
            <Image src={image} alt="" fill sizes="64px" className="object-cover" />
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-cream/80">{title}</p>
          <p className="font-display text-lg leading-tight text-gold-400">
            {price}
          </p>
        </div>

        <a
          href={phoneHref}
          className="hidden items-center gap-2 rounded-full border border-gold-500/30 px-4 py-2 text-sm text-cream/85 transition hover:border-gold-500/55 hover:text-gold-300 sm:inline-flex"
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

        <button
          type="button"
          onClick={goContact}
          className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
        >
          Zostaw numer
        </button>
      </div>
    </div>
  );
}
