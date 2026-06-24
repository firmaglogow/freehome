// Centralna konfiguracja treści FREE HOME.
// Treści [DO UZUPEŁNIENIA] są oznaczone i łatwe do podmiany przez właściciela.

export const site = {
  name: "FREE HOME",
  fullName: "FREE HOME Nieruchomości",
  tagline: "Twoje lokalne biuro nieruchomości",
  subtitle: "Głogów i okolice. Ludzie, których znasz.", // [DO UZUPEŁNIENIA — warianty hasła]
  domain: "freehome.pl",
  url: "https://www.freehome.pl",
  phone: "537 264 666",
  phoneHref: "tel:+48537264666",
  email: "kontakt@freehome.com.pl", // [POTWIERDZIĆ dokładny adres]
  address: {
    street: "ul. Grodzka 18",
    city: "Głogów",
    region: "woj. dolnośląskie",
  },
  legal: {
    license: "PPRN 25356",
    nip: "693-210-77-22",
    regon: "386615248",
  },
  hours: "Pon–Pt 9:00–17:00 [DO POTWIERDZENIA]",
  social: {
    facebook: "https://facebook.com/firmaglogow",
    // instagram: "[DO UZUPEŁNIENIA]",
  },
  related: [
    { label: "freehomeinwest.pl — inwestycje deweloperskie", href: "https://freehomeinwest.pl" },
    { label: "grzegorzlukasik.com — marka osobista", href: "https://grzegorzlukasik.com" },
  ],
  reviewsCount: 254,
} as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Oferty", href: "/oferty" },
  { label: "Usługi", href: "/uslugi" },
  { label: "O nas", href: "/o-nas" },
  { label: "Ludzie", href: "/ludzie" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
];

export type Person = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  phone?: string;
  email?: string;
  photo: string;
};

// 3 równorzędne osoby — bez hierarchii.
// UWAGA: zdjęcia dwóch osób (daria/angela) do POTWIERDZENIA który plik = która osoba.
export const people: Person[] = [
  {
    slug: "grzegorz-lukasik",
    name: "Grzegorz Łukasik",
    role: "Agent nieruchomości",
    bio: "[DO UZUPEŁNIENIA — krótkie bio: doświadczenie, specjalizacja, dlaczego warto.]",
    phone: site.phone,
    email: site.email,
    photo: "/zespol/grzegorz.jpg",
  },
  {
    slug: "daria-lukasik",
    name: "Daria Łukasik",
    role: "Agentka nieruchomości",
    bio: "[DO UZUPEŁNIENIA — krótkie bio.]",
    phone: "[DO UZUPEŁNIENIA]",
    email: "[DO UZUPEŁNIENIA]",
    photo: "/zespol/daria.jpg", // [POTWIERDZIĆ zdjęcie]
  },
  {
    slug: "angela",
    name: "Angela",
    role: "Agentka nieruchomości",
    bio: "[DO UZUPEŁNIENIA — krótkie bio.]",
    phone: "[DO UZUPEŁNIENIA]",
    email: "[DO UZUPEŁNIENIA]",
    photo: "/zespol/angela.jpg", // [POTWIERDZIĆ zdjęcie]
  },
];

export type Service = {
  slug: string;
  title: string;
  desc: string;
  href: string;
};

export const services: Service[] = [
  {
    slug: "sprzedaz",
    title: "Sprzedaż",
    desc: "Kompleksowa obsługa sprzedaży — wycena, marketing, bezpieczna transakcja.",
    href: "/uslugi/sprzedaz",
  },
  {
    slug: "zakup",
    title: "Zakup",
    desc: "Pomoc w znalezieniu i zakupie wymarzonej nieruchomości w Głogowie i okolicy.",
    href: "/uslugi/zakup",
  },
  {
    slug: "wynajem",
    title: "Wynajem",
    desc: "Najem mieszkań i lokali — dla właścicieli i najemców, bez stresu.",
    href: "/uslugi/wynajem",
  },
  {
    slug: "deweloperzy",
    title: "Deweloperzy",
    desc: "Obsługa inwestycji deweloperskich. Zobacz freehomeinwest.pl.",
    href: "/uslugi/deweloperzy",
  },
  {
    slug: "kredyty",
    title: "Finansowanie",
    desc: "Kredyty i ubezpieczenia z naszym ekspertem (partner: Lendi).",
    href: "/uslugi/kredyty",
  },
];

export const awards: string[] = [
  "TOP 25 Otodom Polska",
  "Orły Nieruchomości GOLD ×4",
  "Złota Firma 2025",
  "Prestiżowa Marka 2026",
  "Orły Branży 2026",
];

// Lokalizacje do wyszukiwarki
export const locations: string[] = [
  "Głogów",
  "Polkowice",
  "Radwanice",
  "Przemków",
  "Sława",
  "Głogów — okolice",
];

export const propertyTypes: string[] = [
  "Mieszkanie",
  "Dom",
  "Działka",
  "Lokal",
  "Inwestycyjne",
];
