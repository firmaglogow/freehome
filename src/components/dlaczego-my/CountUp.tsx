"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animowany licznik „od zera do wartości" — uruchamia się dopiero, gdy element
 * wjedzie w pole widzenia (IntersectionObserver). Akceptuje gotowy napis statystyki
 * (np. "271+", "3,37%", "10 lat", "#1") i sam wyłuskuje część liczbową, zachowując
 * prefiks i sufiks. Szanuje `prefers-reduced-motion` (wtedy od razu pokazuje wynik).
 *
 * Hydration-safe: stan startowy = 0, więc serwerowy HTML i pierwszy render klienta
 * są zgodne; animacja dopisuje się po stronie klienta po wejściu w widok.
 */
export default function CountUp({
  value,
  duration = 1400,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    // Rozbicie napisu na: prefiks (np. "#"), liczba (np. "3,37"), sufiks (np. "%", " lat").
    const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!m) return; // brak części liczbowej → zostaw napis bez zmian
    const node = ref.current;
    if (!node) return;

    const prefix = m[1];
    const numRaw = m[2];
    const suffix = m[3];
    const decimals = (numRaw.split(",")[1] ?? numRaw.split(".")[1] ?? "").length;
    const target = parseFloat(numRaw.replace(/\s/g, "").replace(",", "."));
    const nf = new Intl.NumberFormat("pl-PL", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    const render = (n: number) => setDisplay(`${prefix}${nf.format(n)}${suffix}`);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      render(target);
      return;
    }

    let raf = 0;
    let started = false;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        render(target * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
