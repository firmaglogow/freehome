import type { ReactNode } from "react";
import {
  type Offer,
  formatArea,
  formatPrice,
  formatOfferPlace,
  formatOfferHeading,
  formatTransactionBadge,
} from "@/lib/offers";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";

// ──────────────────────────────────────────────────────────────────────────
//  Broszura oferty do druku („Drukuj ofertę" → Zapisz jako PDF)
//
//  Elegancka, 2-stronicowa broszura A4. Na EKRANIE ukryta (`hidden`), pokazuje
//  się WYŁĄCZNIE przy druku (`print:block`) — a wtedy globalny @media print
//  (globals.css) chowa nagłówek/stopkę strony i samą ofertę, zostawiając tylko
//  tę broszurę na białym tle (oszczędność tuszu, czytelność na papierze).
//
//  Obrazy: zwykłe <img> z ręcznym asset() (NIE next/image) — bo kontener jest
//  display:none na ekranie, więc lazy-loading next/image nigdy by ich nie
//  wczytał. Zwykły <img> bez loading="lazy" wczytuje się od razu (Chrome pobiera
//  obrazy także w display:none), więc są gotowe zanim użytkownik kliknie druk.
//
//  Strona 1 (okładka): logo + nr oferty, tytuł, duże zdjęcie + 3 mniejsze,
//                       cena i siatka parametrów.
//  Strona 2: opis, mapka lokalizacji (kafelki OpenStreetMap + złoty pin),
//            karta opiekuna i pasek z danymi biura.
// ──────────────────────────────────────────────────────────────────────────

// Mapka z kafelków OpenStreetMap (keyless, CDN — pewnie wczytuje się do druku).
// Siatka 3×3 kafli (768×768) przesunięta tak, by dokładny punkt oferty wypadł
// w geometrycznym środku ramki; nad nim złoty pin. Statyczny obraz = pewny druk.
function BrochureMap({ lat, lng }: { lat: number; lng: number }) {
  const z = 15;
  const n = 2 ** z;
  const xf = ((lng + 180) / 360) * n;
  const latRad = (lat * Math.PI) / 180;
  const yf = ((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2) * n;
  const xtile = Math.floor(xf);
  const ytile = Math.floor(yf);
  // Pozycja punktu wewnątrz środkowego kafla (px), a potem w całej siatce 768.
  const pinX = 256 + (xf - xtile) * 256;
  const pinY = 256 + (yf - ytile) * 256;
  const offsets = [-1, 0, 1];

  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl border border-forest-950/15 bg-[#e8e8e3]">
      <div
        className="absolute"
        style={{
          width: 768,
          height: 768,
          left: `calc(50% - ${pinX}px)`,
          top: `calc(50% - ${pinY}px)`,
        }}
      >
        {offsets.map((dy) =>
          offsets.map((dx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${dx}_${dy}`}
              src={`https://tile.openstreetmap.org/${z}/${xtile + dx}/${ytile + dy}.png`}
              alt=""
              width={256}
              height={256}
              className="absolute max-w-none"
              style={{ left: (dx + 1) * 256, top: (dy + 1) * 256 }}
            />
          ))
        )}
      </div>
      {/* Złoty pin — czubek na dokładnym punkcie (środek ramki). */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <svg width="26" height="38" viewBox="0 0 24 36" aria-hidden="true">
          <path
            d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z"
            fill="#c5a44e"
            stroke="#071a0e"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="4.3" fill="#071a0e" />
        </svg>
      </div>
      <span className="absolute bottom-1 right-1 rounded bg-white/85 px-1 text-[8px] leading-tight text-forest-950/70">
        © OpenStreetMap
      </span>
    </div>
  );
}

// Zamienia HTML z Esti (opis oferty) na czysty tekst do druku: tagi blokowe →
// nowe linie, <li> → punktor, pozostałe tagi usunięte, podstawowe encje
// rozkodowane. Nigdy nie wstrzykujemy HTML do broszury (brak XSS), bo na papier
// i tak chcemy czysty, czytelny tekst — nie surowe <strong>/<br>.
function htmlToText(input: string): string {
  return input
    .replace(/<\s*br\s*\/?\s*>/gi, "\n")
    .replace(/<\s*\/\s*(p|div|h[1-6]|ul|ol|tr)\s*>/gi, "\n")
    .replace(/<\s*li[^>]*>/gi, "\n• ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&hellip;/gi, "…")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Mały „kicker" — złota etykieta nad nagłówkami sekcji.
function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-500">
      {children}
    </p>
  );
}

// Pasek z logo + numerem oferty (powtarzany na obu stronach broszury).
function Brandbar({ offerId, compact = false }: { offerId: string; compact?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-gold-500/40 pb-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/brand/logo.webp")}
        alt={site.fullName}
        className={compact ? "h-8 w-auto" : "h-10 w-auto"}
      />
      <div className="text-right">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-500">
          Oferta
        </p>
        <p className="font-mono text-sm font-semibold text-forest-950">{offerId}</p>
      </div>
    </div>
  );
}

export default function OfferPrintBrochure({
  offer,
  agentName,
  agentPhoto,
  agentPhone,
  agentEmail,
}: {
  offer: Offer;
  agentName: string;
  agentPhoto: string;
  agentPhone: string;
  agentEmail?: string;
}) {
  // Zdjęcia: pierwsze 4 z galerii (duże główne + 3 mniejsze). Fallback: image.
  const photos =
    offer.gallery && offer.gallery.length > 0
      ? offer.gallery
      : offer.image
        ? [offer.image]
        : [];
  const hero = photos[0] ?? null;
  const thumbs = photos.slice(1, 4);

  // Opis: preferujemy bogatszy descriptionHtml, w razie braku — description.
  // Oba bywają z HTML (Esti), więc zawsze sprowadzamy do czystego tekstu i
  // przycinamy do ~750 znaków, żeby broszura trzymała 2 strony.
  const rawDesc = htmlToText((offer.descriptionHtml ?? offer.description ?? "").trim());
  const desc =
    rawDesc.length > 760 ? rawDesc.slice(0, 750).replace(/\s+\S*$/, "") + "…" : rawDesc;
  const descParas = desc.split(/\n+/).filter(Boolean);

  // Siatka parametrów — pokazujemy tylko te, które mają wartość.
  const stats: { label: string; value: string }[] = [
    { label: "Powierzchnia", value: formatArea(offer.areaTotal) },
    ...(offer.rooms ? [{ label: "Pokoje", value: String(offer.rooms) }] : []),
    ...(offer.floor ? [{ label: "Piętro", value: offer.floor }] : []),
    ...(offer.pricePerMeter
      ? [{ label: "Cena za m²", value: `${formatPrice(offer.pricePerMeter)}/m²` }]
      : []),
    ...(offer.areaPlot
      ? [{ label: "Działka", value: formatArea(offer.areaPlot) }]
      : []),
    ...(offer.buildingYear
      ? [{ label: "Rok budowy", value: String(offer.buildingYear) }]
      : []),
  ];

  return (
    <div
      className="offer-brochure hidden text-forest-950 print:block"
      aria-hidden="true"
    >
      {/* ───────────── STRONA 1 — okładka ───────────── */}
      <section className="brochure-page">
        <Brandbar offerId={offer.id} />

        <div className="mt-5">
          <Kicker>{formatTransactionBadge(offer)}</Kicker>
          <h2 className="mt-1 font-display text-3xl leading-tight text-forest-950">
            {formatOfferHeading(offer)}
          </h2>
          <p className="mt-1 text-sm text-forest-950/70">{formatOfferPlace(offer)}</p>
        </div>

        {/* Duże zdjęcie główne */}
        {hero ? (
          <div className="mt-4 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-forest-950/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(hero)}
              alt={offer.title}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}

        {/* 3 mniejsze zdjęcia */}
        {thumbs.length > 0 ? (
          <div className="mt-3 grid grid-cols-3 gap-3">
            {thumbs.map((src, i) => (
              <div
                key={i}
                className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-forest-950/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(src)}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}

        {/* Cena */}
        <div className="mt-6 break-inside-avoid">
          <Kicker>Cena</Kicker>
          <p className="font-display text-4xl font-semibold text-forest-950">
            {formatPrice(offer.price)}
          </p>
        </div>

        {/* Parametry */}
        <dl className="mt-4 grid grid-cols-3 gap-2 break-inside-avoid">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-forest-950/10 bg-forest-950/[0.03] p-3"
            >
              <dt className="text-[10px] uppercase tracking-wide text-forest-950/50">
                {s.label}
              </dt>
              <dd className="mt-0.5 text-base font-semibold text-forest-950">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ───────────── STRONA 2 — opis, mapa, kontakt ───────────── */}
      <section className="brochure-page break-before-page">
        <Brandbar offerId={offer.id} compact />

        {descParas.length > 0 ? (
          <div className="mt-5 break-inside-avoid">
            <Kicker>Opis nieruchomości</Kicker>
            <div className="mt-2 space-y-2 text-sm leading-relaxed text-forest-950/85">
              {descParas.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ) : null}

        {/* Lokalizacja — mapka z kafelków OSM */}
        {offer.geo ? (
          <div className="mt-6 break-inside-avoid">
            <Kicker>Lokalizacja</Kicker>
            <p className="mt-1 mb-2 text-sm font-medium text-forest-950">
              {formatOfferPlace(offer)}
            </p>
            <BrochureMap lat={offer.geo.lat} lng={offer.geo.lng} />
            <p className="mt-1 text-[10px] text-forest-950/55">
              Lokalizacja przybliżona — dokładny adres podajemy przy kontakcie.
            </p>
          </div>
        ) : null}

        {/* Opiekun oferty */}
        <div className="mt-6 flex items-center gap-4 break-inside-avoid rounded-xl border border-gold-500/40 bg-gold-500/[0.06] p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(agentPhoto)}
            alt={agentName}
            className="h-16 w-16 flex-none rounded-full object-cover object-top"
          />
          <div className="text-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-500">
              Twój opiekun
            </p>
            <p className="mt-0.5 text-base font-semibold text-forest-950">
              {agentName}
            </p>
            <p className="mt-0.5 text-forest-950/80">tel. {agentPhone}</p>
            {agentEmail ? (
              <p className="text-forest-950/80">{agentEmail}</p>
            ) : null}
          </div>
        </div>

        {/* Pasek z danymi biura */}
        <div className="mt-5 break-inside-avoid rounded-xl bg-forest-950 px-5 py-4 text-cream">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-lg leading-none text-cream">
                {site.fullName}
              </p>
              <p className="mt-1 text-xs text-cream/75">
                {site.address.street}, {site.address.city} · tel. {site.phone}
              </p>
              <p className="text-xs text-cream/75">
                {site.email} · {site.domain}
              </p>
            </div>
            <div className="text-right text-[10px] leading-snug text-cream/60">
              <p>NIP {site.legal.nip}</p>
              <p>Licencja {site.legal.license}</p>
              <p>Nr oferty {offer.id}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
