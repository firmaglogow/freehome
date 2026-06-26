"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type SectionData = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

type AgentInfo = {
  name: string;
  role: string;
  photo: string;
  phone: string;
  phoneHref: string;
  email?: string | null;
};

// Dolna część podstrony osiedla: po lewej ZWIJANY opis (domyślnie przycięty
// dokładnie do wysokości prawej kolumny — opiekun + mapa — żeby było równo
// i symetrycznie, a oferty były od razu widoczne pod spodem), po prawej karta
// opiekuna inwestycji i mapa Google z lokalizacją.
export default function DevelopmentBody({
  tagline,
  intro,
  sections,
  location,
  agent,
  mapSrc,
  mapLink,
}: {
  tagline?: string | null;
  intro?: string | null;
  sections?: SectionData[];
  location?: string | null;
  agent: AgentInfo;
  mapSrc?: string | null;
  mapLink?: string | null;
}) {
  const textRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  // Wartości startowe = sensowny clamp, żeby SSR też renderował zwinięty opis
  // (bez migotania pełnej treści przed pomiarem po stronie klienta).
  const [collapsedH, setCollapsedH] = useState(560);
  const [fullH, setFullH] = useState<number | undefined>(undefined);
  const [overflowing, setOverflowing] = useState(true);

  useEffect(() => {
    const measure = () => {
      const text = textRef.current;
      const side = sideRef.current;
      if (!text) return;
      const full = text.scrollHeight;
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      // Desktop: zwijamy do wysokości kolumny opiekun+mapa (symetria).
      // Mobile: stały, rozsądny limit (kolumny są jedna pod drugą).
      const target = desktop && side ? side.offsetHeight : 420;
      const willOverflow = full > target + 16;
      setFullH((p) => (p === full ? p : full));
      setCollapsedH((p) => (p === target ? p : target));
      setOverflowing((p) => (p === willOverflow ? p : willOverflow));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (textRef.current) ro.observe(textRef.current);
    if (sideRef.current) ro.observe(sideRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const maxHeight = !overflowing ? undefined : expanded ? fullH : collapsedH;

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
      {/* LEWA: zwijany opis */}
      <div>
        <div className="relative">
          <div
            ref={textRef}
            className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
            style={{ maxHeight }}
          >
            {tagline ? (
              <p className="font-display text-2xl text-gold-400">{tagline}</p>
            ) : null}
            {intro ? (
              <p className="mt-4 text-lg leading-relaxed text-cream/85">
                {intro}
              </p>
            ) : null}

            {sections?.map((section, i) => (
              <section key={section.heading ?? i} className="mt-8">
                {section.heading ? (
                  <h2 className="font-display text-xl text-cream">
                    {section.heading}
                  </h2>
                ) : null}
                {section.paragraphs?.map((p, j) => (
                  <p
                    key={j}
                    className="mt-3 text-base leading-relaxed text-cream/80"
                  >
                    {p}
                  </p>
                ))}
                {section.bullets?.length ? (
                  <ul className="mt-4 space-y-2.5">
                    {section.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-cream/80">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold-400"
                        />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {/* Gradient wygaszający tekst na dole, gdy zwinięty */}
          {overflowing && !expanded ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-forest-950 via-forest-950/80 to-transparent"
            />
          ) : null}
        </div>

        {/* Przycisk rozwiń / zwiń */}
        {overflowing ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-forest-800 px-5 py-2.5 text-sm font-medium text-gold-300 transition hover:border-gold-500/60 hover:text-gold-200"
          >
            {expanded ? "Zwiń opis" : "Czytaj więcej"}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
              className={`h-4 w-4 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </button>
        ) : null}
      </div>

      {/* PRAWA: opiekun inwestycji + mapa */}
      <div ref={sideRef} className="space-y-6 lg:sticky lg:top-24">
        {/* Karta opiekuna — jak przy ofercie */}
        <div className="rounded-3xl border border-gold-500/15 bg-forest-800 p-6">
          <p className="text-sm text-cream/60">Opiekun inwestycji</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-16 w-16 flex-none overflow-hidden rounded-full">
              <Image
                src={agent.photo}
                alt={agent.name}
                fill
                sizes="64px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="font-display text-lg text-cream">{agent.name}</p>
              <p className="text-sm text-cream/60">{agent.role}</p>
            </div>
          </div>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-cream/50">Telefon</dt>
              <dd>
                <a
                  href={agent.phoneHref}
                  className="font-medium text-gold-400 hover:underline"
                >
                  {agent.phone}
                </a>
              </dd>
            </div>
            {agent.email ? (
              <div className="flex items-center justify-between gap-3">
                <dt className="text-cream/50">E-mail</dt>
                <dd>
                  <a
                    href={`mailto:${agent.email}`}
                    className="font-medium text-gold-400 hover:underline break-all"
                  >
                    {agent.email}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>

          <a
            href={agent.phoneHref}
            className="mt-6 block rounded-xl bg-gold-500 px-4 py-3 text-center text-sm font-semibold text-forest-950 transition hover:bg-gold-400"
          >
            Zadzwoń i zapytaj o ofertę
          </a>
        </div>

        {/* Karta lokalizacji — mapa Google (embed bez klucza API) */}
        {mapSrc ? (
          <div className="rounded-3xl border border-gold-500/15 bg-forest-800 p-6">
            <p className="text-sm text-cream/60">Lokalizacja</p>
            {location ? (
              <p className="mt-1 flex items-center gap-1.5 text-cream">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 flex-none text-gold-400"
                  fill="currentColor"
                >
                  <path d="M12 2c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                </svg>
                {location}
              </p>
            ) : null}
            <div className="mt-4 aspect-[4/3] overflow-hidden rounded-2xl border border-forest-600/50">
              <iframe
                src={mapSrc}
                title={`Mapa — ${location ?? "lokalizacja inwestycji"}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full w-full"
                style={{ border: 0 }}
              />
            </div>
            {mapLink ? (
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-400 hover:underline"
              >
                Otwórz w Google Maps
                <span aria-hidden="true">→</span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
