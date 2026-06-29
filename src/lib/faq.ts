// Najczęściej zadawane pytania (FAQ) — jedno źródło prawdy dla podstrony /faq.
// Z tej tablicy budujemy jednocześnie widoczny akordeon oraz dane strukturalne
// FAQPage (JSON-LD) pod rich snippets w Google. Treść celowo nasycona realnymi
// pytaniami klientów z Głogowa (SEO + odpowiedź na realne wątpliwości).
export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  {
    q: "Ile kosztuje współpraca z biurem FREE HOME?",
    a: "Nasze wynagrodzenie to prowizja ustalana indywidualnie i zawsze jasno zapisana w umowie — bez ukrytych opłat. Prowizję pobieramy dopiero po skutecznej transakcji, czyli po podpisaniu aktu notarialnego.",
  },
  {
    q: "Czy jako kupujący płacę biuru?",
    a: "Tak — przy transakcji wynagrodzenie biura obejmuje również stronę kupującą. Wszystkie zasady ustalamy jasno na samym początku i zapisujemy w umowie, więc z góry wiesz, za co i ile płacisz — bez ukrytych kosztów.",
  },
  {
    q: "Jak ustalić realną cenę mojej nieruchomości?",
    a: "Cenę opieramy na realnych danych — w tym na cenach transakcyjnych z aktów notarialnych (RCN/GUGiK), które pokazujemy też w bezpłatnym narzędziu „Sprawdź ceny w okolicy”. Bierzemy pod uwagę lokalizację, stan, metraż i aktualną sytuację na rynku w Głogowie, żeby nieruchomość sprzedała się w realnym czasie i za dobrą cenę.",
  },
  {
    q: "Ile trwa sprzedaż mieszkania w Głogowie?",
    a: "To zależy przede wszystkim od ceny, stanu i lokalizacji. Dobrze wycenione i profesjonalnie przygotowane mieszkanie zwykle znajduje kupca szybciej — zawyżona cena to najczęstszy powód, dla którego oferta „stoi”. Na pierwszym spotkaniu realnie oceniamy, czego spodziewać się w Twoim przypadku.",
  },
  {
    q: "Jakie dokumenty są potrzebne do sprzedaży mieszkania lub domu?",
    a: "Najczęściej: akt własności (np. akt notarialny zakupu lub postanowienie o spadku), numer księgi wieczystej, zaświadczenie o braku zaległości i o osobach zameldowanych, a przy mieszkaniach spółdzielczych — odpowiednie zaświadczenia ze spółdzielni. Nie martw się tym — pomożemy skompletować komplet dokumentów krok po kroku.",
  },
  {
    q: "Co daje umowa na wyłączność?",
    a: "Oznacza, że Twoją nieruchomością zajmuje się jedno biuro, które w pełni za nią odpowiada — inwestuje w zdjęcia, promocję i aktywne szukanie kupca. W praktyce daje to jedną spójną cenę i przekaz w sieci, większe zaangażowanie i często szybszą sprzedaż niż wtedy, gdy ta sama oferta krąży w kilku miejscach w różnych cenach.",
  },
  {
    q: "Jakie są dodatkowe koszty przy zakupie nieruchomości?",
    a: "Poza ceną zakupu kupujący ponosi zwykle: podatek PCC 2% (rynek wtórny — przy zakupie od dewelopera PCC nie występuje, a przy zakupie pierwszego mieszkania na rynku wtórnym może przysługiwać zwolnienie), taksę notarialną, opłaty sądowe za wpis do księgi wieczystej oraz ewentualne koszty kredytu. Przed transakcją podpowiemy, z czym konkretnie trzeba się liczyć.",
  },
  {
    q: "Czy pomagacie w uzyskaniu kredytu hipotecznego?",
    a: "Tak — orientacyjną ratę policzysz na naszej stronie w bezpłatnym kalkulatorze kredytowym, a dodatkowo współpracujemy ze stałym, sprawdzonym doradcą kredytowym, który pomoże dobrać i uzyskać najlepszy kredyt na Twoją sytuację.",
  },
  {
    q: "Jaki obszar obsługujecie?",
    a: "Działamy przede wszystkim w Głogowie i okolicy, ale zdarzało nam się prowadzić transakcje nawet ok. 200 km od Głogowa — wszystko zależy od sytuacji i potrzeb klienta. Najlepiej po prostu zadzwoń i zapytaj, a sprawdzimy, czy możemy pomóc.",
  },
  {
    q: "Dlaczego warto wybrać lokalne biuro, a nie tylko portal ogłoszeniowy?",
    a: "Portal pokaże ogłoszenie, ale nie sprawdzi dokumentów, nie wynegocjuje ceny i nie przeprowadzi Cię przez transakcję. My znamy głogowski rynek od podszewki, mamy ponad 270 opinii z oceną 5,0 i jesteśmy przy Tobie na każdym etapie — od wyceny po akt notarialny.",
  },
];
