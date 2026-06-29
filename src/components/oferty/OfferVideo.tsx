"use client";

import { useState } from "react";
import { youtubeEmbedUrl, youtubeThumb } from "@/lib/youtube";

// Sekcja „Film o nieruchomości". Najpierw pokazujemy samą okładkę (miniatura
// YouTube + przycisk play) — tzw. facade. Ciężki <iframe> z odtwarzaczem ładuje
// się dopiero po kliknięciu, więc nie obciąża wczytywania strony oferty (LCP/INP)
// i nie ustawia ciasteczek YouTube zanim użytkownik świadomie nie odtworzy filmu.
export default function OfferVideo({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-gold-500/15 bg-forest-950">
      {playing ? (
        <iframe
          src={youtubeEmbedUrl(id)}
          title={`Film — ${title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Odtwórz film — ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* Miniatura YouTube jako okładka. Zwykły <img> (nie next/image),
              bo to zasób zewnętrzny spoza naszego loadera obrazów. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={youtubeThumb(id)}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-forest-950/30 transition group-hover:bg-forest-950/15" />
          <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-forest-950/70 text-cream backdrop-blur transition group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-forest-950">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-8 w-8" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
