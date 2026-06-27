"use client";

import { useEffect, useRef, useState } from "react";

type OfferDescriptionProps = {
  // Bezpieczny HTML z Esti (descriptionHtml) ma pierwszeństwo nad czystym
  // tekstem (description). Przynajmniej jedno powinno być niepuste — gdy oba są
  // puste, stronę obsługuje Placeholder w komponencie strony.
  html?: string | null;
  text?: string | null;
};

// Wysokość przycięcia na telefonie (= Tailwind max-h-72 = 18rem = 288px).
const COLLAPSED_PX = 288;

// Opis nieruchomości zwijany na telefonach: domyślnie przycięty do kilku linijek
// z delikatnym gradientem i przyciskiem „Rozwiń opis", żeby nie trzeba było
// długo przewijać. Na desktopie (lg+) opis jest zawsze w całości — przycisk i
// gradient są ukryte (lg:hidden), a wysokość odblokowana (lg:max-h-none).
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
        className={`relative overflow-hidden lg:max-h-none lg:overflow-visible ${
          clamp ? "max-h-72" : "max-h-none"
        }`}
      >
        {body}
        {/* Gradient zanikania — tylko na telefonie i tylko gdy przycięte. */}
        {clamp ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-forest-950 to-transparent lg:hidden" />
        ) : null}
      </div>

      {/* Przycisk zwijania — wyłącznie na telefonie i tylko gdy opis się nie
          mieści. lg:hidden chowa go na desktopie niezależnie od stanu. */}
      {overflowing ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300 lg:hidden"
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
