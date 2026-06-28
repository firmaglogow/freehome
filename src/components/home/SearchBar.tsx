"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { locations, propertyTypes } from "@/lib/site";
import { glogowOsiedla } from "@/lib/offers";
import { cn } from "@/lib/cn";

const fieldCls =
  "w-full rounded-lg border border-forest-600/60 bg-forest-950/60 px-3.5 py-3 text-sm text-cream placeholder:text-cream/55 outline-none transition focus:border-gold-500/70 focus:ring-1 focus:ring-gold-500/40";

const labelCls = "mb-1.5 block text-xs font-medium tracking-wide text-cream/70";

export default function SearchBar({
  offersCount,
  variant = "hero",
}: {
  offersCount: number;
  variant?: "hero" | "page";
}) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [osiedle, setOsiedle] = useState("");
  const [type, setType] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [rooms, setRooms] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("lok", location);
    if (osiedle) params.set("osiedle", osiedle);
    if (type) params.set("typ", type);
    if (priceFrom) params.set("cena_od", priceFrom);
    if (priceTo) params.set("cena_do", priceTo);
    if (rooms) params.set("pokoje", rooms);
    router.push(`/oferty?${params.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className={cn(
        "rounded-2xl border border-gold-500/20 bg-forest-800/80 p-4 shadow-2xl shadow-black/40 backdrop-blur-md sm:p-5",
        variant === "hero" && "ring-1 ring-white/5"
      )}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div>
          <label className={labelCls} htmlFor="s-lok">
            Lokalizacja
          </label>
          <select
            id="s-lok"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={fieldCls}
          >
            <option value="">Wszystkie</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="s-osiedle">
            Osiedle <span className="text-cream/60">· Głogów</span>
          </label>
          <select
            id="s-osiedle"
            value={osiedle}
            onChange={(e) => setOsiedle(e.target.value)}
            className={fieldCls}
          >
            <option value="">Wszystkie</option>
            {glogowOsiedla.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="s-typ">
            Typ nieruchomości
          </label>
          <select
            id="s-typ"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={fieldCls}
          >
            <option value="">Dowolny</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="s-cena-od">
            Cena (zł)
          </label>
          <div className="flex gap-2">
            <input
              id="s-cena-od"
              type="number"
              inputMode="numeric"
              aria-label="Cena od (zł)"
              placeholder="od"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              className={fieldCls}
            />
            <input
              type="number"
              inputMode="numeric"
              aria-label="Cena do (zł)"
              placeholder="do"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
              className={fieldCls}
            />
          </div>
        </div>

        <div>
          <label className={labelCls} htmlFor="s-pok">
            Pokoje (min.)
          </label>
          <select
            id="s-pok"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            className={fieldCls}
          >
            <option value="">Dowolnie</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-forest-950 transition hover:bg-gold-400"
      >
        Szukaj — {offersCount}{" "}
        {offersCount === 1 ? "oferta" : offersCount < 5 ? "oferty" : "ofert"}
      </button>
    </form>
  );
}
