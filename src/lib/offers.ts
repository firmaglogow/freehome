// DANE TYMCZASOWE (mock). Docelowo oferty pochodzą z importera EstiCRM XML (Etap 2).
// Struktura pól odzwierciedla przyszły model danych oferty z Esti.

export type Offer = {
  id: string;
  slug: string;
  title: string;
  transaction: "sprzedaz" | "wynajem";
  type: string;
  location: string;
  price: number;
  pricePerMeter?: number;
  areaTotal: number;
  rooms?: number;
  floor?: string;
  image: string;
  promoted?: boolean;
};

const PLN = (n: number) => n;

export const offers: Offer[] = [
  {
    id: "FH-1001",
    slug: "dom-stodola-glogow-okolice-FH-1001",
    title: "Nowoczesny dom w stylu stodoły",
    transaction: "sprzedaz",
    type: "Dom",
    location: "Głogów — okolice",
    price: PLN(890000),
    pricePerMeter: 6357,
    areaTotal: 140,
    rooms: 4,
    image: "/oferty/oferta-1.webp",
    promoted: true,
  },
  {
    id: "FH-1002",
    slug: "dzialka-budowlana-radwanice-FH-1002",
    title: "Działka budowlana z widokiem",
    transaction: "sprzedaz",
    type: "Działka",
    location: "Radwanice",
    price: PLN(165000),
    areaTotal: 1100,
    image: "/oferty/oferta-2.webp",
    promoted: true,
  },
  {
    id: "FH-1003",
    slug: "dom-jednorodzinny-polkowice-FH-1003",
    title: "Dom jednorodzinny pod klucz",
    transaction: "sprzedaz",
    type: "Dom",
    location: "Polkowice",
    price: PLN(749000),
    pricePerMeter: 5992,
    areaTotal: 125,
    rooms: 5,
    image: "/oferty/oferta-3.webp",
    promoted: true,
  },
  {
    id: "FH-1004",
    slug: "posiadlosc-glogow-okolice-FH-1004",
    title: "Przestronna posiadłość z ogrodem",
    transaction: "sprzedaz",
    type: "Dom",
    location: "Głogów — okolice",
    price: PLN(1190000),
    pricePerMeter: 6611,
    areaTotal: 180,
    rooms: 6,
    image: "/oferty/oferta-4.webp",
  },
  {
    id: "FH-1005",
    slug: "mieszkanie-glogow-centrum-FH-1005",
    title: "Mieszkanie w centrum Głogowa",
    transaction: "sprzedaz",
    type: "Mieszkanie",
    location: "Głogów",
    price: PLN(389000),
    pricePerMeter: 7096,
    areaTotal: 54.8,
    rooms: 3,
    floor: "2/4",
    image: "/oferty/oferta-5.webp",
  },
  {
    id: "FH-1006",
    slug: "dzialka-inwestycyjna-przemkow-FH-1006",
    title: "Działka inwestycyjna",
    transaction: "sprzedaz",
    type: "Działka",
    location: "Przemków",
    price: PLN(245000),
    areaTotal: 2500,
    image: "/oferty/oferta-6.webp",
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(n);

export const formatArea = (n: number) =>
  `${new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 1 }).format(n)} m²`;
