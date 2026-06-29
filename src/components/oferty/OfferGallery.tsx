"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// Galeria oferty w układzie mozaiki: duże zdjęcie wiodące + kafelki, kliknięcie
// otwiera lightbox (pełny ekran) z nawigacją strzałkami / klawiaturą / swipem.
// Plany (Esti picture type=120) mają osobną zakładkę i prostszą siatkę.
export default function OfferGallery({
  images,
  plans = [],
  title,
  badge,
}: {
  images: string[];
  plans?: string[];
  title: string;
  badge?: string;
}) {
  const hasPlans = plans.length > 0;
  // Gdy oferta nie ma zwykłych zdjęć, a ma plan — startujemy od planu.
  const [view, setView] = useState<"photos" | "plans">(
    images.length === 0 && hasPlans ? "plans" : "photos"
  );
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const active = view === "plans" ? plans : images;
  const count = active.length;
  const isPlan = view === "plans";

  const go = useCallback(
    (dir: number) => {
      setIndex((i) => (count ? (i + dir + count) % count : 0));
    },
    [count]
  );

  const openAt = (i: number) => {
    setIndex(i);
    setLightbox(true);
  };

  const switchView = (next: "photos" | "plans") => {
    setView(next);
    setIndex(0);
  };

  // Klawiatura: strzałki nawigują, Esc zamyka lightbox.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    if (lightbox) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [lightbox, go]);

  // Blokada scrolla strony, gdy lightbox otwarty.
  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  // Swipe (mobile) — tylko w lightboxie.
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  if (count === 0) return null;

  const current = active[index] ?? active[0];

  // Pojedynczy kafelek mozaiki (zwykła funkcja-helper, nie komponent — żeby nie
  // tworzyć komponentów w renderze). Otwiera lightbox na danym zdjęciu.
  const tile = (
    i: number,
    src: string,
    className?: string,
    overlay?: React.ReactNode
  ) => (
    <button
      key={src}
      type="button"
      onClick={() => openAt(i)}
      aria-label={`Powiększ ${isPlan ? "plan" : "zdjęcie"} ${i + 1}`}
      className={
        "group relative overflow-hidden rounded-2xl border border-gold-500/15 bg-forest-800 " +
        (className ?? "")
      }
    >
      <Image
        src={src}
        alt={`${title} — ${isPlan ? "plan" : "zdjęcie"} ${i + 1}`}
        fill
        sizes="(max-width: 1024px) 50vw, 30vw"
        className={
          isPlan
            ? "bg-ivory object-contain p-2"
            : "object-cover transition-transform duration-700 group-hover:scale-105"
        }
      />
      {overlay}
    </button>
  );

  const badgeOverlay =
    badge && !isPlan ? (
      <span className="pointer-events-none absolute left-4 top-4 z-[1] rounded-full bg-forest-950/80 px-3 py-1 text-xs font-medium text-gold-300 backdrop-blur">
        {badge}
      </span>
    ) : null;

  const arrow = (dir: number, label: string) => (
    <button
      key={label}
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        go(dir);
      }}
      className="absolute top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-forest-950/70 text-cream backdrop-blur transition hover:bg-forest-950/90 hover:text-gold-300"
      style={dir < 0 ? { left: "0.75rem" } : { right: "0.75rem" }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d={dir < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  // ---- Mozaika zdjęć (różne układy zależnie od liczby zdjęć) ----------------
  const photoMosaic = () => {
    if (count === 1) {
      return tile(0, active[0], "aspect-[16/10]", badgeOverlay);
    }
    if (count === 2) {
      return (
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {tile(0, active[0], "aspect-[4/3]", badgeOverlay)}
          {tile(1, active[1], "aspect-[4/3]")}
        </div>
      );
    }
    if (count === 3) {
      return (
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {tile(0, active[0], "col-span-2 aspect-[16/9]", badgeOverlay)}
          {tile(1, active[1], "aspect-[4/3]")}
          {tile(2, active[2], "aspect-[4/3]")}
        </div>
      );
    }
    if (count === 4) {
      return (
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {active
            .slice(0, 4)
            .map((src, i) =>
              tile(i, src, "aspect-[4/3]", i === 0 ? badgeOverlay : undefined)
            )}
        </div>
      );
    }
    // count >= 5 — układ „Airbnb": duże zdjęcie + 4 kafelki, „+N" na ostatnim.
    const remaining = count - 5;
    return (
      <>
        {/* Mobile: tylko duże zdjęcie (resztę odsłania przycisk pod spodem) */}
        <div className="sm:hidden">
          {tile(0, active[0], "aspect-[4/3]", badgeOverlay)}
        </div>
        {/* sm+ : pełna mozaika */}
        <div className="hidden aspect-[2/1] grid-cols-4 grid-rows-2 gap-3 sm:grid">
          {tile(0, active[0], "col-span-2 row-span-2", badgeOverlay)}
          {tile(1, active[1])}
          {tile(2, active[2])}
          {tile(3, active[3])}
          {tile(
            4,
            active[4],
            undefined,
            remaining > 0 ? (
              <span className="absolute inset-0 grid place-items-center bg-forest-950/65 text-lg font-semibold text-cream backdrop-blur-[2px] transition group-hover:bg-forest-950/55">
                +{remaining}
              </span>
            ) : undefined
          )}
        </div>
      </>
    );
  };

  return (
    <div>
      {/* Zakładki: Zdjęcia / Plan mieszkania (tylko gdy są oba zestawy) */}
      {hasPlans && images.length > 0 ? (
        <div className="mb-3 inline-flex rounded-full border border-gold-500/20 bg-forest-800 p-1 text-sm">
          <button
            type="button"
            onClick={() => switchView("photos")}
            className={
              "rounded-full px-4 py-1.5 font-medium transition " +
              (!isPlan
                ? "bg-gold-500 text-forest-950"
                : "text-cream/75 hover:text-gold-300")
            }
          >
            Zdjęcia ({images.length})
          </button>
          <button
            type="button"
            onClick={() => switchView("plans")}
            className={
              "rounded-full px-4 py-1.5 font-medium transition " +
              (isPlan
                ? "bg-gold-500 text-forest-950"
                : "text-cream/75 hover:text-gold-300")
            }
          >
            Plan mieszkania ({plans.length})
          </button>
        </div>
      ) : null}

      {/* Podgląd: mozaika zdjęć lub prosta siatka planów */}
      {isPlan ? (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
          {active.map((src, i) => tile(i, src, "aspect-[4/3]"))}
        </div>
      ) : (
        photoMosaic()
      )}

      {/* „Pokaż wszystkie" — pełny dostęp do galerii (też dla mobile) */}
      {count > 1 ? (
        <button
          type="button"
          onClick={() => openAt(0)}
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-forest-800 px-4 py-2 text-sm text-cream/85 transition hover:border-gold-500/50 hover:text-gold-300"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              d="M3 5h7v6H3zM14 5h7v6h-7zM3 13h7v6H3zM14 13h7v6h-7z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </svg>
          Pokaż wszystkie {isPlan ? "plany" : "zdjęcia"} ({count})
        </button>
      ) : null}

      {/* Lightbox */}
      {lightbox ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
          onClick={() => setLightbox(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — galeria`}
        >
          <button
            type="button"
            aria-label="Zamknij"
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-cream transition hover:bg-white/20 hover:text-gold-300"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {count > 1 ? (
            <span className="absolute left-1/2 top-5 z-10 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-cream backdrop-blur">
              {index + 1} / {count}
            </span>
          ) : null}

          <div
            className="relative h-full w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={current}
              src={current}
              alt={`${title} — ${isPlan ? "plan" : "zdjęcie"} ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {count > 1 ? (
            <>
              {arrow(-1, "Poprzednie")}
              {arrow(1, "Następne")}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
