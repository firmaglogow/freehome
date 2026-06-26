"use client";

import { useEffect, useMemo, useState } from "react";
import OfferCard from "@/components/ui/OfferCard";
import { locations, propertyTypes } from "@/lib/site";
import { offers as allOffers, type Offer } from "@/lib/offers";
import { cn } from "@/lib/cn";

type Sort = "newest" | "price-asc" | "price-desc" | "area-desc";

const fieldCls =
  "w-full rounded-lg border border-forest-600/60 bg-forest-950/50 px-3 py-2.5 text-sm text-cream outline-none transition focus:border-gold-500/70";

// Typy „mieszkaniowe". Kategoria „komercyjny" = wszystko poza nimi (lokale
// użytkowe, inwestycyjne i dowolne inne nazwy typów z Esti) — odporne na to,
// jak dokładnie Esti nazwie dany lokal komercyjny.
const RESIDENTIAL_TYPES = ["Dom", "Mieszkanie", "Działka"];

export default function OffersExplorer() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  // Kategoria zbiorcza z menu (np. „komercyjny"). Osobno od dokładnego typu,
  // bo komercja to wiele różnych nazw typów z Esti.
  const [category, setCategory] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [rooms, setRooms] = useState("");
  const [sort, setSort] = useState<Sort>("newest");

  // Wstępne filtry z parametrów URL (np. /oferty?t=sprzedaz&lok=Głogów).
  // Czytamy po stronie klienta, dzięki czemu strona pozostaje w pełni statyczna
  // (działa na GitHub Pages, bez serwera).
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const set = (key: string, fn: (v: string) => void) => {
      const v = sp.get(key);
      if (v) fn(v);
    };
    set("lok", setLocation);
    set("typ", setType);
    set("kat", setCategory);
    set("cena_od", setPriceFrom);
    set("cena_do", setPriceTo);
    set("pokoje", setRooms);
  }, []);

  const filtered = useMemo(() => {
    let list: Offer[] = allOffers.filter((o) => {
      if (location && o.location !== location) return false;
      if (type && o.type !== type) return false;
      if (category === "komercyjny" && RESIDENTIAL_TYPES.includes(o.type))
        return false;
      if (priceFrom && o.price < Number(priceFrom)) return false;
      if (priceTo && o.price > Number(priceTo)) return false;
      if (rooms && (o.rooms ?? 0) < Number(rooms)) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "area-desc":
          return b.areaTotal - a.areaTotal;
        default:
          return 0;
      }
    });
    return list;
  }, [location, type, category, priceFrom, priceTo, rooms, sort]);

  function reset() {
    setLocation("");
    setType("");
    setCategory("");
    setPriceFrom("");
    setPriceTo("");
    setRooms("");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* Filtry */}
      <aside className="h-fit rounded-2xl border border-gold-500/15 bg-forest-800 p-5 lg:sticky lg:top-24">
        <div className="space-y-3">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={fieldCls}
            aria-label="Lokalizacja"
          >
            <option value="">Lokalizacja: wszystkie</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={fieldCls}
            aria-label="Typ nieruchomości"
          >
            <option value="">Typ: dowolny</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="cena od"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              className={fieldCls}
            />
            <input
              type="number"
              placeholder="cena do"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
              className={fieldCls}
            />
          </div>

          <select
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            className={fieldCls}
            aria-label="Liczba pokoi"
          >
            <option value="">Pokoje: dowolnie</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={reset}
            className="w-full rounded-full border border-gold-500/30 px-4 py-2 text-xs font-semibold text-gold-400 transition hover:bg-gold-500/10"
          >
            Wyczyść filtry
          </button>
        </div>
      </aside>

      {/* Wyniki */}
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-cream/70">
            Znaleziono{" "}
            <span className="font-semibold text-gold-400">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "ofertę" : "ofert"}
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className={cn(fieldCls, "w-auto")}
            aria-label="Sortowanie"
          >
            <option value="newest">Najnowsze</option>
            <option value="price-asc">Cena: rosnąco</option>
            <option value="price-desc">Cena: malejąco</option>
            <option value="area-desc">Powierzchnia: malejąco</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-gold-500/15 bg-forest-800 p-12 text-center text-cream/70">
            Brak ofert spełniających kryteria. Zmień filtry lub{" "}
            <button
              onClick={reset}
              className="font-semibold text-gold-400 hover:underline"
            >
              wyczyść je
            </button>
            .
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        )}

        {/* Widok mapy — Leaflet w Etapie 2 */}
        <div className="mt-8 rounded-xl border border-dashed border-gold-500/30 bg-gold-500/5 p-4 text-center text-xs text-gold-300">
          Widok mapy (Leaflet + OpenStreetMap z pinami ofert) zostanie dodany w
          Etapie 2 — oferty z Esti mają współrzędne geo.
        </div>
      </div>
    </div>
  );
}
