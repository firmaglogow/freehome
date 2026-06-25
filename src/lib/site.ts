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
  hours: "Pon–Pt 10:00–18:00 · Sob 10:00–14:00",
  social: {
    facebook: "https://facebook.com/firmaglogow",
    // instagram: "[DO UZUPEŁNIENIA]",
  },
  related: [
    { label: "grzegorzlukasik.com — marka osobista", href: "https://grzegorzlukasik.com" },
  ],
  // Autor strony — subtelny podpis w stopce.
  creator: {
    label: "FREE HOME Design Studio",
    href: "https://www.freehomedesign.pl/",
  },
  reviewsCount: 269,
} as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Oferty", href: "/oferty" },
  { label: "Usługi", href: "/uslugi" },
  { label: "O nas", href: "/o-nas" },
  { label: "Zespół", href: "/ludzie" },
  { label: "Opinie", href: "/opinie" },
  { label: "Blog", href: "/blog" },
  { label: "Praca", href: "/praca" },
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

// Biuro prowadzą Grzegorz i Daria Łukasik; w zespole także trzecia osoba.
// Bez hierarchii — każda osoba ma własną podstronę z opisem i ofertami.
export const people: Person[] = [
  {
    slug: "grzegorz-lukasik",
    name: "Grzegorz Łukasik",
    role: "Ekspert ds. sprzedaży nieruchomości",
    bio: "Nieruchomości to moja codzienność od lat — i nadal podchodzę do każdej transakcji tak, jakby była pierwsza. Prowadzę FREE HOME razem z Darią. Znam Głogów i okolice na wylot: realne ceny, dzielnice, to, co naprawdę przesądza o dobrej sprzedaży. U mnie nie ma sztampy i nacisku. Jest konkret, uczciwa rozmowa i pełne zaangażowanie — od pierwszego telefonu po klucze w dłoni.",
    phone: "537 264 666",
    email: "grzegorz.lukasik@freehome.com.pl",
    photo: "/zespol/grzegorz.jpg",
  },
  {
    slug: "daria-lukasik",
    name: "Daria Łukasik",
    role: "Ekspert ds. sprzedaży nieruchomości",
    bio: "Najbardziej empatyczna pośredniczka w Głogowie — tak mówią o mnie klienci, i biorę to sobie do serca. Za sobą mam setki transakcji i jedną zasadę: człowiek przed nieruchomością. Słucham, tłumaczę spokojnie, jestem obok na każdym etapie. Sprzedaż czy zakup domu to jedna z największych decyzji w życiu — zasługuje na kogoś, komu naprawdę zależy.",
    phone: "518 092 404",
    email: "dariaz.lukasik@freehome.com.pl",
    photo: "/zespol/daria.jpg",
  },
  {
    slug: "angelika-skorupinska",
    name: "Angelika Skorupińska",
    role: "Ekspert ds. sprzedaży nieruchomości",
    bio: "Do nieruchomości weszłam z bagażem, którego nie da się nauczyć w tej branży — z lat pracy z ludźmi w zupełnie innym świecie. I właśnie to okazało się największym atutem. Wiem, jak słuchać, jak budować relację i jak prowadzić klienta spokojnie przez decyzję, która potrafi onieśmielać. Świeże spojrzenie, mnóstwo energii i pełne zaangażowanie w każdą sprawę — tak zaczynam swój rozdział w FREE HOME.",
    phone: "733 687 666",
    email: "angelika.skorupinska@freehome.com.pl",
    photo: "/zespol/angelika.jpg",
  },
];

export type Service = {
  slug: string;
  title: string;
  desc: string;
  href: string;
  intro: string[];
  steps: string[];
  cta?: { label: string; href: string };
};

export const services: Service[] = [
  {
    slug: "sprzedaz",
    title: "Sprzedaż",
    desc: "Kompleksowa obsługa sprzedaży — wycena, marketing, bezpieczna transakcja.",
    href: "/uslugi/sprzedaz",
    intro: [
      "Sprzedaż nieruchomości to znacznie więcej niż ogłoszenie w internecie. To strategia, prezentacja i negocjacje, które realnie decydują o tym, ile dostaniesz i jak szybko. Zajmujemy się wszystkim — od rzetelnej wyceny, przez profesjonalne zdjęcia i marketing, po bezpieczne dopięcie transakcji u notariusza. Ty masz spokój, my mamy robotę pod kontrolą.",
      "Działamy lokalnie i znamy głogowski rynek od podszewki — wiemy, ile naprawdę warta jest Twoja nieruchomość i jak ją pokazać właściwym kupującym. Bez pustych obietnic. Konkret i efekt.",
    ],
    steps: [
      "Bezpłatna wycena i rozmowa o Twoich celach.",
      "Strategia sprzedaży — cena, marketing, grupa kupujących.",
      "Profesjonalne zdjęcia, ogłoszenia, prezentacje, negocjacje.",
      "Bezpieczna transakcja i finalizacja u notariusza.",
    ],
  },
  {
    slug: "zakup",
    title: "Zakup",
    desc: "Pomoc w znalezieniu i zakupie wymarzonej nieruchomości w Głogowie i okolicy.",
    href: "/uslugi/zakup",
    intro: [
      "Szukanie wymarzonej nieruchomości potrafi być męczące — dziesiątki ogłoszeń, telefony, oglądania, które do niczego nie prowadzą. My to skracamy. Poznajemy Twoje potrzeby i budżet, a potem szukamy konkretnie pod Ciebie — także wśród ofert, które nie trafiły jeszcze do internetu.",
      "Sprawdzamy stan prawny, doradzamy, negocjujemy cenę w Twoim imieniu. Kupujesz pewnie i bezpiecznie, bez stresu i bez przepłacania. Lokalna wiedza po Twojej stronie.",
    ],
    steps: [
      "Rozmowa o potrzebach, budżecie i okolicy.",
      "Selekcja ofert pod Ciebie — też tych spoza portali.",
      "Oglądania, weryfikacja stanu prawnego, negocjacje.",
      "Bezpieczny zakup i finalizacja u notariusza.",
    ],
  },
  {
    slug: "deweloperzy",
    title: "Deweloperzy",
    desc: "Obsługa inwestycji deweloperskich. Zobacz freehomeinwest.pl.",
    href: "/uslugi/deweloperzy",
    intro: [
      "Współpracujemy z deweloperami i inwestorami — kompleksowo obsługujemy sprzedaż inwestycji mieszkaniowych w Głogowie i okolicy. Marketing, prezentacja, kontakt z klientami i sprzedaż lokali to nasza działka.",
      "Prowadzimy też osobny serwis dedykowany inwestycjom: freehomeinwest.pl. Jeśli jesteś deweloperem i szukasz lokalnego partnera, który zna rynek i potrafi sprzedawać — odezwij się.",
    ],
    steps: [
      "Analiza inwestycji i grupy docelowej.",
      "Strategia sprzedaży i marketing.",
      "Obsługa klientów i prezentacje lokali.",
      "Sprzedaż i finalizacja kolejnych etapów.",
    ],
    cta: { label: "Zobacz freehomeinwest.pl", href: "https://freehomeinwest.pl" },
  },
  {
    slug: "kredyty",
    title: "Finansowanie",
    desc: "Kredyty i ubezpieczenia z naszym ekspertem (partner: Lendi).",
    href: "/uslugi/kredyty",
    intro: [
      "Kupno nieruchomości to często też kredyt — a dobry kredyt potrafi zaoszczędzić dziesiątki tysięcy złotych. Dlatego współpracujemy ze sprawdzonym ekspertem finansowym (partner: Lendi), który pomoże dobrać najlepsze finansowanie i przejść przez formalności.",
      "Jedna rozmowa, jeden zaufany kontakt — bez biegania po bankach na własną rękę. Doradztwo kredytowe i ubezpieczeniowe w jednym miejscu, u ludzi, którym ufamy.",
    ],
    steps: [
      "Rozmowa o Twoich planach i zdolności kredytowej.",
      "Kontakt z naszym ekspertem finansowym (Lendi).",
      "Dobór najlepszej oferty kredytu i ubezpieczenia.",
      "Wsparcie aż do uruchomienia kredytu.",
    ],
  },
];

export const awards: string[] = [
  "TOP 25 Otodom Polska",
  "Orły Nieruchomości GOLD ×4",
  "Złota Firma 2025",
  "Prestiżowa Marka 2026",
  "Orły Branży 2026",
];

export type Review = {
  name: string;
  text: string;
  source?: string;
};

// Prawdziwe opinie z wizytówki Google FREE HOME (5★).
// Przepisane z profilu Google; drobne literówki delikatnie poprawione na potrzeby publikacji.
export const reviews: Review[] = [
  {
    name: "Patrycja",
    text: "Bardzo dziękuję za pomoc przy sprzedaży mieszkania. Pan Grzegorz od początku do końca czuwał nad całą transakcją i zawsze można było liczyć na szybki kontakt oraz konkretne odpowiedzi. Profesjonalne biuro nieruchomości Głogów, godne polecenia.",
    source: "Google",
  },
  {
    name: "Arkadiusz Kazimierczak",
    text: "Polecam jak najbardziej współpracę z biurem Free Home, profesjonalna obsługa i ciągły aktywny kontakt od początku do końca. Dziękuję bardzo Pani Darii za pomoc w procesie zakupu mieszkania.",
    source: "Google",
  },
  {
    name: "Kuba Jawor",
    text: "Jestem bardzo zadowolony ze współpracy z FREE HOME biuro nieruchomości Głogów. Profesjonalna obsługa, indywidualne podejście i świetna organizacja formalności. Zdecydowanie polecam.",
    source: "Google",
  },
  {
    name: "Paweł W.",
    text: "Jestem bardzo zadowolony ze współpracy. Szybko znaleziono odpowiednie mieszkanie, a cały proces został dokładnie wyjaśniony. Fachowe doradztwo i miła atmosfera.",
    source: "Google",
  },
  {
    name: "Maciej Sielski",
    text: "Bardzo dziękuję za współpracę z Panem Grzegorzem. Sprzedaż mojego mieszkania przebiegła bardzo sprawnie — w niespełna 3 tygodnie był już klient na moje mieszkanie! Zdecydowanie polecam FREE HOME biuro nieruchomości Głogów.",
    source: "Google",
  },
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
