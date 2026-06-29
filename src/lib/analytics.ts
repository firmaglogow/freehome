// Google Analytics 4 — wczytywane TYLKO gdy ustawiony jest identyfikator
// pomiarowy w zmiennej środowiskowej NEXT_PUBLIC_GA_ID (np. "G-XXXXXXXXXX").
//
// Dopóki zmiennej nie ma (jak teraz — na podglądzie jej nie ustawiamy), żaden
// skrypt Google się nie ładuje, nie powstają cookies analityczne, a baner zgody
// na cookies się nie pokazuje. Strona jest więc „uśpiona” pod kątem analityki
// i w pełni zgodna z RODO (cookies niezbędne nie wymagają zgody).
//
// Aby URUCHOMIĆ analitykę po przepięciu domeny: w komendzie buildu dla domeny
// docelowej dodać NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX" (obok NEXT_PUBLIC_SITE_URL).
// Nic więcej w kodzie zmieniać nie trzeba.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/** Klucz w localStorage z zapamiętaną decyzją użytkownika o cookies. */
export const CONSENT_KEY = "fh-cookie-consent";

/** Wybór użytkownika: zgoda na cookies analityczne lub jej brak. */
export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
