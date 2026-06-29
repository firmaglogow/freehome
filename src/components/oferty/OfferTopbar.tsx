"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type OfferSection = { id: string; label: string };

// Górny pasek oferty (inspirowany starą stroną, ale czytelniejszy):
//  • narożniki: po lewej „Udostępnij" (Facebook), po prawej „Drukuj ofertę",
//  • niżej, na jednym poziomie dla symetrii: po lewej „← Wróć do ofert",
//    po prawej skróty do sekcji (Opis · Lokalizacja · Film) ze złotą kreseczką
//    pod aktywną pozycją. Kliknięcie płynnie przewija do sekcji (smooth-scroll
//    mamy globalnie w globals.css), a aktywną pozycję śledzi IntersectionObserver.
export default function OfferTopbar({
  sections,
  shareUrl,
}: {
  sections: OfferSection[];
  shareUrl: string;
}) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  // Scrollspy: podświetlamy sekcję, która jest najbliżej górnej krawędzi ekranu.
  useEffect(() => {
    if (sections.length === 0) return;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Okno obserwacji przesunięte pod stały nagłówek strony.
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  // Udostępnienie przez Facebooka — okno dialogowe sharera (nie cała karta).
  const share = () => {
    const u = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(u, "fb-share", "width=620,height=520,noopener,noreferrer");
  };

  return (
    <div className="mb-6">
      {/* Narożniki: Udostępnij ↔ Drukuj */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={share}
          className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-forest-800 px-4 py-2 text-sm text-cream/85 transition hover:border-gold-500/50 hover:text-gold-300"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
          </svg>
          Udostępnij
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-forest-800 px-4 py-2 text-sm text-cream/85 transition hover:border-gold-500/50 hover:text-gold-300"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
              d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M6 14h12v7H6z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Drukuj ofertę
        </button>
      </div>

      {/* Poziom symetrii: Wróć do ofert ↔ skróty do sekcji */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-gold-500/10 pt-4">
        <Link
          href="/oferty"
          className="text-sm text-cream/60 transition hover:text-gold-300"
        >
          ← Wróć do ofert
        </Link>

        {sections.length > 0 ? (
          <nav aria-label="Sekcje oferty" className="flex items-center gap-1">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    "relative px-3 py-1.5 text-sm transition " +
                    (isActive
                      ? "text-gold-300"
                      : "text-cream/65 hover:text-gold-300")
                  }
                >
                  {s.label}
                  {/* Złota kreseczka pod aktywną pozycją */}
                  <span
                    className={
                      "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold-400 transition-opacity " +
                      (isActive ? "opacity-100" : "opacity-0")
                    }
                  />
                </a>
              );
            })}
          </nav>
        ) : null}
      </div>
    </div>
  );
}
