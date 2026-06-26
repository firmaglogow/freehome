"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// Galeria oferty: duże zdjęcie + miniatury, nawigacja strzałkami/klawiaturą/swipe,
// licznik, lightbox (pełny ekran) oraz osobna zakładka „Plan mieszkania" dla
// rzutów (Esti picture type=120, oddzielone w imporcie do pola `plans`).
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

  const switchView = (next: "photos" | "plans") => {
    setView(next);
    setIndex(0);
  };

  // Klawiatura: działa zawsze dla strzałek, a Esc zamyka lightbox.
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

  // Swipe (mobile).
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

  const Arrow = ({ dir, label }: { dir: number; label: string }) => (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        go(dir);
      }}
      className="absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-forest-950/70 text-cream backdrop-blur transition hover:bg-forest-950/90 hover:text-gold-300"
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

      {/* Główne zdjęcie */}
      <div
        className="group relative aspect-[16/10] cursor-zoom-in overflow-hidden rounded-3xl border border-gold-500/15"
        onClick={() => setLightbox(true)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          key={current}
          src={current}
          alt={`${title} — ${isPlan ? "plan" : "zdjęcie"} ${index + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
          className={
            isPlan
              ? "bg-ivory object-contain p-2"
              : "object-cover transition-transform duration-700 group-hover:scale-105"
          }
        />

        {badge && !isPlan ? (
          <span className="absolute left-4 top-4 rounded-full bg-forest-950/80 px-3 py-1 text-xs font-medium text-gold-300 backdrop-blur">
            {badge}
          </span>
        ) : null}

        {count > 1 ? (
          <span className="absolute right-4 top-4 rounded-full bg-forest-950/80 px-3 py-1 text-xs font-medium text-cream backdrop-blur">
            {index + 1} / {count}
          </span>
        ) : null}

        {count > 1 ? (
          <>
            <Arrow dir={-1} label="Poprzednie" />
            <Arrow dir={1} label="Następne" />
          </>
        ) : null}
      </div>

      {/* Miniatury */}
      {count > 1 ? (
        <div className="mt-4 grid grid-cols-5 gap-3 sm:grid-cols-6 lg:grid-cols-8">
          {active.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Pokaż ${isPlan ? "plan" : "zdjęcie"} ${i + 1}`}
              className={
                "relative aspect-[4/3] overflow-hidden rounded-xl border transition " +
                (i === index
                  ? "border-gold-400 ring-1 ring-gold-400"
                  : "border-gold-500/15 hover:border-gold-500/40")
              }
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 1024px) 20vw, 10vw"
                className={isPlan ? "bg-ivory object-contain p-1" : "object-cover"}
              />
            </button>
          ))}
        </div>
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
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
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
              <Arrow dir={-1} label="Poprzednie" />
              <Arrow dir={1} label="Następne" />
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
