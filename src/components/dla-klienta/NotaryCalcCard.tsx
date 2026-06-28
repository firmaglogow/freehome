"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// basePath musi być spójny z next.config.ts / image-loader.ts.
// Kalkulator notarialny to samodzielny plik statyczny w public/kalkulator-notarialny/
// — nie jest trasą Next, więc adres iframe musi sam dokleić prefiks
// (na własnej domenie pusty, na GitHub Pages „/freehome").
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/freehome";
const KALKULATOR_URL = `${BASE_PATH}/kalkulator-notarialny/`;

// Ikona kalkulatora notarialnego: dokument (akt) z pieczęcią = „akt notarialny".
// Kolory spójne z resztą kafelków: czerwona pieczęć, złote linie tekstu na akcie.
function NotaryMark() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className="h-9 w-9">
      {/* kartka aktu */}
      <rect x="11" y="7" width="22" height="30" rx="2.5" fill="#e0b13c" />
      {/* linie tekstu */}
      <rect x="15" y="13" width="14" height="2" rx="1" fill="#0c1f15" opacity="0.55" />
      <rect x="15" y="18" width="14" height="2" rx="1" fill="#0c1f15" opacity="0.55" />
      <rect x="15" y="23" width="9" height="2" rx="1" fill="#0c1f15" opacity="0.55" />
      {/* pieczęć notarialna */}
      <circle cx="32" cy="33" r="8.5" fill="#d24c3a" stroke="#f3efe3" strokeWidth="1.6" />
      <path
        d="M28.6 33l2.3 2.3 4.5-4.5"
        stroke="#f3efe3"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Szósty kafelek strony „Dla klienta": kalkulator kosztów notarialnych.
 * Kafelek dopasowany 1:1 do siatki pozostałych kafelków (te same klasy),
 * ale zamiast linku otwiera modal z kalkulatorem osadzonym w <iframe>.
 * Iframe ładuje się leniwie — adres ustawiamy dopiero przy 1. otwarciu.
 * Modal zamykany na: ✕, klawisz Esc oraz kliknięcie w tło. ≤640px = pełny ekran.
 */
export default function NotaryCalcCard() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false); // lazy-load iframe przy 1. otwarciu
  const [mounted, setMounted] = useState(false); // portal dostępny dopiero na kliencie
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Portal renderuje modal do <body>, poza wrapper <Reveal>, który ma CSS
  // `transform` (animacja). Element z transformem staje się blokiem zawierającym
  // dla `position: fixed` — bez portalu modal byłby uwięziony w komórce siatki
  // (≈468 px), zamiast pokryć cały ekran. Portal to omija.
  useEffect(() => setMounted(true), []);

  const openModal = useCallback(() => {
    setLoaded(true);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => setOpen(false), []);

  // Esc zamyka + blokada przewijania tła, gdy modal otwarty.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeModal]);

  const cardCls =
    "group flex h-full w-full cursor-pointer flex-col rounded-2xl border border-gold-500/15 bg-forest-800 p-8 text-left transition hover:border-gold-500/40 hover:bg-forest-800/80";

  return (
    <>
      <button type="button" onClick={openModal} className={cardCls}>
        <div className="flex items-center justify-between">
          <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-forest-950/60 ring-1 ring-gold-500/20">
            <NotaryMark />
          </span>
          <span className="rounded-full border border-gold-500/25 bg-forest-950/40 px-3 py-1 text-xs font-medium text-gold-300">
            Z suwakiem
          </span>
        </div>
        <h2 className="mt-6 font-display text-2xl text-cream group-hover:text-gold-300">
          Policz koszta notarialne
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/70">
          Sprawdź, ile poza ceną mieszkania zapłacisz przy zakupie: taksa
          notarialna, podatek PCC, opłaty sądowe (księga wieczysta, hipoteka) i
          wypisy aktu. Wpisz cenę, wybierz rynek i sposób zakupu — koszty
          policzą się od razu.
        </p>
        <span className="mt-6 text-sm font-semibold text-gold-400">
          Policz koszty →
        </span>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-forest-950/80 p-4 backdrop-blur-sm max-sm:p-0"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Kalkulator kosztów notarialnych"
        >
          <div className="relative h-[92vh] w-full max-w-[1200px] overflow-hidden rounded-2xl bg-[#f5f3ee] shadow-2xl max-sm:h-screen max-sm:max-w-full max-sm:rounded-none">
            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeModal}
              aria-label="Zamknij kalkulator"
              className="absolute right-3.5 top-3.5 z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-forest-900/90 text-lg text-cream shadow-lg backdrop-blur-sm transition hover:rotate-90 hover:bg-forest-950"
            >
              ✕
            </button>
            {loaded && (
              <iframe
                src={KALKULATOR_URL}
                title="Kalkulator kosztów notarialnych"
                loading="lazy"
                className="block h-full w-full border-0"
              />
            )}
          </div>
          </div>,
          document.body,
        )}
    </>
  );
}
