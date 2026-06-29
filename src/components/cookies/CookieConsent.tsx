"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { GA_ID, CONSENT_KEY, type ConsentChoice } from "@/lib/analytics";

// Zdarzenie, którym powiadamiamy własny store po zapisaniu decyzji (storage
// event nie odpala się w tej samej karcie, więc dokładamy własny sygnał).
const CONSENT_EVENT = "fh-consent-change";
// Sentinel zwracany podczas prerenderu (SSR/export): traktujemy jak „decyzja
// podjęta", żeby baner NIE trafiał do statycznego HTML — dzięki temu osoby,
// które już wybrały, nie widzą migotnięcia. Baner pojawia się dopiero po
// hydratacji, wyłącznie dla osób bez zapisanej decyzji.
const SSR_SNAPSHOT = "__ssr__";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
}

function getSnapshot(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): string {
  return SSR_SNAPSHOT;
}

/**
 * Baner zgody na cookies analityczne (RODO / Consent Mode v2).
 *
 * Pokazuje się WYŁĄCZNIE gdy skonfigurowana jest analityka (GA_ID) i gdy
 * użytkownik nie podjął jeszcze decyzji. Cookies niezbędne nie wymagają zgody,
 * więc bez analityki baner się nie renderuje. Decyzję zapamiętujemy w
 * localStorage i natychmiast przekazujemy do Google przez gtag('consent',
 * 'update', …) — bez przeładowania strony. Stan czytamy przez
 * useSyncExternalStore, co eliminuje błędy hydratacji i migotanie.
 */
export default function CookieConsent() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  function decide(choice: ConsentChoice) {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      /* tryb prywatny / brak dostępu do localStorage — pomijamy zapis */
    }
    if (typeof window !== "undefined") {
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: choice === "granted" ? "granted" : "denied",
        });
      }
      window.dispatchEvent(new Event(CONSENT_EVENT));
    }
  }

  const decided =
    snapshot === "granted" ||
    snapshot === "denied" ||
    snapshot === SSR_SNAPSHOT;

  if (!GA_ID || decided) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Zgoda na pliki cookies"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-gold-500/20 bg-forest-900/95 backdrop-blur supports-[backdrop-filter]:bg-forest-900/85"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <p className="text-sm leading-relaxed text-cream/80">
          Używamy plików cookies, w tym narzędzi analitycznych, aby zrozumieć,
          jak korzystasz ze strony, i ją ulepszać. Możesz zaakceptować cookies
          analityczne lub korzystać wyłącznie z niezbędnych. Szczegóły w{" "}
          <Link
            href="/polityka-cookies"
            className="text-gold-400 underline-offset-2 hover:underline focus-visible:underline"
          >
            Polityce cookies
          </Link>
          .
        </p>

        <div className="flex flex-none flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="rounded-full border border-gold-500/30 px-5 py-2.5 text-sm font-semibold text-cream/85 transition hover:bg-gold-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/70"
          >
            Tylko niezbędne
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
          >
            Akceptuję wszystkie
          </button>
        </div>
      </div>
    </div>
  );
}
