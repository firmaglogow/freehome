// Konfiguracja osiedli „Rynek pierwotny" (współprace deweloperskie FREE HOME).
//
// To JEDYNE miejsce, które edytujesz, żeby dodać kolejną inwestycję (docelowo do 6):
//   1. wrzuć logo do  public/rynek-pierwotny/<plik>.png
//   2. dopisz jeden wpis do tablicy `developments` poniżej.
//
// Oferty NIE są tu wpisywane — same „wpadają" do właściwego osiedla na podstawie
// powiązania z Esti (offer.investmentId). Dzięki temu lista ofert na podstronie
// osiedla aktualizuje się automatycznie przy każdym imporcie (cron), bez ruszania
// kodu. Widoczność osiedla w galerii też jest automatyczna: pokazujemy je tylko,
// gdy ma co najmniej jedną aktywną ofertę (osiedle wyłączone w Esti / bez ofert
// znika samo; pojawia się samo, gdy znów ma aktywne oferty).

import { offers as allOffers, type Offer } from "@/lib/offers";

export type Development = {
  /** Fragment adresu URL: /rynek-pierwotny/<slug>. Bez polskich znaków i spacji. */
  slug: string;
  /** Nazwa wyświetlana na kafelku i w nagłówku podstrony. */
  name: string;
  /** Deweloper — wpisywany ręcznie (Esti nie przysyła osobnego pola dewelopera). */
  developer: string;
  /** Ścieżka do logo w /public (np. "/rynek-pierwotny/nova.png"). */
  logo: string;

  // --- Powiązanie z Esti (przynajmniej jedno z dwóch) ---
  /** Stabilny klucz inwestycji z Esti (offer.investmentId). Preferowany sposób. */
  investmentId?: number;
  /**
   * Fallback, gdy nie znamy jeszcze investmentId (np. świeżo dodane osiedle):
   * dopasowuje oferty, których investmentName ZAWIERA ten tekst (bez wielkości liter).
   */
  investmentNameIncludes?: string;

  // --- Opcjonalne, uzupełniane ręcznie (pokazywane, jeśli podane) ---
  /** Krótki opis inwestycji (akapit pod nagłówkiem). */
  description?: string;
  /** Termin realizacji, np. "IV kwartał 2026" albo "Gotowe do odbioru". */
  readyDate?: string;
};

export const developments: Development[] = [
  {
    slug: "osiedle-nova",
    name: "Osiedle Nova",
    developer: "MDBS Sp. z o.o.",
    logo: "/rynek-pierwotny/nova.png",
    investmentId: 53117,
  },
  {
    slug: "osiedle-trzy-perly",
    name: "Osiedle Trzy Perły",
    developer: "Energy House Invest",
    logo: "/rynek-pierwotny/trzyperly.png",
    investmentId: 55307,
  },
  {
    slug: "blizniaczy-zakatek",
    name: "Bliźniaczy Zakątek",
    developer: "Bliźniaczy Zakątek",
    logo: "/rynek-pierwotny/blizniaczy-zakatek.png",
    // investmentId nieznane (osiedle dodane niedawno, jeszcze nie weszło w paczkę
    // Esti). Wiążemy po nazwie — gdy pojawią się oferty z investmentName
    // zawierającym „bliźniaczy", same trafią tutaj. Docelowo można dopisać
    // investmentId, gdy będzie znany.
    investmentNameIncludes: "bliźniaczy",
  },
];

/** Oferty należące do danej inwestycji (po investmentId, fallback po nazwie). */
export function offersForDevelopment(dev: Development): Offer[] {
  return allOffers.filter((o) => {
    if (dev.investmentId != null && o.investmentId === dev.investmentId) {
      return true;
    }
    if (dev.investmentNameIncludes && o.investmentName) {
      return o.investmentName
        .toLowerCase()
        .includes(dev.investmentNameIncludes.toLowerCase());
    }
    return false;
  });
}

/** Osiedla widoczne w galerii: tylko te z co najmniej jedną aktywną ofertą. */
export function activeDevelopments(): Development[] {
  return developments.filter((d) => offersForDevelopment(d).length > 0);
}

export function getDevelopment(slug: string): Development | undefined {
  return developments.find((d) => d.slug === slug);
}
