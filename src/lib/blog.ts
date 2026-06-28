// DANE TYMCZASOWE bloga. Docelowo: pliki MDX/JSON lub lekki CMS (Etap 3).
export type PostBlock = {
  /** Nagłówek sekcji — renderowany jako <h2> (ważne pod SEO). */
  heading?: string;
  /** Pogrubione wprowadzenie na początku akapitu. */
  lead?: string;
  /** Treść akapitu. */
  text?: string;
  /** Lista punktowana. */
  list?: string[];
};

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
      "Sprawdzone kroki, dzięki którym sprzedasz mieszkanie w Głogowie szybciej i drożej — bez wielkich nakładów. Od porządku i drobnych napraw, przez home staging, po profesjonalne zdjęcia i strategię ceny.",
    date: "2026-06-10",
    category: "Porady",
    image: "/blog/glogow1.webp",
    body: [
      {
        text: "Pierwsze wrażenie robi się tylko raz. Kupujący decyduje w kilka sekund od wejścia — często jeszcze zanim przekroczy próg, bo ocenia już zdjęcia w ogłoszeniu. Dobre przygotowanie mieszkania do sprzedaży potrafi realnie podnieść cenę i skrócić czas oczekiwania na kupca. W Głogowie, gdzie rynek jest lokalny i kupujący dobrze się orientują w cenach, ma to jeszcze większe znaczenie.",
      },
      {
        text: "Poniżej zebraliśmy konkretne kroki, które stosujemy z naszymi klientami, sprzedając mieszkania i domy w Głogowie i okolicach. Większość z nich nic nie kosztuje albo kosztuje naprawdę niewiele — a różnica w odbiorze oferty bywa ogromna.",
      },
      {
        heading: "Dlaczego przygotowanie mieszkania w ogóle się opłaca",
        text: "Nieruchomość dobrze przygotowana do sprzedaży przyciąga więcej zainteresowanych, generuje więcej zapytań i częściej kończy się szybką transakcją w cenie bliskiej oczekiwanej. Mieszkanie „takie jak jest”, zagracone i ciemne na zdjęciach, najczęściej długo wisi w ogłoszeniach i kończy się obniżkami ceny. Inwestycja kilku godzin pracy i kilkuset złotych zwraca się wielokrotnie.",
      },
      {
        heading: "Krok 1: porządek, przestrzeń i depersonalizacja",
        text: "Im mniej rzeczy, tym większe i jaśniejsze wydaje się mieszkanie. Schowaj nadmiar przedmiotów, oczyść blaty i parapety, zrób miejsce w przedpokoju. Zdejmij ze ścian prywatne zdjęcia i pamiątki — kupujący ma sobie wyobrazić własne życie w tym wnętrzu, a nie oglądać Twoje. Ta jedna zmiana potrafi całkowicie odmienić odbiór mieszkania.",
      },
      {
        heading: "Krok 2: drobne naprawy, które robią różnicę",
        text: "Drobiazgi, które dla Ciebie są niewidoczne, dla oglądającego stają się sygnałem „tu trzeba będzie dopłacić”. Przed wystawieniem oferty warto zająć się przede wszystkim:",
      },
      {
        list: [
          "cieknący kran, kapiąca bateria i spuchnięte silikony w łazience,",
          "odklejone listwy przypodłogowe i skrzypiące drzwi,",
          "przepalone żarówki — wszystkie punkty świetlne mają działać,",
          "drobne dziury po kołkach, pęknięcia i odpryski farby,",
          "klamki, gniazdka i włączniki, które się ruszają lub są wyeksploatowane.",
        ],
      },
      {
        text: "To koszt rzędu kilkudziesięciu–kilkuset złotych, a usuwa wrażenie zaniedbania, które podświadomie obniża wartość w oczach kupującego.",
      },
      {
        heading: "Krok 3: światło, czystość i neutralny zapach",
        text: "Umyte okna, jasne pomieszczenia i świeże powietrze kosztują niewiele, a robią ogromną różnicę — zarówno na zdjęciach, jak i podczas oglądania. Odsłoń zasłony, wpuść maksimum światła dziennego, a wieczorem zadbaj o ciepłe oświetlenie. Zadbaj o neutralny zapach: zero dymu, zwierząt czy intensywnych potraw tuż przed wizytą. Świeżo zaparzona kawa lub delikatny zapach cytrusów działają zaskakująco dobrze.",
      },
      {
        heading: "Krok 4: home staging, czyli drobne wykończenie",
        text: "Nie chodzi o remont, tylko o dopięcie wnętrza na ostatni guzik: świeże ręczniki w łazience, poduszki na kanapie, kwiaty na stole, zwinięty pled. Neutralna, spójna kolorystyka sprawia, że wnętrze wygląda zadbane i „gotowe do wprowadzenia”. Mieszkania gotowe do zamieszkania sprzedają się w Głogowie wyraźnie szybciej niż te wymagające pracy.",
      },
      {
        heading: "Krok 5: profesjonalne zdjęcia i dobry opis oferty",
        text: "To zdjęcia sprzedają mieszkanie w internecie — od nich zależy, czy ktoś w ogóle kliknie w Twoją ofertę. Jasne, ostre, profesjonalne fotografie przyciągają kilka razy więcej zainteresowanych niż zdjęcia z telefonu zrobione pod światło. Do tego konkretny, rzetelny opis: metraż, piętro, układ, ogrzewanie, koszty utrzymania, co w okolicy. Tym akurat zajmujemy się my — łącznie z sesją zdjęciową i przygotowaniem oferty.",
      },
      {
        heading: "Ile to zajmuje i od czego zacząć",
        text: "Przygotowanie typowego mieszkania w Głogowie to zwykle jeden–dwa weekendy pracy. Najlepiej zacząć od bezpłatnej konsultacji i wyceny — wtedy wiesz, na jaką cenę realnie możesz liczyć i co konkretnie warto poprawić, zanim wystawisz ofertę.",
      },
      {
        text: "Szczerze? Większość mieszkań da się sprzedać szybciej i drożej, niż myślą właściciele — wystarczy dobre przygotowanie i właściwa strategia. Jeśli planujesz sprzedaż w Głogowie lub okolicy, zadzwoń do FREE HOME. Doradzimy, co zrobić, zanim wystawisz ofertę, i przeprowadzimy Cię przez cały proces — od zdjęć po podpisanie aktu.",
      },
    ],
    note: DISCLAIMER,
  },
  {
    slug: "ceny-nieruchomosci-glogow-2026",
    title: "Ceny nieruchomości w Głogowie 2026 — co warto wiedzieć",
    excerpt:
      "Przegląd lokalnego rynku nieruchomości w Głogowie w 2026 roku: co realnie wpływa na ceny mieszkań i domów, czym różnią się ceny ofertowe od transakcyjnych i jak sprawdzić, ile naprawdę warta jest Twoja nieruchomość.",
    date: "2026-05-22",
    category: "Rynek",
    image: "/blog/glogow2.webp",
    body: [
      {
        text: "Rynek nieruchomości w Głogowie rządzi się swoimi prawami i potrafi sporo różnić się od tego, co pokazują ogólnopolskie statystyki. Lokalny rynek to lokalne ceny — a te zależą od dzielnicy, stanu nieruchomości, metrażu i tego, co aktualnie dzieje się z popytem oraz dostępnością kredytów. W tym wpisie tłumaczymy, na co patrzeć, jeśli planujesz w 2026 roku sprzedaż lub zakup mieszkania albo domu w Głogowie i powiecie głogowskim.",
      },
      {
        heading: "Lokalny rynek rządzi się swoimi prawami",
        text: "Średnie ceny za metr kwadratowy z dużych portali to punkt odniesienia, ale nie wyrok. W mieście wielkości Głogowa o cenie konkretnego mieszkania decydują czynniki, których żadna ogólna średnia nie uchwyci: konkretna ulica, sąsiedztwo, widok z okna czy reputacja bloku. Dlatego dwie podobne oferty potrafią różnić się ceną o kilkadziesiąt tysięcy złotych.",
      },
      {
        heading: "Co realnie wpływa na ceny mieszkań w Głogowie",
        text: "Wyceniając nieruchomość, bierzemy pod uwagę przede wszystkim:",
      },
      {
        list: [
          "lokalizację i dzielnicę — bliskość szkół, sklepów, komunikacji i terenów zielonych,",
          "stan i standard — do wprowadzenia od ręki czy do remontu,",
          "metraż i układ — funkcjonalny rozkład jest wart więcej niż „ślepa” kuchnia,",
          "piętro i windę — szczególnie istotne dla rodzin i osób starszych,",
          "rok budowy i technologię — od wielkiej płyty po nowe budownictwo,",
          "koszty utrzymania — czynsz, ogrzewanie i stan części wspólnych.",
        ],
      },
      {
        heading: "Ceny ofertowe a ceny transakcyjne — najważniejsza różnica",
        text: "To kluczowa sprawa, o której większość sprzedających zapomina. Cena z ogłoszenia to cena ofertowa — czyli życzenie sprzedającego. Cena transakcyjna to kwota, za jaką nieruchomość faktycznie zmieniła właściciela. Te dwie liczby potrafią dzielić się o kilkanaście procent. Wycenianie własnego mieszkania na podstawie ogłoszeń z portali to najczęstszy błąd, który kończy się miesiącami bez kupca.",
      },
      {
        text: "My pracujemy na danych transakcyjnych — wiemy, za ile realnie sprzedają się nieruchomości w poszczególnych częściach Głogowa, a nie tylko za ile są wystawiane. Dzięki temu cena ofertowa od początku jest ustawiona trafnie.",
      },
      {
        heading: "Mieszkania do remontu vs gotowe do zamieszkania",
        text: "Trend ostatnich lat jest wyraźny: kupujący coraz częściej wolą zapłacić więcej za mieszkanie gotowe, niż brać na siebie kłopot i niepewny koszt remontu. Lokale „pod klucz” sprzedają się szybciej i osiągają wyższą cenę za metr. Jeśli Twoje mieszkanie wymaga odświeżenia, czasem drobna inwestycja przed sprzedażą zwraca się z nawiązką.",
      },
      {
        heading: "Kredyty hipoteczne a popyt",
        text: "Dostępność i koszt kredytów hipotecznych to jeden z najsilniejszych czynników na rynku. Gdy zdolność kredytowa rośnie, na rynek wchodzi więcej kupujących i ceny zyskują wsparcie; gdy raty drożeją, popyt słabnie. To sytuacja, która potrafi zmienić się z miesiąca na miesiąc — dlatego moment sprzedaży albo zakupu ma znaczenie.",
      },
      {
        heading: "Czy to dobry moment na sprzedaż lub zakup?",
        text: "Nie ma jednej odpowiedzi dla wszystkich — wszystko zależy od Twojej sytuacji i konkretnej nieruchomości. Dlatego zamiast zgadywać, warto oprzeć decyzję na twardych danych z lokalnego rynku.",
      },
      {
        text: "Najlepszym źródłem wiedzy o realnych cenach nie są portale z ogłoszeniami, tylko ceny transakcyjne. My te liczby znamy. Chcesz wiedzieć, ile naprawdę warta jest Twoja nieruchomość w Głogowie? Umów się z FREE HOME na bezpłatną, rzetelną wycenę — bez zobowiązań.",
      },
    ],
    note: DISCLAIMER,
  },
  {
    slug: "kredyt-hipoteczny-od-czego-zaczac",
    title: "Kredyt hipoteczny — od czego zacząć? Poradnik dla kupujących",
    excerpt:
      "Praktyczny przewodnik po kredycie hipotecznym dla osób kupujących pierwsze mieszkanie w Głogowie i okolicach — bez bankowego żargonu. Zdolność kredytowa, wkład własny, porównanie ofert, dokumenty i najczęstsze błędy.",
    date: "2026-05-05",
    category: "Finansowanie",
    image: "/blog/kredyt-hipoteczny-od-czego-zaczac.webp",
    body: [
      {
        text: "Kredyt hipoteczny brzmi groźnie, dopóki nie rozłoży się go na proste kroki. Jeśli kupujesz pierwsze mieszkanie w Głogowie lub okolicy, ten przewodnik przeprowadzi Cię przez cały proces po ludzku — bez żargonu i niepotrzebnego stresu. Zobacz, od czego zacząć i czego unikać.",
      },
      {
        heading: "Krok 1: sprawdź swoją zdolność kredytową",
        text: "Zanim zakochasz się w konkretnym mieszkaniu, dowiedz się, na ile realnie Cię stać. Zdolność kredytowa to maksymalna kwota, jaką bank jest gotów Ci pożyczyć — zależy od dochodów, formy zatrudnienia, liczby osób na utrzymaniu i Twoich zobowiązań. Sprawdzenie jej na samym początku oszczędza rozczarowań i ustawia cały proces na właściwych torach.",
      },
      {
        heading: "Krok 2: przygotuj wkład własny",
        text: "Banki zwykle wymagają wkładu własnego — części wartości nieruchomości pokrytej z własnej kieszeni, najczęściej w okolicach 10–20%. Warto wiedzieć, ile musisz mieć, zanim zaczniesz szukać, a także uwzględnić koszty dodatkowe: taksę notarialną, podatek, prowizje i ewentualne wykończenie. To te „ukryte” wydatki najczęściej zaskakują kupujących.",
      },
      {
        heading: "Krok 3: porównaj oferty banków",
        text: "Różnice między bankami potrafią oznaczać dziesiątki tysięcy złotych w skali całego kredytu. Porównując oferty, zwróć uwagę na:",
      },
      {
        list: [
          "oprocentowanie (stałe czy zmienne) i jego wysokość,",
          "RRSO, czyli realny, całkowity koszt kredytu,",
          "prowizję za udzielenie i koszty okołokredytowe,",
          "wymagane ubezpieczenia i produkty dodatkowe,",
          "elastyczność: możliwość wcześniejszej spłaty bez dodatkowych opłat.",
        ],
      },
      {
        text: "Samodzielne przejście przez kilkanaście ofert bywa męczące. Dobry doradca kredytowy zna aktualne warunki banków i często znajdzie korzystniejsze rozwiązanie szybciej, niż zrobisz to na własną rękę.",
      },
      {
        heading: "Krok 4: dokumenty i decyzja kredytowa",
        text: "Po wyborze oferty kompletujesz dokumenty: zaświadczenia o dochodach, dane nieruchomości i wniosek kredytowy. Bank analizuje wniosek i wydaje decyzję, a następnie podpisujecie umowę i uruchamiacie środki. Z dobrym wsparciem ten etap jest dużo mniej stresujący, a ryzyko, że coś „utknie”, znacznie mniejsze.",
      },
      {
        heading: "Najczęstsze błędy kupujących",
        text: "Z naszego doświadczenia na rynku w Głogowie najwięcej kłopotów biorą się z kilku powtarzalnych pomyłek:",
      },
      {
        list: [
          "szukanie mieszkania przed sprawdzeniem zdolności kredytowej,",
          "branie nowych zobowiązań (np. raty na sprzęt) tuż przed wnioskiem,",
          "pominięcie kosztów dodatkowych przy planowaniu budżetu,",
          "wybór oferty tylko po oprocentowaniu, bez patrzenia na RRSO i prowizje.",
        ],
      },
      {
        heading: "Doradca kredytowy czy na własną rękę?",
        text: "Jeśli masz czas, wiedzę i cierpliwość, możesz przejść proces samodzielnie. Większość kupujących woli jednak oprzeć się na ekspercie, który zna rynek i prowadzi za rękę od pierwszego kroku po klucze — zwłaszcza przy pierwszym kredycie.",
      },
      {
        text: "Szczerze? Najczęstszy błąd to szukanie mieszkania przed sprawdzeniem zdolności. Odwróć kolejność. A jeśli chcesz, połączymy Cię z naszym zaufanym ekspertem finansowym (Lendi) — pomoże dobrać kredyt i przejść formalności od pierwszego kroku po odbiór kluczy. Skontaktuj się z FREE HOME, a wskażemy Ci właściwą drogę.",
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
