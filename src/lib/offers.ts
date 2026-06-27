// Oferty wczytywane z src/data/offers.json.
// Ten plik JSON generuje importer EstiCRM (importer/lib/JsonExporter.php) —
// do czasu podpięcia Esti zawiera dane przejściowe (Głogów). Front czyta je
// przy budowaniu, więc strona pozostaje w pełni statyczna (GitHub Pages / hosting).
import offersData from "@/data/offers.json";

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

// Pełna lokalizacja oferty do nagłówka karty: miasto, osiedle i ulica.
// Składamy z osobnych pól (city/estate/street) zamiast gotowego `location`,
// żeby pokazać ulicę i osiedle obok siebie. Puste pola pomijamy, duplikaty
// (np. osiedle = miasto w niektórych rekordach Esti) usuwamy. Gdy brak danych
// szczegółowych — wracamy do `location`.
export const formatOfferPlace = (offer: Offer): string => {
  const streetType = offer.streetType?.trim();
  const rawStreet = offer.street?.trim();
  const street = rawStreet
    ? `${streetType ? `${streetType} ` : "ul. "}${rawStreet}`
    : null;
  const parts = [
    offer.city?.trim() || offer.location,
    offer.estate?.trim(),
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
