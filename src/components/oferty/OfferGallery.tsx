"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// Galeria oferty: jedno duże zdjęcie wiodące ze strzałkami (lewo/prawo) +
// przesuwany pasek miniatur (4 w rzędzie, nawigacja chevronami aż do końca).
// Kliknięcie otwiera lightbox (pełny ekran) z nawigacją strzałkami / klawiaturą
// / swipem. Plany (Esti picture type=120) mają osobną zakładkę.
export default function OfferGallery({
  images,
  plans = [],
  title,
}: {
  images: string[];
  plans?: string[];
  title: string;
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

  // Pasek miniatur — automatyczne dosunięcie aktywnej miniatury do środka.
  // Skroll liczony ręcznie (scrollTo na kontenerze), by nie ruszać całej strony.
  const railRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = railRef.current;
    const child = el?.children[index] as HTMLElement | undefined;
    if (el && child) {
      const target =
        child.offsetLeft - el.clientWidth / 2 + child.clientWidth / 2;
      el.scrollTo({ left: target, behavior: "smooth" });
    }
  }, [index, view]);

  const scrollRail = (dir: number) => {
    const el = railRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  // Swipe (mobile) — w lightboxie oraz na dużym zdjęciu wiodącym.
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

  // Strzałka nawigacji (lewo/prawo). Używana na dużym zdjęciu i w lightboxie.
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

      {/* Duże zdjęcie wiodące — klik otwiera lightbox; strzałki przerzucają. */}
      <div
        className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-gold-500/15 bg-forest-800"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          type="button"
          onClick={() => openAt(index)}
          aria-label={`Powiększ ${isPlan ? "plan" : "zdjęcie"} ${index + 1}`}
          className="absolute inset-0"
        >
          <Image
            key={current}
            src={current}
            alt={`${title} — ${isPlan ? "plan" : "zdjęcie"} ${index + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className={
              isPlan
                ? "bg-ivory object-contain p-2"
                : "object-cover transition-transform duration-700 group-hover:scale-105"
            }
          />
        </button>

        {count > 1 ? (
          <>
            {arrow(-1, "Poprzednie")}
            {arrow(1, "Następne")}
            <span className="pointer-events-none absolute bottom-3 right-3 z-[1] rounded-full bg-forest-950/75 px-3 py-1 text-xs text-cream backdrop-blur">
              {index + 1} / {count}
            </span>
          </>
        ) : null}
      </div>

      {/* Pasek miniatur — 4 w rzędzie, przesuwany chevronami aż do końca. */}
      {count > 1 ? (
        <div className="relative mt-2.5 sm:mt-3">
          <div
            ref={railRef}
            className="flex snap-x gap-2.5 overflow-x-auto scroll-smooth pb-1 sm:gap-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {active.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Pokaż ${isPlan ? "plan" : "zdjęcie"} ${i + 1}`}
                aria-current={i === index}
                className={
                  "relative aspect-[4/3] w-[calc((100%-2*0.625rem)/3)] flex-none snap-start overflow-hidden rounded-xl border bg-forest-800 transition sm:w-[calc((100%-3*0.75rem)/4)] " +
                  (i === index
                    ? "border-gold-500 ring-2 ring-gold-500/60"
                    : "border-gold-500/15 opacity-70 hover:opacity-100")
                }
              >
                <Image
                  src={src}
                  alt={`${title} — ${isPlan ? "plan" : "miniatura"} ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 33vw, 18vw"
                  className={
                    isPlan ? "bg-ivory object-contain p-1" : "object-cover"
                  }
                />
              </button>
            ))}
          </div>

          {/* Chevrony przesuwania paska (gdy miniatur jest więcej niż widać) */}
          {count > 4 ? (
            <>
              <button
                type="button"
                aria-label="Przewiń miniatury w lewo"
                onClick={() => scrollRail(-1)}
                className="absolute left-1 top-1/2 z-[1] hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-forest-950/80 text-cream backdrop-blur transition hover:bg-forest-950 hover:text-gold-300 sm:grid"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    d="M15 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Przewiń miniatury w prawo"
                onClick={() => scrollRail(1)}
                className="absolute right-1 top-1/2 z-[1] hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-forest-950/80 text-cream backdrop-blur transition hover:bg-forest-950 hover:text-gold-300 sm:grid"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          ) : null}
        </div>
      ) : null}

      {/* „Pokaż wszystkie" — otwiera lightbox na bieżącym zdjęciu. */}
      {count > 1 ? (
        <button
          type="button"
          onClick={() => openAt(index)}
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
