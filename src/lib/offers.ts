// Oferty wczytywane z src/data/offers.json.
// Ten plik JSON generuje importer EstiCRM (importer/lib/JsonExporter.php) —
// do czasu podpięcia Esti zawiera dane przejściowe (Głogów). Front czyta je
// przy budowaniu, więc strona pozostaje w pełni statyczna (GitHub Pages / hosting).
import offersData from "@/data/offers.json";
import glogowOsiedlaData from "@/data/glogow-osiedla.json";

export type Transaction = "sprzedaz" | "wynajem" | "kupno" | "najem";

export type Offer = {
  id: string;
  slug: string;
  title: string;
  transaction: Transaction;
  type: string;
  location: string;
  price: number;
  pricePerMeter?: number | null;
  areaTotal: number;
  rooms?: number | null;
  floor?: string | null;
  image: string;
  promoted?: boolean;
  // Agent prowadzący ofertę (slug z people). Mapowanie z opiekuna w Esti
  // konfiguruje się w importer/config.php (agent_map).
  agent?: string | null;

  // --- Pola z importu EstiCRM (opcjonalne; mock ma je puste) ---
  estiId?: number | null;
  typeName?: string | null;
  city?: string | null;
  // Adres szczegółowy z Esti (JsonExporter): ulica, typ ulicy ("ul."/"al.") i
  // osiedle/dzielnica (precinct). Opcjonalne — mock i część ofert ich nie mają.
  street?: string | null;
  streetType?: string | null;
  estate?: string | null;
  areaPlot?: number | null;
  gallery?: string[];
  // Rzuty / plany mieszkania (Esti picture type=120). Oddzielone od `gallery`
  // przez importer (JsonExporter), pokazywane w osobnej zakładce „Pokaż plan".
  plans?: string[];
  geo?: { lat: number; lng: number } | null;
  description?: string | null;
  descriptionHtml?: string | null;
  market?: string | null;
  buildingYear?: number | null;
  agentName?: string | null;
  agentPhone?: string | null;
  updatedAt?: string | null;
  // --- Rynek pierwotny (inwestycje deweloperskie) ---
  // Powiązanie oferty z inwestycją w Esti. investmentId to stabilny klucz
  // (po nim wiążemy oferty z osiedlem w src/lib/developments.ts); investmentName
  // bywa „rozjechany" w Esti, więc służy tylko jako fallback dopasowania.
  investmentId?: number | null;
  investmentName?: string | null;
  // Data dodania oferty w EstiCRM (addDate z XML). Używana do sortowania
  // „najnowszych" na stronie głównej. Format „Y-m-d H:i:s" → porównanie
  // leksykograficzne = chronologiczne.
  addDate?: string | null;
};

export const offers: Offer[] = offersData as unknown as Offer[];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(n);

export const formatArea = (n: number) =>
  `${new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 1 }).format(n)} m²`;

// === Osiedle (dzielnica) — auto-wyprowadzanie z ulicy ============================
// Esti ma jedno pole „Miejscowość / dzielnica", więc osiedle (precinct → estate)
// bywa puste przy większości ofert z Głogowa. Żeby osiedle pokazywało się ZAWSZE
// dla Głogowa (i działało dla każdej NOWEJ oferty automatycznie przy buildzie),
// trzymamy słownik ulica → osiedle w src/data/glogow-osiedla.json. Słownik został
// wygenerowany z OpenStreetMap (granice osiedli admin_level=9) metodą głosowania
// wierzchołków geometrii ulicy. Można go ręcznie poprawiać.
//
// Priorytet: jeśli Esti poda estate (precinct) — używamy go. W przeciwnym razie,
// dla ofert z Głogowa, wyprowadzamy osiedle z ulicy przez słownik.
const OSIEDLA_ULICE = glogowOsiedlaData.ulice as Record<string, string>;

// Lista osiedli Głogowa do filtrów (wyszukiwarka). Tylko te, które mają ulice.
export const glogowOsiedla: string[] = glogowOsiedlaData.osiedla as string[];

// Człony typu ulicy do pominięcia przy normalizacji (ul. Wolności = Wolności).
const STREET_TYPE_TOKENS = new Set([
  "ul", "ulica", "al", "aleja", "aleje", "pl", "plac", "os", "osiedle",
  "rondo", "most", "brama", "skwer", "bulwar", "droga", "szosa", "trakt",
  "deptak", "pasaz", "wybrzeze",
]);

// Normalizacja nazwy — MUSI być identyczna ze skryptem generującym słownik
// (małe litery, ł→l, usunięcie znaków diakrytycznych i interpunkcji).
const normName = (s: string | null | undefined): string =>
  (s ?? "")
    .toLowerCase()
    .trim()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const stripStreetType = (n: string): string => {
  const t = n.split(" ");
  return t.length > 1 && STREET_TYPE_TOKENS.has(t[0]) ? t.slice(1).join(" ") : n;
};

const isGlogow = (offer: Offer): boolean =>
  normName(offer.city || offer.location) === "glogow";

// Osiedle oferty: estate z Esti ma priorytet; inaczej wyprowadzamy z ulicy
// (tylko dla Głogowa). Zwraca null, gdy nie da się ustalić.
export const resolveEstate = (offer: Offer): string | null => {
  const fromEsti = offer.estate?.trim();
  if (fromEsti) return fromEsti;
  if (!isGlogow(offer)) return null;
  const street = offer.street?.trim();
  if (!street) return null;
  const st = offer.streetType?.trim() ?? "";
  const candidates = [
    normName(street),
    stripStreetType(normName(street)),
    normName(`${st} ${street}`),
    stripStreetType(normName(`${st} ${street}`)),
  ];
  for (const c of candidates) {
    if (c && OSIEDLA_ULICE[c]) return OSIEDLA_ULICE[c];
  }
  return null;
};

// Pełna lokalizacja oferty do nagłówka karty: miasto, osiedle i ulica.
// Składamy z osobnych pól (city/estate/street) zamiast gotowego `location`,
// żeby pokazać ulicę i osiedle obok siebie. Puste pola pomijamy, duplikaty
// (np. osiedle = miasto w niektórych rekordach Esti) usuwamy. Gdy brak danych
// szczegółowych — wracamy do `location`. Osiedle pochodzi z resolveEstate
// (Esti estate albo auto-wyprowadzenie z ulicy dla Głogowa).
export const formatOfferPlace = (offer: Offer): string => {
  const streetType = offer.streetType?.trim();
  const rawStreet = offer.street?.trim();
  const street = rawStreet
    ? `${streetType ? `${streetType} ` : "ul. "}${rawStreet}`
    : null;
  const parts = [
    offer.city?.trim() || offer.location,
    resolveEstate(offer),
    street,
  ].filter((p): p is string => Boolean(p));
  const unique = parts.filter((p, i) => parts.indexOf(p) === i);
  return unique.join(", ") || offer.location;
};

// Etykieta transakcji w mianowniku rzeczownika oferty: „Mieszkanie NA SPRZEDAŻ".
const TRANSACTION_SUFFIX: Record<Transaction, string> = {
  sprzedaz: "na sprzedaż",
  wynajem: "na wynajem",
  najem: "na wynajem",
  kupno: "— kupno",
};

// Krótka etykieta transakcji na „pigułkę" (badge) przy zdjęciu.
const TRANSACTION_BADGE: Record<Transaction, string> = {
  sprzedaz: "Sprzedaż",
  wynajem: "Wynajem",
  najem: "Wynajem",
  kupno: "Kupno",
};

export const formatTransactionBadge = (offer: Offer): string =>
  TRANSACTION_BADGE[offer.transaction] ?? "Sprzedaż";

// Nagłówek oferty: typ + transakcja, np. „Mieszkanie na sprzedaż".
// Zastępuje surowy `title` z Esti, który zwykle powtarza typ i miejscowość
// („Mieszkanie na sprzedaż, Jędrzychowice") — miejsce pokazujemy osobno przez
// formatOfferPlace, więc nie dublujemy tych samych danych w jednej sekcji.
export const formatOfferHeading = (offer: Offer): string => {
  const suffix = TRANSACTION_SUFFIX[offer.transaction];
  return suffix ? `${offer.type} ${suffix}` : offer.type;
};
