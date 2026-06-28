// Jedno źródło prawdy WYRÓŻNIEŃ FREE HOME — zasila /dlaczego-my, /o-nas, stopkę i SocialProof.
//
// ŹRÓDŁO PRAWDY treści: brief/poprawki/WYROZNIENIA_FREE_HOME_FINAL.md
//   + uzupełnienia ze screenów marki osobistej (certyfikat 2016, marketing/współpraca).
// Zasada: każdy claim z kwalifikatorem — w 100% obronny. Nic nie pomijać.
//
// AKTUALIZACJA W PRZYSZŁOŚCI:
//   • dodajesz nagrodę → dopisz obiekt do właściwej tablicy (kolejność = od najnowszych),
//   • masz plik logo → wrzuć do public/nagrody/<id>.webp i ustaw pole `logo: "/nagrody/<id>.webp"`,
//     bez logo komponent pokaże elegancki kafelek z ikoną (pole `icon`).
//   • krótkie hasła do „chipów" (stopka, O nas, strona główna) → `awardHighlights` na dole pliku.

import { site } from "./site";

export type AwardKind = "nagroda" | "wyroznienie" | "certyfikat" | "ranking" | "status";

/** Klucz ikony-zastępczej rysowanej, gdy brak pliku logo (mapa SVG w AwardsGrid). */
export type AwardIcon =
  | "trophy"
  | "crown"
  | "medal"
  | "star"
  | "sparkle"
  | "trending"
  | "shield"
  | "book"
  | "people"
  | "trademark"
  | "google"
  | "handshake"
  | "megaphone";

export type Award = {
  /** Unikalny identyfikator (slug). Używany też jako nazwa pliku logo: /nagrody/<id>.webp. */
  id: string;
  title: string;
  /** Rok lub zakres: "2026", "2022–2026 (5×)", "2020/2021". */
  year?: string;
  /** Etykieta-chip: Nagroda / Wyróżnienie / Certyfikat / Ranking / Status. */
  kind: AwardKind;
  /** Krótki opis na kafelku. */
  desc: string;
  /** Rozszerzony opis w modalu (pełny kontekst, kwalifikatory, dowody). */
  detail?: string;
  /** Organizator / instytucja przyznająca. */
  organizer?: string;
  /** Ścieżka do logotypu w /nagrody/ (gdy dostępny). Brak → kafelek z ikoną. */
  logo?: string;
  /** Klucz ikony-zastępczej (gdy brak logo). */
  icon: AwardIcon;
  /** Dyskretna nota, np. "Park Home — sprzed FREE HOME". */
  note?: string;
};

export type Stat = { value: string; label: string; sub: string };

/** Etykiety chipów dla typu wyróżnienia. */
export const kindLabel: Record<AwardKind, string> = {
  nagroda: "Nagroda",
  wyroznienie: "Wyróżnienie",
  certyfikat: "Certyfikat",
  ranking: "Ranking",
  status: "Status prawny",
};

// ─────────────────────────────────────────────────────────────────────────────
// SEKCJA 2 — LICZBY (duże kafelki, pierwsze „wow")
// ─────────────────────────────────────────────────────────────────────────────
export const stats: Stat[] = [
  {
    value: `${site.reviewsCount}+`,
    label: "opinii Google — średnia 5,0",
    sub: "Najwięcej wyłącznie pozytywnych opinii wśród biur w regionie głogowskim",
  },
  { value: "10 lat", label: "na rynku nieruchomości", sub: "Konsekwentnie od 2016 roku" },
  { value: "300+", label: "przeprowadzonych transakcji", sub: "Sprzedaże i zakupy domów, mieszkań, działek" },
  { value: "5×", label: "Orły Nieruchomości GOLD", sub: "2022 · 2023 · 2024 · 2025 · 2026" },
  { value: "3,37%", label: "najlepszych firm w Polsce", sub: "Grono Orłów Nieruchomości GOLD 2026" },
  { value: "#1", label: "pozycja w Google", sub: "Na frazy o nieruchomościach w regionie" },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEKCJA 3 — STATUS PRAWNY MARKI (wyróżniony „hero" + certyfikaty/licencje)
// ─────────────────────────────────────────────────────────────────────────────

/** Najmocniejszy element statusu — zastrzeżony znak towarowy ®. Renderowany osobno, na wyróżnieniu. */
export const trademark: Award = {
  id: "znak-towarowy",
  title: "Zastrzeżony znak towarowy ®",
  kind: "status",
  icon: "trademark",
  desc:
    "Nazwa i logo FREE HOME objęte prawem ochronnym Urzędu Patentowego RP — wyłączność na posługiwanie się marką na rynku nieruchomości.",
  detail:
    "FREE HOME to marka chroniona prawnie. Prawo ochronne Urzędu Patentowego RP daje wyłączność na posługiwanie się nazwą i logo w branży nieruchomości — to gwarancja, że współpracujesz z oryginałem, a nie z podszywającą się konkurencją.",
  organizer: "Urząd Patentowy RP (UPRP)",
};

/** Certyfikaty i licencje (kafelki). Licencja PPRN podawana z numerem. */
export const certificates: Award[] = [
  {
    id: "licencja-pprn",
    title: "Licencja Pośrednika w Obrocie Nieruchomościami",
    year: "2023",
    kind: "certyfikat",
    icon: "shield",
    desc: "Nr licencji 25356 — etyka i standardy zawodowe potwierdzone przez federację branżową.",
    detail:
      "Licencja Pośrednika nr 25356 nadana przez Federację Porozumienie Polskiego Rynku Nieruchomości (PPRN). To dobrowolne, branżowe potwierdzenie kwalifikacji i etyki zawodowej — wykraczające poza ustawowe minimum.",
    organizer: "Federacja Porozumienie Polskiego Rynku Nieruchomości (PPRN)",
  },
  {
    id: "certyfikat-partnerstwa",
    title: "Certyfikat Partnerstwa",
    year: "2022",
    kind: "certyfikat",
    icon: "people",
    desc: "Wyróżnienie portalu za skuteczną promocję ofert i profesjonalizm współpracy.",
    organizer: "Portal nieruchomosci-online.pl",
  },
  {
    id: "certyfikat-doradcy",
    title: "Certyfikat Doradcy ds. Nieruchomości",
    year: "2016",
    kind: "certyfikat",
    icon: "book",
    desc: "Ukończenie intensywnego szkolenia z wiedzy teoretycznej i praktycznej — fundament warsztatu.",
    organizer: "Home Broker",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEKCJA 4 — NAGRODY BRANŻOWE (FIRMA) — klikalne kafelki
// ─────────────────────────────────────────────────────────────────────────────
export const companyAwards: Award[] = [
  {
    id: "orly-gold",
    title: "Orły Nieruchomości GOLD — 5×",
    year: "2022 · 2023 · 2024 · 2025 · 2026",
    kind: "nagroda",
    icon: "trophy",
    desc:
      "Pięć lat z rzędu w gronie najlepiej ocenianych firm nieruchomości w Polsce — na podstawie opinii klientów.",
    detail:
      "Pięciokrotny laureat (2022, 2023, 2024, 2025, 2026). Edycja 2026 = grono 3,37% najlepiej ocenianych firm nieruchomościowych w Polsce; ocena na podstawie opinii klientów z internetu (min. 8/10 pkt). Edycja 2022: ocena 9.0/10. Fizyczne potwierdzenia w biurze: statuetka Orłów 2025 oraz dyplomy GOLD 2026 i 2022.",
    organizer: "Plebiscyty Branżowe ORŁY (Beautiful Company / Bright Side Solutions)",
  },
  {
    id: "prestizowa-marka",
    title: "Prestiżowa Marka 2026 — 1. miejsce (TOP 1)",
    year: "2026",
    kind: "nagroda",
    icon: "crown",
    desc:
      "Certyfikat i list gratulacyjny za realizację usług w standardzie premium oraz dbałość o każdy detal procesu sprzedaży.",
    detail:
      "Tytuł Prestiżowa Marka 2026 z 1. miejscem (TOP 1) — wyróżnienie za realizację usług w standardzie premium i dbałość o każdy detal procesu sprzedaży. W komplecie certyfikat i list gratulacyjny.",
    organizer: "K&K Promotion",
    // Właściciel ma plik logo (wersja na ciemnym tle). Po wgraniu do public/nagrody/ ustaw:
    // logo: "/nagrody/prestizowa-marka.webp",
  },
  {
    id: "zlota-firma",
    title: "Złota Firma — 2023 i 2025",
    year: "2023 · 2025",
    kind: "nagroda",
    icon: "star",
    desc:
      "Tytuł dla firm utrzymujących min. 75% pozytywnych recenzji — kryteria spełnia ~10% podmiotów w Polsce.",
    detail:
      "Dwukrotny laureat (2023 i 2025). Tytuł przyznawany firmom, które utrzymują minimum 75% pozytywnych recenzji w sieci — kryterium spełnia tylko ok. 10% podmiotów w Polsce.",
    organizer: "Złota Firma",
  },
  {
    id: "orly-branzy",
    title: "Orły Branży 2026",
    year: "2026",
    kind: "wyroznienie",
    icon: "medal",
    desc: "Wyróżnienie potwierdzające pozycję lidera. Z rodziny Plebiscytów Branżowych ORŁY.",
    organizer: "Plebiscyty Branżowe ORŁY",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEKCJA 5 — OCENY I POZYCJE RANKINGOWE
// ─────────────────────────────────────────────────────────────────────────────
export const rankings: Award[] = [
  {
    id: "opinie-google",
    title: `${site.reviewsCount}+ opinii Google — średnia 5.0`,
    kind: "ranking",
    icon: "google",
    desc: "Największa liczba wyłącznie pozytywnych opinii wśród biur w regionie głogowskim.",
    detail:
      "Średnia ocen 5,0 przy największej liczbie opinii wśród biur nieruchomości w regionie głogowskim. Wyłącznie pozytywne opinie realnych klientów — najtwardszy dowód jakości obsługi.",
    organizer: "Google",
  },
  {
    id: "top25-otodom",
    title: "TOP 25 biur w Polsce — Otodom",
    kind: "ranking",
    icon: "trending",
    desc: "Jakość ogłoszeń 100/100. Ranking oparty wyłącznie na danych.",
    detail:
      "Miejsce w TOP 25 biur nieruchomości w Polsce wg Otodom przy jakości ogłoszeń 100/100. Ranking oparty wyłącznie na twardych danych: kompletność ogłoszeń, jakość zdjęć, terminowość aktualizacji.",
    organizer: "Otodom (Grupa OLX)",
  },
  {
    id: "lider-jakosci-otodom",
    title: "Lider Jakości Otodom 2025 — 2. miejsce w Polsce",
    year: "2025",
    kind: "ranking",
    icon: "medal",
    desc:
      "2. miejsce w Polsce wśród biur butikowych (do 49 ogłoszeń). Ocena kwartalna przez AI Otodom.",
    detail:
      "Drugie miejsce w Polsce w kategorii biur butikowych (do 49 ogłoszeń) za wynik 80–89,9% jakości ogłoszeń. Ocena kwartalna prowadzona przez AI Otodom — w pełni obiektywna.",
    organizer: "Otodom (Grupa OLX)",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEKCJA 6 — LUDZIE (Grzegorz i Daria)
// ─────────────────────────────────────────────────────────────────────────────
export const grzegorzAwards: Award[] = [
  {
    id: "osobowosc-roku",
    title: "Osobowość Roku 2025 — Powiat Głogowski",
    year: "2025",
    kind: "wyroznienie",
    icon: "sparkle",
    desc:
      "Kategoria Biznes i Przedsiębiorczość. Wybór mieszkańców; nagroda odebrana na gali we Wrocławiu.",
    detail:
      "Tytuł Osobowość Roku 2025 dla powiatu głogowskiego w kategorii Biznes i Przedsiębiorczość. Zwycięstwo w plebiscycie rozstrzygniętym głosami mieszkańców; nagroda odebrana na gali wojewódzkiej we Wrocławiu.",
    organizer: "Gazeta Wrocławska / Polska Press",
  },
  {
    id: "doradca-roku",
    title: "Doradca Roku 2020/2021",
    year: "2020/2021",
    kind: "nagroda",
    icon: "trending",
    desc: "Za największą liczbę pozysków w firmie.",
    organizer: "Park Home",
    note: "Park Home — sprzed FREE HOME",
  },
  {
    id: "najwyzszy-przychod",
    title: "Nagroda za najwyższy indywidualny przychód",
    year: "2021",
    kind: "nagroda",
    icon: "trending",
    desc: "Za najlepsze wyniki sprzedażowe w firmie.",
    organizer: "Park Home",
    note: "Park Home — sprzed FREE HOME",
  },
];

export const dariaAwards: Award[] = [
  {
    id: "mistrzowie-handlu",
    title: "Mistrzowie Handlu / Pośrednik Roku 2025 — TOP 5",
    year: "2025",
    kind: "wyroznienie",
    icon: "medal",
    desc:
      "5. miejsce wśród agentów nieruchomości w województwie dolnośląskim.",
    detail:
      "Nominacja i 5. miejsce (TOP 5) w rankingu Mistrzowie Handlu / Pośrednik Roku 2025 wśród agentów nieruchomości całego województwa dolnośląskiego.",
    organizer: "Gazeta Wrocławska",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEKCJA (dodatkowa) — NIESTANDARDOWY MARKETING I WSPÓŁPRACA
// (ze screenów marki — rzeczy, które wyróżniają FREE HOME poza nagrodami)
// ─────────────────────────────────────────────────────────────────────────────
export const partnerships: Award[] = [
  {
    id: "ambasador-chrobry",
    title: "Ambasador Chrobry Głogów",
    kind: "wyroznienie",
    icon: "handshake",
    desc:
      "Współpraca z lokalnym klubem piłkarskim — obecność na meczach i budowanie relacji z lokalną społecznością i biznesem.",
  },
  {
    id: "sponsoring-mma",
    title: "Sponsoring MMA",
    kind: "wyroznienie",
    icon: "handshake",
    desc:
      "Logo FREE HOME na ramieniu Denisa Labrygi podczas głośnych gal MMA — niestandardowy marketing o szerokim zasięgu.",
  },
  {
    id: "ebook-academy",
    title: "eBook „Agent 2.0” i FREE HOME Academy",
    year: "2025",
    kind: "wyroznienie",
    icon: "book",
    desc:
      "Autorska publikacja i program edukacyjny — dzielenie się wiedzą i wyznaczanie trendów w nowoczesnej obsłudze klienta.",
  },
  {
    id: "kampania-marketingowa",
    title: "Największa lokalna akcja marketingowa",
    kind: "wyroznienie",
    icon: "megaphone",
    desc:
      "Autor największej akcji reklamowej w regionie wśród lokalnych firm — lider, który zamiast projektować reklamy, po prostu sprzedaje mieszkania.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CHIPY — krótkie hasła wyróżnień (stopka, O nas, strona główna).
// Zastępuje dawną tablicę `awards` ze site.ts (zaktualizowane, kanoniczne wartości).
// ─────────────────────────────────────────────────────────────────────────────
export const awardHighlights: string[] = [
  "Orły Nieruchomości GOLD ×5 (2022–2026)",
  "Prestiżowa Marka 2026 — TOP 1",
  "Złota Firma 2023 i 2025",
  "Orły Branży 2026",
  "TOP 25 biur w Polsce — Otodom",
  "Zastrzeżony znak towarowy ®",
];
