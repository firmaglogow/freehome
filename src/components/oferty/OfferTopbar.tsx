"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type OfferSection = {
  id: string;
  label: string;
  // Gdy ustawione, klik przełącza widok galerii (Zdjęcia/Plan) zamiast zwykłego
  // skoku do kotwicy — oba prowadzą do tej samej sekcji #galeria.
  view?: "photos" | "plans";
};

// Ikony współdzielone przez wariant desktop i mobile (jedno źródło prawdy);
// rozmiar podajemy przez argument (desktop: h-4, mobile ikonowy: h-5).
const BackIcon = (cls: string) => (
  <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
    <path
      d="M15 6l-6 6 6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const FbIcon = (cls: string) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden="true">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
  </svg>
);
const WaIcon = (cls: string) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24zm-3.6 4.43c-.17 0-.45.06-.69.31-.24.25-.9.88-.9 2.15 0 1.27.92 2.5 1.05 2.67.13.17 1.8 2.86 4.42 3.91.62.25 1.1.4 1.48.51.62.2 1.19.17 1.64.1.5-.07 1.54-.63 1.76-1.24.22-.61.22-1.13.16-1.24-.07-.11-.24-.17-.5-.31-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.25-.67.85-.83 1.02-.15.17-.3.19-.56.06-.26-.13-1.1-.4-2.09-1.29-.77-.69-1.29-1.54-1.44-1.8-.15-.25-.02-.39.11-.52.12-.12.26-.31.4-.46.13-.16.17-.27.26-.45.09-.18.04-.34-.02-.47-.06-.13-.58-1.4-.8-1.92-.2-.5-.4-.43-.56-.44-.14-.01-.3-.01-.47-.01z" />
  </svg>
);
const PrintIcon = (cls: string) => (
  <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden="true">
    <path
      d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M6 14h12v7H6z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Pasek nawigacji oferty. Dwa układy z jednym stanem/logiką (scrollspy, share):
//  • DESKTOP (lg+): jeden spójny „command bar" — po lewej „Wróć do ofert" +
//    skróty do sekcji, po prawej Udostępnij/WhatsApp/Drukuj. Przyklejony pod menu
//    (sticky top-20), „jedzie" z użytkownikiem przez całą treść oferty.
//  • MOBILE (< lg): DWIE belki zamiast trzech zawijanych linii —
//    1) akcje: „Oferty" + Facebook + WhatsApp (lewo), Drukuj (prawo) — przewija
//       się z treścią;
//    2) belka sekcji (Zdjęcia · Plan · Opis · Lokalizacja · Film) ZAWSZE w jednej
//       linii (poziomy przewijak palcem), przyklejona pod nagłówkiem — dokładnie
//       jak na laptopie, żeby zawsze dało się wejść w daną sekcję.
export default function OfferTopbar({
  sections,
  shareUrl,
  shareTitle,
}: {
  sections: OfferSection[];
  shareUrl: string;
  /** Krótki opis oferty doklejany przed linkiem przy udostępnianiu na WhatsApp. */
  shareTitle?: string;
}) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");
  // Aktualny widok galerii (Zdjęcia/Plan) — żeby podświetlić właściwą pigułkę,
  // gdy sekcja #galeria jest na ekranie. Galeria nadaje zmiany przez event.
  const [galleryView, setGalleryView] = useState<"photos" | "plans">("photos");

  // Scrollspy: podświetlamy sekcję, która jest najbliżej górnej krawędzi ekranu.
  useEffect(() => {
    if (sections.length === 0) return;
    // Zdjęcia i Plan mieszkania dzielą tę samą kotwicę (#galeria) — obserwujemy
    // każdy element tylko raz.
    const ids = Array.from(new Set(sections.map((s) => s.id)));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Okno obserwacji przesunięte pod stały nagłówek strony.
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  // Galeria nadaje swój aktualny widok (po kliknięciu zakładek w środku lub po
  // starcie) — synchronizujemy podświetlenie pigułek Zdjęcia/Plan na pasku.
  useEffect(() => {
    const onChanged = (e: Event) => {
      const v = (e as CustomEvent<"photos" | "plans">).detail;
      if (v === "photos" || v === "plans") setGalleryView(v);
    };
    window.addEventListener("offer-gallery-view-changed", onChanged);
    return () => window.removeEventListener("offer-gallery-view-changed", onChanged);
  }, []);

  // Klik w „Zdjęcia"/„Plan mieszkania": przełącz widok galerii (event do
  // OfferGallery) i płynnie przewiń do sekcji #galeria.
  const goToView = (e: React.MouseEvent, s: OfferSection) => {
    if (!s.view) return; // zwykłe kotwice obsługuje natywny <a href>
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("offer-gallery-view", { detail: s.view })
    );
    setGalleryView(s.view);
    setActive(s.id);
    // Przełączenie widoku zmienia wysokość galerii (re-render). Gdyby przewinąć
    // od razu, smooth-scroll zostałby przerwany — odraczamy o dwie klatki, aż
    // layout się ustabilizuje.
    const el = document.getElementById(s.id);
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        el?.scrollIntoView({ behavior: "smooth", block: "start" })
      )
    );
  };

  // Udostępnienie przez Facebooka — okno dialogowe sharera (nie cała karta).
  const share = () => {
    const u = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(u, "fb-share", "width=620,height=520,noopener,noreferrer");
  };

  // Udostępnienie przez WhatsApp — wa.me/?text=… BEZ numeru odbiorcy: WhatsApp
  // pokaże listę kontaktów, żeby błyskawicznie przesłać komuś link do oferty
  // (na telefonie otwiera apkę, na desktopie web.whatsapp.com). Doklejamy krótki
  // opis przed adresem, by wiadomość była czytelna.
  const shareWhatsApp = () => {
    const text = shareTitle ? `${shareTitle}\n${shareUrl}` : shareUrl;
    const u = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(u, "_blank", "noopener,noreferrer");
  };

  // Pojedyncza pigułka sekcji — współdzielona przez oba układy (jedno źródło
  // logiki podświetlenia). `shrink-0`, żeby w poziomym przewijaku na mobile
  // pigułki nie ściskały się w kolumnę.
  const renderPill = (s: OfferSection) => {
    const isActive = s.view
      ? active === s.id && galleryView === s.view
      : active === s.id;
    return (
      <a
        key={s.view ?? s.id}
        href={`#${s.id}`}
        onClick={(e) => goToView(e, s)}
        aria-current={isActive ? "true" : undefined}
        className={
          "shrink-0 rounded-full px-3 py-1.5 text-sm transition " +
          (isActive
            ? "bg-gold-500/15 text-gold-300"
            : "text-cream/65 hover:bg-forest-800 hover:text-gold-300")
        }
      >
        {s.label}
      </a>
    );
  };

  return (
    <>
      {/* ===== DESKTOP (lg+): jeden spójny command bar, przyklejony pod menu ===== */}
      <div className="mb-8 hidden flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-2xl border border-gold-500/15 bg-forest-900/80 px-3 py-2 backdrop-blur lg:sticky lg:top-20 lg:z-30 lg:flex">
        <div className="flex flex-wrap items-center gap-y-1">
          <Link
            href="/oferty"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-cream/70 transition hover:bg-forest-800 hover:text-gold-300"
          >
            {BackIcon("h-4 w-4")}
            <span>Wróć do ofert</span>
          </Link>

          {sections.length > 0 ? (
            <>
              <span
                className="mx-1.5 h-5 w-px bg-gold-500/15"
                aria-hidden
              />
              <nav
                aria-label="Sekcje oferty"
                className="flex flex-wrap items-center gap-0.5"
              >
                {sections.map(renderPill)}
              </nav>
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={share}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-cream/75 transition hover:bg-forest-800 hover:text-gold-300"
          >
            {FbIcon("h-4 w-4")}
            <span>Udostępnij</span>
          </button>

          <button
            type="button"
            onClick={shareWhatsApp}
            aria-label="Udostępnij ofertę przez WhatsApp"
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-cream/75 transition hover:bg-forest-800 hover:text-[#25D366]"
          >
            {WaIcon("h-4 w-4")}
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-cream/75 transition hover:bg-forest-800 hover:text-gold-300"
          >
            {PrintIcon("h-4 w-4")}
            <span>Drukuj</span>
          </button>
        </div>
      </div>

      {/* ===== MOBILE (< lg) — belka 1: akcje (przewija się z treścią) ===== */}
      <div className="mb-3 flex items-center justify-between gap-2 rounded-2xl border border-gold-500/15 bg-forest-900/55 px-1.5 py-1.5 backdrop-blur lg:hidden">
        <div className="flex items-center gap-0.5">
          <Link
            href="/oferty"
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-sm text-cream/80 transition hover:bg-forest-800 hover:text-gold-300"
          >
            {BackIcon("h-4 w-4")}
            <span>Oferty</span>
          </Link>
          <button
            type="button"
            onClick={share}
            aria-label="Udostępnij ofertę na Facebooku"
            className="inline-flex items-center rounded-full p-2 text-cream/80 transition hover:bg-forest-800 hover:text-gold-300"
          >
            {FbIcon("h-5 w-5")}
          </button>
          <button
            type="button"
            onClick={shareWhatsApp}
            aria-label="Udostępnij ofertę przez WhatsApp"
            className="inline-flex items-center rounded-full p-2 text-cream/80 transition hover:bg-forest-800 hover:text-[#25D366]"
          >
            {WaIcon("h-5 w-5")}
          </button>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          aria-label="Drukuj ofertę"
          className="inline-flex items-center rounded-full p-2 text-cream/80 transition hover:bg-forest-800 hover:text-gold-300"
        >
          {PrintIcon("h-5 w-5")}
        </button>
      </div>

      {/* ===== MOBILE (< lg) — belka 2: sekcje ZAWSZE w jednej linii, przyklejona ===== */}
      {sections.length > 0 ? (
        <nav
          aria-label="Sekcje oferty"
          className="no-scrollbar sticky top-20 z-30 mb-8 flex items-center gap-1 overflow-x-auto rounded-2xl border border-gold-500/15 bg-forest-900/90 px-2 py-2 backdrop-blur lg:hidden"
        >
          {sections.map(renderPill)}
        </nav>
      ) : null}
    </>
  );
}
