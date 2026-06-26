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
