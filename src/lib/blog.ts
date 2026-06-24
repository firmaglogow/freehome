// DANE TYMCZASOWE bloga. Docelowo: pliki MDX/JSON lub lekki CMS (Etap 3).
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  category: string;
  image: string;
};

export const posts: Post[] = [
  {
    slug: "jak-przygotowac-mieszkanie-do-sprzedazy",
    title: "Jak przygotować mieszkanie do sprzedaży w Głogowie",
    excerpt:
      "[DO UZUPEŁNIENIA] Kilka sprawdzonych kroków, dzięki którym sprzedasz szybciej i drożej.",
    date: "2026-06-10",
    category: "Porady",
    image: "/oferty/oferta-5.webp",
  },
  {
    slug: "ceny-nieruchomosci-glogow-2026",
    title: "Ceny nieruchomości w Głogowie — co warto wiedzieć w 2026",
    excerpt:
      "[DO UZUPEŁNIENIA] Krótki przegląd lokalnego rynku i trendów cenowych.",
    date: "2026-05-22",
    category: "Rynek",
    image: "/oferty/oferta-2.webp",
  },
  {
    slug: "kredyt-hipoteczny-od-czego-zaczac",
    title: "Kredyt hipoteczny — od czego zacząć?",
    excerpt:
      "[DO UZUPEŁNIENIA] Praktyczny przewodnik dla kupujących pierwsze mieszkanie.",
    date: "2026-05-05",
    category: "Finansowanie",
    image: "/oferty/oferta-3.webp",
  },
];

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
