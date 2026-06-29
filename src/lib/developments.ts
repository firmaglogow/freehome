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

/** Pojedyncza sekcja opisu osiedla (nagłówek + akapity + opcjonalna lista). */
export type DevelopmentSection = {
  /** Nagłówek sekcji (np. „O inwestycji", „Standard wykończenia"). */
  heading?: string;
  /** Akapity tekstu. */
  paragraphs?: string[];
  /** Lista punktowana (atuty, standard, etapy). */
  bullets?: string[];
};

export type Development = {
  /** Fragment adresu URL: /rynek-pierwotny/<slug>. Bez polskich znaków i spacji. */
  slug: string;
  /** Nazwa wyświetlana na kafelku i w nagłówku podstrony. */
  name: string;
  /** Deweloper — wpisywany ręcznie (Esti nie przysyła osobnego pola dewelopera). */
  developer: string;
  /** Ścieżka do logo w /public (np. "/rynek-pierwotny/nova.webp"). */
  logo: string;
  /** Lokalizacja pod nazwą (np. „Radwanice", „Bytnik k. Głogowa"). */
  location?: string;

  // --- Powiązanie z Esti (przynajmniej jedno z dwóch) ---
  /** Stabilny klucz inwestycji z Esti (offer.investmentId). Preferowany sposób. */
  investmentId?: number;
  /**
   * Fallback, gdy nie znamy jeszcze investmentId (np. świeżo dodane osiedle):
   * dopasowuje oferty, których investmentName ZAWIERA ten tekst (bez wielkości liter).
   */
  investmentNameIncludes?: string;

  /**
   * Opcjonalny override opiekuna (slug z people w src/lib/site.ts). Domyślnie
   * opiekun jest brany z ofert tej inwestycji (offer.agent), więc karta agenta
   * aktualizuje się automatycznie z Esti — tu wpisujemy tylko, gdy chcemy
   * przypiąć konkretną osobę (np. osiedle bez ofert albo inny opiekun).
   */
  agentSlug?: string;

  // --- Opis (opcjonalny, uzupełniany ręcznie; pokazywany, jeśli podany) ---
  /** Krótkie hasło pod nagłówkiem (1 zdanie). Używane też w <meta description>. */
  tagline?: string;
  /** Akapit wprowadzający (lead). */
  intro?: string;
  /** Rozbudowany opis osiedla w sekcjach. */
  sections?: DevelopmentSection[];
  /** Termin realizacji, np. „lato 2026" albo „Gotowe do odbioru". */
  readyDate?: string;
  /** Zapytanie do mapy Google (np. „Szczyglice, gmina Głogów"). Domyślnie = location. */
  mapQuery?: string;
};

export const developments: Development[] = [
  {
    slug: "osiedle-nova",
    name: "Osiedle Nova",
    developer: "MDBS Sp. z o.o.",
    logo: "/rynek-pierwotny/nova.webp",
    location: "Radwanice, pow. polkowicki",
    mapQuery: "Radwanice, powiat polkowicki",
    investmentId: 53117,
    readyDate: "Gotowe / lato 2026",
    tagline: "Nowa definicja premium",
    intro:
      "Osiedle Nova to kameralna inwestycja deweloperska w Radwanicach (powiat polkowicki) — sześć nowoczesnych domów jednorodzinnych w stylu barn house przy ulicach Marsa i Wenus, w obrębie planowanego Osiedla Słonecznego. Miejsce, w którym nowoczesna architektura spotyka się ze spokojem zielonej okolicy, a najwyższa jakość wykonania idzie w parze z przemyślanym designem.",
    sections: [
      {
        heading: "O inwestycji",
        paragraphs: [
          "Sześć domów jednorodzinnych realizowanych w dwóch projektach architektonicznych. Każdy wyróżnia nowoczesna, minimalistyczna bryła z charakterystycznym dwuspadowym dachem, dużymi przeszkleniami i elewacją łączącą antracyt, biel oraz naturalne lamele z litego dębu. Wszystkie domy są parterowe, co zapewnia wygodę i funkcjonalność na co dzień.",
          "Na osiedlu nie znajdziesz dwóch identycznych domów powielonych dziesięć razy — oferujemy różne metraże i projekty, bo każdy klient ma inne potrzeby i oczekiwania.",
          "Inwestycję realizuje MDBS — firma deweloperska z ponad 12-letnim doświadczeniem w budownictwie premium. Współzałożyciele Dariusz Kowalski i Marcin Prus połączyli wieloletnie doświadczenie w zarządzaniu międzynarodowymi projektami i realizacjach budowlanych w Polsce i Wielkiej Brytanii. Budują inaczej: nie masowo, lecz z sensem; nie szybko, lecz solidnie.",
        ],
      },
      {
        heading: "Projekty i metraże",
        bullets: [
          "Projekt 1 — domy 127 m²: kompaktowy, funkcjonalny parterowiec. Salon z kuchnią i jadalnią w formie open space, trzy sypialnie, dwie łazienki, garderoba, garaż w bryle budynku i zadaszony taras. Idealny dla par i rodzin ceniących przemyślany układ.",
          "Projekt 2 — domy 135 m²: większy metraż i większa działka. Otwarta strefa dzienna, trzy sypialnie, dwie łazienki, garaż i pomieszczenie gospodarcze. Działki od ponad 10 do niemal 13 arów dają pełną swobodę aranżacji ogrodu.",
        ],
      },
      {
        heading: "Dostępność i etapy realizacji",
        bullets: [
          "Gotowe do zakupu — NOVA 1: dom 127 m² na działce 965 m² przy ul. Marsa. Stan deweloperski premium, dom w pełni wybudowany i gotowy do natychmiastowego zakupu; pompa ciepła Saunier Duval 7 kW w cenie.",
          "W budowie, odbiór lato 2026 — NOVA 3 (135 m², działka 1 072 m²) i NOVA 4 (135 m², działka 1 098 m²) przy ul. Wenus. Zaawansowana faza budowy — to idealny moment na zakup z czasem na zaplanowanie aranżacji wnętrz przed odbiorem kluczy.",
          "Wkrótce — NOVA 5 (135 m², działka 1 238 m²) i NOVA 6 (135 m², działka 1 292 m²) przy ul. Wenus. Szczegóły i ceny podamy wkrótce; zainteresowanych zapraszamy na listę oczekujących.",
          "Sprzedane — NOVA 2 (127 m², ul. Marsa).",
        ],
      },
      {
        heading: "Lokalizacja",
        paragraphs: [
          "Radwanice w powiecie polkowickim — spokojna, zielona okolica z dobrym dojazdem. Osiedle powstaje przy ulicach Marsa i Wenus, w obrębie planowanego Osiedla Słonecznego.",
        ],
      },
    ],
  },
  {
    slug: "osiedle-trzy-perly",
    name: "Osiedle Trzy Perły",
    developer: "Energy House Invest",
    logo: "/rynek-pierwotny/trzyperly.webp",
    location: "Bytnik k. Głogowa",
    mapQuery: "Bytnik, gmina Głogów",
    investmentId: 55307,
    readyDate: "Gotowe — od kwietnia 2025",
    tagline: "Luksusowe domy szeregowe 5 minut od Głogowa",
    intro:
      "Osiedle Trzy Perły to kameralna inwestycja w malowniczym Bytniku, zaledwie 5 minut od Głogowa. Nowoczesne domy w zabudowie szeregowej łączą spokój wiejskiego otoczenia z bliskością miejskich udogodnień.",
    sections: [
      {
        heading: "O inwestycji",
        paragraphs: [
          "Domy w zabudowie szeregowej o powierzchni ok. 112,88 m² na działkach ok. 240 m², zaprojektowane z myślą o funkcjonalności i komforcie codziennego życia.",
        ],
      },
      {
        heading: "Układ pomieszczeń",
        bullets: [
          "Parter (58,64 m²): przestronny salon z aneksem kuchennym (34,91 m²) z bezpośrednim wyjściem na prywatny ogród, wiatrołap (2,53 m²), pomieszczenie techniczne (2,00 m²), toaleta (1,57 m²), schowek (0,70 m²) oraz garaż (16,93 m²) z bezpośrednim wejściem do domu.",
          "Piętro (54,24 m²): cztery funkcjonalne pokoje (12,77 m², 12,28 m², 11,40 m² i 8,70 m²), nowoczesna łazienka (4,49 m²) i korytarz (4,60 m²).",
        ],
      },
      {
        heading: "Standard wykończenia",
        paragraphs: [
          "Dom sprzedawany jest w standardzie deweloperskim, który obejmuje:",
        ],
        bullets: [
          "Gładkie tynki gipsowe na ścianach i sufitach",
          "Solidne posadzki cementowe przygotowane pod wykończenie",
          "Kompletne instalacje: elektryczną, sanitarną i telewizyjną",
          "Komfortowe ogrzewanie podłogowe w całym domu",
          "Wysokiej jakości okna PCV i drzwi wejściowe z przeszkleniem",
          "Segmentową bramę garażową",
          "Schody żelbetowe i w pełni wykończony garaż",
        ],
      },
      {
        heading: "Lokalizacja",
        paragraphs: [
          "Bytnik to spokojna miejscowość w gminie Głogów — zaledwie 7 km od centrum miasta (ok. 10 minut samochodem).",
        ],
        bullets: [
          "Cicha okolica z dala od miejskiego zgiełku, otoczona terenami zielonymi",
          "Tereny zielone idealne na rodzinne spacery i aktywny wypoczynek",
          "Dobra infrastruktura i utwardzona droga gminna — wygodny dojazd przez cały rok",
        ],
      },
      {
        heading: "Atuty i komfort zakupu",
        bullets: [
          "Możliwość wykończenia domu „pod klucz” za 140 000 zł, z pełnym dostosowaniem do oczekiwań",
          "Prywatny ogród do własnej aranżacji",
          "Dwa miejsca postojowe przed budynkiem oraz garaż",
          "Bezpieczna lokalizacja — teren poza obszarem górniczym i zagrożeniem powodziowym",
          "Brak podatku PCC (0%) przy zakupie bezpośrednio od dewelopera",
          "Możliwość wprowadzenia się już od kwietnia 2025 roku",
        ],
      },
    ],
  },
  {
    slug: "blizniaczy-zakatek",
    name: "Bliźniaczy Zakątek",
    developer: "Bliźniaczy Zakątek",
    // ?v=2 — wymusza świeże pobranie loga (stara wersja z białym tłem siedziała
    // w cache przeglądarek pod tym samym URL-em; zmiana adresu = czysty refresh).
    logo: "/rynek-pierwotny/blizniaczy-zakatek.webp?v=2",
    location: "Głogów / Szczyglice",
    mapQuery: "Szczyglice, gmina Głogów",
    // Opiekun inwestycji ustawiony ręcznie (w Esti opiekunem ofert jest Daria).
    agentSlug: "daria-lukasik",
    // investmentId nieznane (osiedle dodane niedawno, jeszcze nie weszło w paczkę
    // Esti). Wiążemy po nazwie — gdy pojawią się oferty z investmentName
    // zawierającym „bliźniaczy", same trafią tutaj. Docelowo można dopisać
    // investmentId, gdy będzie znany.
    investmentNameIncludes: "bliźniaczy",
    readyDate: "czerwiec 2026",
    tagline: "Kameralne osiedle domów w Szczyglicach pod Głogowem",
    intro:
      "Bliźniaczy Zakątek to kameralne osiedle w budowie — osiem domów w zabudowie bliźniaczej na pograniczu Głogowa i Szczyglic, wśród pól, łąk i niskiej zabudowy. To miejsce dla osób, które cenią ciszę, zieleń i domowy charakter, a jednocześnie nie chcą rezygnować z wygodnego dojazdu do centrum, szkół i sklepów.",
    sections: [
      {
        heading: "Etap inwestycji",
        paragraphs: [
          "Osiedle jest w trakcie realizacji i cieszy się dużym zainteresowaniem:",
        ],
        bullets: [
          "1 dom — sprzedany",
          "1 dom — w budowie, na ukończeniu (planowany termin: koniec czerwca 2026)",
          "Kolejne 5 domów — wkrótce w realizacji",
        ],
      },
      {
        heading: "Metraż i układ",
        paragraphs: [
          "Każdy dom to 130,17 m² powierzchni, 5 pokoi i garaż w bryle budynku, na działce ok. 500 m².",
        ],
        bullets: [
          "Parter — strefa dzienna: przedpokój (4,83 m²), pokój dzienny z aneksem kuchennym ok. 38,45 m² z wyjściem na ogród, pomieszczenie gospodarcze (3,08 m²), WC (1,94 m²), garderoba (2,44 m²) oraz garaż w bryle (16,50 m²) z bramą otwieraną na pilota.",
          "Piętro — strefa prywatna: cztery niezależne sypialnie, łazienka i dodatkowa garderoba.",
        ],
      },
      {
        heading: "Standard wykończenia",
        paragraphs: [
          "Domy sprzedawane są w stanie surowym zamkniętym z wykonaną elewacją, gotowe do indywidualnej aranżacji wnętrz. W cenie nowoczesna, energooszczędna konstrukcja:",
        ],
        bullets: [
          "Ściany z bloczków Suporex Solbet klasa 450, grubość 24 cm",
          "Ocieplenie styropianem EPS 038, grubość 15 cm",
          "Dachówka betonowa Braas Celtycka Lumino",
          "Okna trzyszybowe w kolorze grafitowym",
          "Elektrycznie sterowane rolety zewnętrzne",
          "Wykonane ścianki działowe na obu poziomach",
          "Brama garażowa otwierana na pilota",
          "Prąd doprowadzony w drodze przy działce oraz możliwość podłączenia wodociągu",
          "Brak gazu — idealne warunki pod pompę ciepła, rekuperację i fotowoltaikę",
        ],
      },
      {
        heading: "Architektura",
        paragraphs: [
          "Jasna elewacja, grafitowy dach, antracytowe detale i garaże wkomponowane w bryłę budynku — architektura prosta, uporządkowana i ponadczasowa, z ciepłym, domowym charakterem.",
        ],
      },
      {
        heading: "Lokalizacja",
        paragraphs: [
          "Szczyglice to kameralna okolica na pograniczu Głogowa, gdzie pola, łąki i niska zabudowa pozwalają odpocząć od miejskiego zgiełku.",
        ],
        bullets: [
          "Spokojne, zielone otoczenie z dala od ruchu i hałasu",
          "Szkoły i sklepy w pobliżu",
          "Lasy, łąki i pola idealne na spacery i aktywny wypoczynek",
          "Szybki i wygodny dojazd do Głogowa",
        ],
      },
      {
        heading: "Atuty",
        bullets: [
          "Własna działka ok. 500 m² do dowolnej aranżacji ogrodu",
          "Garaż w bryle budynku oraz miejsce postojowe",
          "Energooszczędna technologia przygotowana pod OZE",
          "Rok budowy: 2026",
        ],
      },
    ],
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
