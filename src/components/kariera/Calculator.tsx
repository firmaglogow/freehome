"use client";

import { useState } from "react";

// Kalkulator potencjału — pokazuje WYŁĄCZNIE efekt (widełki), nigdy mechaniki.
// Żadnych wewnętrznych liczb modelu (prowizje, średnia wartość transakcji).
// Widełki to celowo zakres, nie jedna liczba — to ilustracja, nie obietnica.
const DATA: Record<number, { amt: string; sub: string }> = {
  1: { amt: "6 000 – 9 000", sub: "Solidny, spokojny start w branży." },
  2: {
    amt: "12 000 – 18 000",
    sub: "Dobre tempo — tu pracuje większość zaangażowanych.",
  },
  3: { amt: "18 000 – 27 000", sub: "Mocny rytm. Widać, że to Twój żywioł." },
  4: { amt: "24 000 – 36 000+", sub: "Pełne obroty — tu zarabiają najlepsi." },
};

export default function Calculator() {
  const [value, setValue] = useState(2);
  const fill = ((value - 1) / 3) * 100;
  const current = DATA[value];

  return (
    <div className="relative mx-auto max-w-2xl rounded-2xl border border-gold-500/25 bg-gradient-to-br from-forest-800 to-forest-700 p-8 sm:p-11">
      <span className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <label
        htmlFor="kariera-slider"
        className="block text-xs font-medium uppercase tracking-wider text-cream/60"
      >
        Ile transakcji miesięcznie chcesz domykać?
      </label>

      <div className="mt-3 flex items-center gap-5">
        <input
          id="kariera-slider"
          type="range"
          min={1}
          max={4}
          step={1}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="fh-range flex-1"
          style={{ "--fill": `${fill}%` } as React.CSSProperties}
          aria-valuetext={`${value} transakcji miesięcznie`}
        />
        <span className="min-w-[3rem] text-center font-display text-3xl font-bold text-gold-400">
          {value}
        </span>
      </div>

      <div className="mt-3.5 flex justify-between text-[11px] text-cream/55">
        <span>1 — start</span>
        <span>2</span>
        <span>3</span>
        <span>4 — pełne obroty</span>
      </div>

      <div className="mt-8 border-t border-dashed border-gold-500/30 pt-7 text-center">
        <p className="text-xs uppercase tracking-[0.1em] text-cream/55">
          Przykładowy potencjał miesięczny
        </p>
        <p className="mt-1.5 font-display text-4xl font-bold text-cream sm:text-5xl">
          {current.amt}
          <span className="ml-1.5 align-middle text-2xl text-gold-400">zł</span>
        </p>
        <p className="mt-2.5 text-sm italic text-cream/65">{current.sub}</p>
      </div>

      <p className="mt-6 border-t border-cream/10 pt-4 text-center text-[12.5px] leading-relaxed text-cream/55">
        Powyższe kwoty to wyłącznie poglądowa ilustracja oparta na przykładowych,
        uśrednionych transakcjach na lokalnym rynku — nie stanowią oferty,
        gwarancji ani deklaracji wynagrodzenia. Realny wynik zależy od Twojego
        zaangażowania, rynku i konkretnych transakcji. Szczegóły współpracy
        zawsze omawiamy osobiście.
      </p>
    </div>
  );
}
