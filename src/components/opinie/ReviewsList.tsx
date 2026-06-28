"use client";

import { useMemo, useState } from "react";
import type { GoogleReview } from "@/lib/googleReviews";

type SortOrder = "newest" | "oldest";
type RatingFilter = "all" | "positive" | "critical";

// Data ISO (RRRR-MM-DD) → czytelny format PL (DD.MM.RRRR).
function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return `${m[3]}.${m[2]}.${m[1]}`;
}

function Stars({ rating }: { rating: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span className="text-gold-400" aria-label={`${full} na 5 gwiazdek`}>
      <span aria-hidden="true">
        {"★".repeat(full)}
        <span className="text-cream/25">{"★".repeat(5 - full)}</span>
      </span>
    </span>
  );
}

export default function ReviewsList({ reviews }: { reviews: GoogleReview[] }) {
  const [sort, setSort] = useState<SortOrder>("newest");
  const [filter, setFilter] = useState<RatingFilter>("all");

  const visible = useMemo(() => {
    const filtered = reviews.filter((r) => {
      if (filter === "positive") return r.rating >= 4;
      if (filter === "critical") return r.rating <= 3;
      return true;
    });
    return [...filtered].sort((a, b) =>
      sort === "newest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    );
  }, [reviews, sort, filter]);

  const segBtn = (active: boolean) =>
    [
      "rounded-full px-4 py-2 text-sm font-semibold transition",
      active
        ? "bg-gold-500 text-forest-950"
        : "border border-gold-500/30 text-gold-400 hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-300",
    ].join(" ");

  return (
    <div>
      {/* Sterowanie: sortowanie + filtr oceny */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Sortowanie opinii"
        >
          <span className="mr-1 text-sm text-cream/60">Sortuj:</span>
          <button
            type="button"
            className={segBtn(sort === "newest")}
            aria-pressed={sort === "newest"}
            onClick={() => setSort("newest")}
          >
            Najnowsze
          </button>
          <button
            type="button"
            className={segBtn(sort === "oldest")}
            aria-pressed={sort === "oldest"}
            onClick={() => setSort("oldest")}
          >
            Najstarsze
          </button>
        </div>

        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filtr oceny opinii"
        >
          <span className="mr-1 text-sm text-cream/60">Pokaż:</span>
          <button
            type="button"
            className={segBtn(filter === "all")}
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            Wszystkie
          </button>
          <button
            type="button"
            className={segBtn(filter === "positive")}
            aria-pressed={filter === "positive"}
            onClick={() => setFilter("positive")}
          >
            Tylko pozytywne
          </button>
          <button
            type="button"
            className={segBtn(filter === "critical")}
            aria-pressed={filter === "critical"}
            onClick={() => setFilter("critical")}
          >
            Tylko krytyczne
          </button>
        </div>
      </div>

      <p className="mb-6 text-sm text-cream/50" aria-live="polite">
        Pokazujemy {visible.length}{" "}
        {visible.length === 1 ? "opinię" : "opinii"} z {reviews.length}.
      </p>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-gold-500/15 bg-forest-800 p-10 text-center">
          <p className="font-display text-xl text-cream">
            Brak opinii w tym widoku 🎉
          </p>
          <p className="mt-2 text-sm text-cream/70">
            Wszystkie zebrane opinie mają ocenę 5/5 — dlatego sekcja „Tylko
            krytyczne" jest pusta.
          </p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition hover:bg-gold-400"
          >
            Pokaż wszystkie opinie
          </button>
        </div>
      ) : (
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {visible.map((r, i) => (
            <figure
              key={`${r.name}-${r.date}-${i}`}
              className="mb-6 break-inside-avoid rounded-2xl border border-gold-500/15 bg-forest-800 p-6"
            >
              <Stars rating={r.rating} />
              <blockquote className="mt-3 whitespace-pre-line text-sm leading-relaxed text-cream/80">
                „{r.text}"
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between gap-2 text-sm font-semibold text-cream">
                <span>— {r.name}</span>
                <time dateTime={r.date} className="text-xs font-normal text-cream/60">
                  {formatDate(r.date)}
                </time>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
