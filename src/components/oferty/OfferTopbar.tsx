"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type OfferSection = {
  id: string;
  label: string;
  // Gdy ustawione, klik przełącza widok galerii (Zdjęcia/Plan) zamiast zwykłego
  // skoku do kotwicy — oba prowadzą do tej samej sekcji #galeria.
  view?: "photos" | "plans";
};

// Górny pasek oferty — JEDEN spójny „command bar" (szklana belka) zamiast dwóch
// oddzielnych rzędów. Płynnie domyka przejście z kinowego hero do treści:
//  • po lewej: „Wróć do ofert" + skróty do sekcji (Opis · Lokalizacja · Film),
//    aktywna pozycja podświetlona złotą pigułką (scrollspy = IntersectionObserver),
//  • po prawej: akcje „Udostępnij" (Facebook) i „Drukuj".
// Przyciski to ciche linki tekstowe, które rozjaśniają się dopiero pod kursorem —
// dzięki temu belka jest lekka i elegancka, a nie „dwa zielone paski".
// Na desktopie (lg+) belka jest PRZYKLEJANA pod głównym menu (sticky top-20):
// „jedzie" z użytkownikiem przez całą treść oferty, więc nawigacja po sekcjach
// jest dostępna cały czas (efekt premium). Granicę przyklejenia wyznacza wrapper
// w page.tsx — belka zwalnia się tuż przed sekcją „Podobne oferty".
export default function OfferTopbar({
  sections,
  shareUrl,
}: {
  sections: OfferSection[];
  shareUrl: string;
}) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");
  // Aktualny widok galerii (Zdjęcia/Plan) — żeby podświetlić właściwą pigułkę,
  // gdy sekcja #galeria jest na ekranie. Galeria nadaje zmiany przez event.
  const [galleryView, setGalleryView] = useState<"photos" | "plans">("photos");

  // Scrollspy: podświetlamy sekcję, która jest najbliżej górnej krawędzi ekranu.
  useEffect(() => {
    if (sections.length === 0) return;
    // Zdjęcia i Plan mieszkania dzielą tę samą kotwicę (#galeria) — obserwujemy
    // każdy element tylko raz.
    const ids = Array.from(new Set(sections.map((s) => s.id)));
    const els = ids
      .map((id) => document.getElementById(id))
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

  // Galeria nadaje swój aktualny widok (po kliknięciu zakładek w środku lub po
  // starcie) — synchronizujemy podświetlenie pigułek Zdjęcia/Plan na pasku.
  useEffect(() => {
    const onChanged = (e: Event) => {
      const v = (e as CustomEvent<"photos" | "plans">).detail;
      if (v === "photos" || v === "plans") setGalleryView(v);
    };
    window.addEventListener("offer-gallery-view-changed", onChanged);
    return () => window.removeEventListener("offer-gallery-view-changed", onChanged);
  }, []);

  // Klik w „Zdjęcia"/„Plan mieszkania": przełącz widok galerii (event do
  // OfferGallery) i płynnie przewiń do sekcji #galeria.
  const goToView = (e: React.MouseEvent, s: OfferSection) => {
    if (!s.view) return; // zwykłe kotwice obsługuje natywny <a href>
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("offer-gallery-view", { detail: s.view })
    );
    setGalleryView(s.view);
    setActive(s.id);
    document
      .getElementById(s.id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Udostępnienie przez Facebooka — okno dialogowe sharera (nie cała karta).
  const share = () => {
    const u = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(u, "fb-share", "width=620,height=520,noopener,noreferrer");
  };

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-2xl border border-gold-500/15 bg-forest-900/55 px-2.5 py-2 backdrop-blur sm:px-3 lg:sticky lg:top-20 lg:z-30 lg:bg-forest-900/80">
      {/* Lewa strona: powrót + skróty do sekcji */}
      <div className="flex flex-wrap items-center gap-y-1">
        <Link
          href="/oferty"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-cream/70 transition hover:bg-forest-800 hover:text-gold-300"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hidden sm:inline">Wróć do ofert</span>
          <span className="sm:hidden">Oferty</span>
        </Link>

        {sections.length > 0 ? (
          <>
            <span
              className="mx-1.5 hidden h-5 w-px bg-gold-500/15 sm:block"
              aria-hidden
            />
            <nav
              aria-label="Sekcje oferty"
              className="flex flex-wrap items-center gap-0.5"
            >
              {sections.map((s) => {
                // Pigułki galerii (Zdjęcia/Plan) dzielą id #galeria — aktywność
                // rozróżniamy po aktualnym widoku galerii.
                const isActive = s.view
                  ? active === s.id && galleryView === s.view
                  : active === s.id;
                return (
                  <a
                    key={s.view ?? s.id}
                    href={`#${s.id}`}
                    onClick={(e) => goToView(e, s)}
                    aria-current={isActive ? "true" : undefined}
                    className={
                      "rounded-full px-3 py-1.5 text-sm transition " +
                      (isActive
                        ? "bg-gold-500/15 text-gold-300"
                        : "text-cream/65 hover:bg-forest-800 hover:text-gold-300")
                    }
                  >
                    {s.label}
                  </a>
                );
              })}
            </nav>
          </>
        ) : null}
      </div>

      {/* Prawa strona: akcje (Udostępnij ↔ Drukuj) */}
      <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={share}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-cream/75 transition hover:bg-forest-800 hover:text-gold-300"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
          </svg>
          <span className="hidden sm:inline">Udostępnij</span>
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-cream/75 transition hover:bg-forest-800 hover:text-gold-300"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M6 14h12v7H6z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hidden sm:inline">Drukuj</span>
        </button>
      </div>
    </div>
  );
}
