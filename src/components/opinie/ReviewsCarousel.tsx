"use client";

import { useRef, useState } from "react";
import type { Review } from "@/lib/site";

// Powyżej tej długości opinia jest skracana wielokropkiem (rozwijana „Zobacz więcej").
const TRUNCATE_AT = 200;

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const scrollByCards = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-cream/50">
          Przesuń, aby zobaczyć kolejne opinie →
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label="Poprzednie opinie"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 text-gold-400 transition hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-300"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label="Następne opinie"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 text-gold-400 transition hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-300"
          >
            <Chevron dir="right" />
          </button>
        </div>
      </div>

      <div className="relative">
      {/* Gradientowe „zanikanie" sygnalizujące, że są kolejne karty */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-forest-950 to-transparent" aria-hidden="true" />
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => {
          const isLong = r.text.length > TRUNCATE_AT;
          const isOpen = expanded.has(i);
          const shown =
            isLong && !isOpen
              ? r.text.slice(0, TRUNCATE_AT).trimEnd() + "…"
              : r.text;
          return (
            <figure
              key={i}
              data-card
              className="flex w-[85vw] max-w-[360px] shrink-0 snap-start flex-col rounded-2xl border border-gold-500/15 bg-forest-800 p-6 sm:w-[360px]"
            >
              <div className="text-gold-400" aria-label="5 na 5 gwiazdek">
                ★★★★★
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-cream/80">
                „{shown}"
              </blockquote>
              {isLong && (
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="mt-3 self-start text-xs font-semibold uppercase tracking-wide text-gold-400 transition hover:text-gold-300"
                >
                  {isOpen ? "Zwiń" : "Zobacz więcej"}
                </button>
              )}
              <figcaption className="mt-4 flex items-center justify-between gap-2 text-sm font-semibold text-cream">
                <span>— {r.name}</span>
                {r.source && (
                  <span className="text-xs font-normal text-cream/60">
                    {r.source}
                  </span>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>
      </div>
    </div>
  );
}
