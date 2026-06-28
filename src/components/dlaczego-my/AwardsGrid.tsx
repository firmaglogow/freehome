"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { type Award, kindLabel } from "@/lib/awards";

// ─────────────────────────────────────────────────────────────────────────────
// Ikony-zastępcze (gdy dana pozycja nie ma pliku logo). Linia złota = currentColor.
// Proste, czytelne kształty utrzymane w stylu marki.
// ─────────────────────────────────────────────────────────────────────────────
function Icon({ name, className = "h-8 w-8" }: { name: string; className?: string }) {
  const p = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
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
 * Siatka klikalnych kafelków wyróżnień. Po kliknięciu otwiera modal z pełnym
 * opisem (detail), organizatorem i notą. Modal renderowany przez portal do
 * <body> (omija CSS `transform` z <Reveal>, który uwięziłby `position: fixed`).
 * Zamykanie: ✕, Esc, kliknięcie w tło. Kafelek bez logo pokazuje ikonę.
 */
export default function AwardsGrid({
  items,
  columns = 3,
}: {
  items: Award[];
  columns?: 2 | 3;
}) {
  // Modal renderowany jest dopiero po kliknięciu (active != null), więc zawsze po
  // stronie klienta — `document` jest wtedy dostępny i nie ma ryzyka rozjazdu
  // hydratacji (przy pierwszym renderze active === null, portal się nie tworzy).
  const [active, setActive] = useState<Award | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close]);

  const gridCls =
    columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  const cardCls =
    "group flex h-full w-full cursor-pointer flex-col rounded-2xl border border-gold-500/15 bg-forest-800 p-6 text-left transition hover:-translate-y-0.5 hover:border-gold-500/40 hover:bg-forest-800/80";

  return (
    <>
      <div className={`grid grid-cols-1 gap-5 ${gridCls}`}>
        {items.map((a, i) => (
          <Reveal key={a.id} delay={(i % 3) * 70} className="h-full">
            <button type="button" onClick={() => setActive(a)} className={cardCls}>
              <div className="flex items-start justify-between gap-3">
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-forest-950/60 text-gold-400 ring-1 ring-gold-500/20">
                  {a.logo ? (
                    <Image
                      src={a.logo}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-contain p-2"
                    />
                  ) : (
                    <Icon name={a.icon} />
                  )}
                </span>
                <span className="flex flex-col items-end gap-1.5 text-right">
                  <span className="rounded-full border border-gold-500/25 bg-forest-950/40 px-2.5 py-0.5 text-[11px] font-medium text-gold-300">
                    {kindLabel[a.kind]}
                  </span>
                  {a.year && (
                    <span className="text-xs text-cream/50">{a.year}</span>
                  )}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl text-cream group-hover:text-gold-300">
                {a.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/70">
                {a.desc}
              </p>
              {a.organizer && (
                <p className="mt-4 text-xs text-cream/45">{a.organizer}</p>
              )}
              <span className="mt-4 text-sm font-semibold text-gold-400">
                Zobacz szczegóły →
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {active &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-forest-950/85 p-4 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gold-500/20 bg-forest-900 p-7 shadow-2xl sm:p-9">
              <button
                ref={closeBtnRef}
                type="button"
                onClick={close}
                aria-label="Zamknij"
                className="absolute right-3.5 top-3.5 flex h-10 w-10 items-center justify-center rounded-xl bg-forest-950/80 text-cream transition hover:rotate-90 hover:bg-forest-950"
              >
                ✕
              </button>

              <span className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-forest-950/60 text-gold-400 ring-1 ring-gold-500/25">
                {active.logo ? (
                  <Image
                    src={active.logo}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain p-2.5"
                  />
                ) : (
                  <Icon name={active.icon} className="h-10 w-10" />
                )}
              </span>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-gold-500/25 bg-gold-500/5 px-3 py-0.5 text-xs font-medium text-gold-300">
                  {kindLabel[active.kind]}
                </span>
                {active.year && (
                  <span className="rounded-full border border-gold-500/15 bg-forest-950/40 px-3 py-0.5 text-xs text-cream/60">
                    {active.year}
                  </span>
                )}
              </div>

              <h3 className="mt-4 font-display text-2xl text-cream">
                {active.title}
              </h3>
              <p className="mt-3 leading-relaxed text-cream/80">
                {active.detail ?? active.desc}
              </p>
              {active.organizer && (
                <p className="mt-5 text-sm text-cream/55">
                  <span className="text-cream/40">Organizator: </span>
                  {active.organizer}
                </p>
              )}
              {active.note && (
                <p className="mt-1 text-sm text-gold-300/80">{active.note}</p>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
