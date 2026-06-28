import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { type Award, kindLabel } from "@/lib/awards";

// ─────────────────────────────────────────────────────────────────────────────
// Złoty gradient dla ikon-zastępczych (metaliczny połysk, nie płaska kreska).
// Definicja raz na siatkę; powtórzone `id` między siatkami jest nieszkodliwe
// (przeglądarka bierze pierwsze trafienie url(#fhGold)).
// ─────────────────────────────────────────────────────────────────────────────
function GoldGradientDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <linearGradient id="fhGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0dca8" />
          <stop offset="48%" stopColor="#d4b86a" />
          <stop offset="100%" stopColor="#a9772a" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Ikony-zastępcze (gdy dana pozycja nie ma pliku logo). Kreska = złoty gradient.
// ─────────────────────────────────────────────────────────────────────────────
function Icon({ name, className = "h-8 w-8" }: { name: string; className?: string }) {
  const p = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "url(#fhGold)",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "crown":
      return (
        <svg {...p}>
          <path d="M4 8l3 3 5-5 5 5 3-3-1.6 10H5.6L4 8Z" />
          <path d="M5 20h14" />
        </svg>
      );
    case "medal":
      return (
        <svg {...p}>
          <path d="M8.5 10.5 7 3h10l-1.5 7.5" />
          <circle cx="12" cy="15" r="5" />
          <path d="M12 13.2l.85 1.7 1.9.3-1.37 1.34.32 1.9L12 17.8l-1.7.94.32-1.9L9.25 15.5l1.9-.3.85-1.7Z" />
        </svg>
      );
    case "star":
      return (
        <svg {...p}>
          <path d="M12 3l2.6 5.3 5.9.9-4.25 4.15 1 5.85L12 16.9 6.75 19.6l1-5.85L3.5 9.6l5.9-.9L12 3Z" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...p}>
          <path d="M12 3c.6 4.2 1.2 4.8 5.4 5.4-4.2.6-4.8 1.2-5.4 5.4-.6-4.2-1.2-4.8-5.4-5.4C10.8 7.8 11.4 7.2 12 3Z" />
          <path d="M18.5 14c.25 1.6.65 2 2.25 2.25-1.6.25-2 .65-2.25 2.25-.25-1.6-.65-2-2.25-2.25 1.6-.25 2-.65 2.25-2.25Z" />
        </svg>
      );
    case "trending":
      return (
        <svg {...p}>
          <path d="M3 17l6-6 4 4 7-7" />
          <path d="M17 8h4v4" />
        </svg>
      );
    case "shield":
      return (
        <svg {...p}>
          <path d="M12 3l7 3v6c0 4-3 6.5-7 8-4-1.5-7-4-7-8V6l7-3Z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "book":
      return (
        <svg {...p}>
          <path d="M12 6c-1.6-1-4-1.5-7-1v13c3-.5 5.4 0 7 1 1.6-1 4-1.5 7-1V5c-3-.5-5.4 0-7 1Z" />
          <path d="M12 6v13" />
        </svg>
      );
    case "people":
      return (
        <svg {...p}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
          <path d="M16 5.4a3 3 0 0 1 0 5.2" />
          <path d="M17 14.2A6 6 0 0 1 20.5 20" />
        </svg>
      );
    case "trademark":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.6 16.5V7.5h3a2.25 2.25 0 0 1 0 4.5h-3M12.2 12 15 16.5" />
        </svg>
      );
    case "google":
      return (
        <svg {...p}>
          <path d="M21 12a9 9 0 1 1-2.6-6.3" />
          <path d="M21 12h-8" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...p}>
          <circle cx="8.5" cy="12" r="4" />
          <circle cx="15.5" cy="12" r="4" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...p}>
          <path d="M4 11v2a1 1 0 0 0 1 1h2l8 4.5V5.5L7 10H5a1 1 0 0 0-1 1Z" />
          <path d="M18 9a3.2 3.2 0 0 1 0 6" />
        </svg>
      );
    case "trophy":
    default:
      return (
        <svg {...p}>
          <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
          <path d="M7 6H4v1a3 3 0 0 0 3 3" />
          <path d="M17 6h3v1a3 3 0 0 1-3 3" />
          <path d="M12 13v3" />
          <path d="M8.5 20h7M10 20v-2.5h4V20" />
        </svg>
      );
  }
}

/**
 * Siatka wyróżnień — czytelne, samodzielne kafelki (bez klikania/modala: cała treść
 * jest na wierzchu). Realne logotypy lądują na jasnej plakietce (żeby ciemne i kolorowe
 * znaki były widoczne na zielonym tle); pozycje bez logo dostają kolorową ikonę w złotym
 * gradiencie. Efekty „wow": unoszenie, złota poświata i rozjaśnienie krawędzi na hover.
 * Flexbox `justify-center` wyśrodkowuje niepełny ostatni rząd, pełne rzędy = 100% szer.
 */
export default function AwardsGrid({
  items,
  columns = 3,
}: {
  items: Award[];
  columns?: 2 | 3;
}) {
  const itemCls =
    columns === 2
      ? "w-full sm:w-[calc((100%_-_1.25rem)/2)]"
      : "w-full sm:w-[calc((100%_-_1.25rem)/2)] lg:w-[calc((100%_-_2.5rem)/3)]";

  const cardCls =
    "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gold-500/15 bg-forest-800 p-6 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/45 hover:bg-forest-800/90 hover:shadow-[0_24px_60px_-24px_rgba(197,164,78,0.5)]";

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <GoldGradientDefs />
      {items.map((a, i) => (
        <Reveal key={a.id} delay={(i % 3) * 70} className={`${itemCls} h-full`}>
          <article className={cardCls}>
            {/* poświata na hover */}
            <span className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gold-500/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
            {/* górna linia połysku na hover */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex items-start justify-between gap-3">
              {a.logo ? (
                <span className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cream shadow-sm ring-1 ring-gold-500/30">
                  <Image
                    src={a.logo}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-contain p-1.5"
                  />
                </span>
              ) : (
                <span className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gold-500/25 via-gold-400/10 to-forest-950/40 ring-1 ring-gold-500/25 transition-transform duration-300 group-hover:scale-105">
                  <Icon name={a.icon} />
                </span>
              )}
              <span className="flex flex-col items-end gap-1.5 text-right">
                <span className="rounded-full border border-gold-500/25 bg-forest-950/40 px-2.5 py-0.5 text-[11px] font-medium text-gold-300">
                  {kindLabel[a.kind]}
                </span>
                {a.year && <span className="text-xs text-cream/50">{a.year}</span>}
              </span>
            </div>

            <h3 className="relative mt-5 font-display text-xl text-cream transition-colors duration-300 group-hover:text-gold-300">
              {a.title}
            </h3>
            <p className="relative mt-2 flex-1 text-sm leading-relaxed text-cream/70">
              {a.desc}
            </p>
            {a.organizer && (
              <p className="relative mt-4 text-xs text-cream/45">{a.organizer}</p>
            )}
            {a.note && (
              <p className="relative mt-1 text-xs italic text-gold-300/70">{a.note}</p>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
