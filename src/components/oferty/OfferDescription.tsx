"use client";

import { useEffect, useRef, useState } from "react";

type OfferDescriptionProps = {
  // Bezpieczny HTML z Esti (descriptionHtml) ma pierwszeństwo nad czystym
  // tekstem (description). Przynajmniej jedno powinno być niepuste — gdy oba są
  // puste, stronę obsługuje Placeholder w komponencie strony.
  html?: string | null;
  text?: string | null;
};

// Wysokość przycięcia opisu (= Tailwind max-h-80 = 20rem = 320px).
const COLLAPSED_PX = 320;

// Opis nieruchomości zwijany na WSZYSTKICH ekranach: domyślnie przycięty do kilku
// linijek z delikatnym gradientem i przyciskiem „Rozwiń opis", żeby nie trzeba
// było długo przewijać (opisy z Esti potrafią być bardzo długie). Po kliknięciu
// rozwija się w całości, a przycisk zmienia się w „Zwiń opis".
// Gdy opis jest krótki (nie przekracza przycięcia), chowamy przycisk i gradient.
export default function OfferDescription({ html, text }: OfferDescriptionProps) {
  const [open, setOpen] = useState(false);
  // Zakładamy, że opis jest długi (typowo z Esti), żeby przycisk był już w SSR
  // i nie „mrugał". Po zamontowaniu mierzymy i ewentualnie chowamy go.
  const [overflowing, setOverflowing] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const check = () => setOverflowing(el.scrollHeight > COLLAPSED_PX + 8);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [html, text]);

  const clamp = !open && overflowing;

  const body = html ? (
    <div
      className="space-y-3 text-base leading-relaxed text-cream/80 [&_b]:font-semibold [&_b]:text-cream [&_strong]:font-semibold [&_strong]:text-cream [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <div className="space-y-3 whitespace-pre-line text-base leading-relaxed text-cream/80">
      {text}
    </div>
  );

  return (
    <div className="mt-4">
      <div
        ref={bodyRef}
        className={`relative overflow-hidden ${
          clamp ? "max-h-80" : "max-h-none"
        }`}
      >
        {body}
        {/* Gradient zanikania — gdy opis jest przycięty (na każdym ekranie). */}
        {clamp ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-forest-950 to-transparent" />
        ) : null}
      </div>

      {/* Przycisk zwijania/rozwijania — pokazywany, gdy opis się nie mieści. */}
      {overflowing ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
        >
          {open ? "Zwiń opis" : "Rozwiń opis"}
          <span
            aria-hidden
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          >
            ▾
          </span>
        </button>
      ) : null}
    </div>
  );
}
