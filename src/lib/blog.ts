// DANE TYMCZASOWE bloga. Docelowo: pliki MDX/JSON lub lekki CMS (Etap 3).
export type PostBlock = { lead?: string; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  category: string;
  image: string;
  body: PostBlock[];
  note?: string;
};

const DISCLAIMER =
  "Artykuł ma charakter informacyjny i nie stanowi porady inwestycyjnej ani finansowej.";

export const posts: Post[] = [
  {
    slug: "jak-przygotowac-mieszkanie-do-sprzedazy",
    title: "Jak przygotować mieszkanie do sprzedaży w Głogowie",
    excerpt:
      "Kilka sprawdzonych kroków, dzięki którym sprzedasz szybciej i drożej — bez wielkich nakładów.",
    date: "2026-06-10",
    category: "Porady",
    image: "/oferty/oferta-5.webp",
    body: [
      {
        text: "Pierwsze wrażenie robi się raz. Kupujący decyduje w kilka sekund od wejścia — dlatego przygotowanie mieszkania do sprzedaży potrafi realnie podnieść cenę i skrócić czas oczekiwania na kupca.",
      },
      {
        lead: "Po pierwsze: porządek i przestrzeń.",
        text: "Im mniej rzeczy, tym większe wydaje się mieszkanie. Schowaj nadmiar przedmiotów, oczyść blaty, zrób miejsce. Kupujący ma sobie wyobrazić swoje życie w tym wnętrzu — nie oglądać Twoje.",
      },
      {
        lead: "Po drugie: drobne naprawy.",
        text: "Cieknący kran, odklejona listwa, przepalona żarówka — to drobiazgi, które podświadomie obniżają wartość w oczach oglądającego. Napraw je, zanim wystawisz ofertę.",
      },
      {
        lead: "Po trzecie: światło i czystość.",
        text: "Umyte okna, jasne pomieszczenia, neutralny zapach. To kosztuje niewiele, a robi ogromną różnicę na zdjęciach i podczas oglądania.",
      },
      {
        lead: "Po czwarte: zdjęcia.",
        text: "To one sprzedają mieszkanie w internecie. Dobre, jasne, profesjonalne fotografie przyciągają kilka razy więcej zainteresowanych. Tym akurat zajmujemy się my.",
      },
      {
        text: "Szczerze? Większość mieszkań da się sprzedać szybciej i drożej, niż myślą właściciele — wystarczy dobre przygotowanie i właściwa strategia. Jeśli planujesz sprzedaż w Głogowie, zadzwoń. Doradzimy, co zrobić, zanim wystawisz ofertę.",
      },
    ],
    note: DISCLAIMER,
  },
  {
    slug: "ceny-nieruchomosci-glogow-2026",
    title: "Ceny nieruchomości w Głogowie — co warto wiedzieć w 2026",
    excerpt:
      "Krótki przegląd lokalnego rynku i tego, co realnie wpływa dziś na ceny mieszkań i domów.",
    date: "2026-05-22",
    category: "Rynek",
    image: "/oferty/oferta-2.webp",
    body: [
      {
        text: "Rynek nieruchomości w Głogowie rządzi się swoimi prawami — i różni się od tego, co pokazują ogólnopolskie statystyki. Lokalny rynek to lokalne ceny, a te zależą od dzielnicy, stanu nieruchomości i tego, co aktualnie dzieje się z popytem.",
      },
      {
        lead: "Lokalizacja wciąż decyduje.",
        text: "Te same metry w różnych częściach Głogowa potrafią różnić się ceną znacząco. Bliskość szkół, komunikacji, terenów zielonych — to wszystko ma realne przełożenie na wartość.",
      },
      {
        lead: "Stan i standard.",
        text: "Mieszkania do wprowadzenia od ręki sprzedają się szybciej i drożej niż te do remontu. Kupujący coraz częściej wolą zapłacić więcej, niż brać na siebie kłopot remontu.",
      },
      {
        lead: "Kredyty i zdolność.",
        text: "Dostępność i koszt kredytów hipotecznych bezpośrednio wpływają na to, ilu kupujących jest na rynku. To jeden z najważniejszych czynników, który potrafi zmienić sytuację z miesiąca na miesiąc.",
      },
      {
        text: "A wiesz co? Najlepszym źródłem wiedzy o realnych cenach nie są portale z ogłoszeniami, tylko ceny transakcyjne — czyli za ile faktycznie sprzedają się nieruchomości, a nie za ile są wystawiane. My te liczby znamy. Chcesz wiedzieć, ile naprawdę warta jest Twoja nieruchomość? Zrobimy bezpłatną wycenę.",
      },
    ],
    note: DISCLAIMER,
  },
  {
    slug: "kredyt-hipoteczny-od-czego-zaczac",
    title: "Kredyt hipoteczny — od czego zacząć?",
    excerpt:
      "Praktyczny przewodnik dla kupujących pierwsze mieszkanie — bez bankowego żargonu.",
    date: "2026-05-05",
    category: "Finansowanie",
    image: "/oferty/oferta-3.webp",
    body: [
      {
        text: "Kredyt hipoteczny brzmi groźnie, dopóki nie rozłoży się go na proste kroki. Jeśli kupujesz pierwsze mieszkanie, oto od czego zacząć — po ludzku, bez żargonu.",
      },
      {
        lead: "Krok 1: sprawdź zdolność kredytową.",
        text: "Zanim zakochasz się w konkretnym mieszkaniu, dowiedz się, na ile realnie Cię stać. To oszczędza rozczarowań i ustawia cały proces.",
      },
      {
        lead: "Krok 2: zbierz wkład własny pod uwagę.",
        text: "Banki zwykle wymagają części wartości nieruchomości z własnej kieszeni. Warto wiedzieć, ile musisz mieć, zanim ruszysz.",
      },
      {
        lead: "Krok 3: porównaj oferty — albo daj to ekspertowi.",
        text: "Różnice między bankami potrafią oznaczać dziesiątki tysięcy złotych w skali kredytu. Dobry doradca przejdzie z Tobą przez oferty i formalności, często szybciej i taniej niż na własną rękę.",
      },
      {
        lead: "Krok 4: dokumenty i decyzja.",
        text: "Po skompletowaniu dokumentów bank wydaje decyzję. Z dobrym wsparciem ten etap jest dużo mniej stresujący.",
      },
      {
        text: "Szczerze? Najczęstszy błąd to szukanie mieszkania przed sprawdzeniem zdolności. Odwróć kolejność. A jeśli chcesz, połączymy Cię z naszym zaufanym ekspertem finansowym (Lendi) — pomoże od pierwszego kroku po klucze.",
      },
    ],
    note: DISCLAIMER,
  },
];

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
