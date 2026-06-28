// Historia firmy FREE HOME — oś czasu 2016–2026. Zasila sekcję „Nasza historia" w /o-nas.
// Treść z marki osobistej Grzegorza (screeny „Moja Historia FREE HOME").
// Kolejność: od najstarszego do najnowszego (oś czasu prowadzi czytelnika w dół).

export type Milestone = {
  year: string;
  title: string;
  desc: string;
  /** Ostatni, „zwieńczający" kamień — wyróżniony wizualnie (złoty). */
  highlight?: boolean;
};

export const history: Milestone[] = [
  {
    year: "2016",
    title: "Fundamenty profesjonalizmu",
    desc:
      "Start w Home Broker. Intensywna nauka twardych zasad rynku, która ukształtowała profesjonalny warsztat i fundamenty skutecznej obsługi klienta.",
  },
  {
    year: "2018",
    title: "Lider i strategia",
    desc:
      "Objęcie stanowiska Dyrektora Oddziału. Zarządzanie zespołem agentów i zamiana indywidualnej sprzedaży w skuteczny model osiągania mierzalnych rezultatów.",
  },
  {
    year: "2020",
    title: "Innowacje w praktyce",
    desc:
      "Wprowadzenie nowoczesnych narzędzi sprzedaży zdalnej i nowych standardów obsługi online. Utrzymanie tempa sprzedaży nieruchomości klientów mimo globalnych wyzwań.",
  },
  {
    year: "2022",
    title: "Etyka i zespół marzeń",
    desc:
      "Uzyskanie licencji Pośrednika PPRN (etyka zawodowa). Dołączenie do zespołu Darii (obecnie żony) — stworzenie zgranego teamu dowożącego konkretne rezultaty.",
  },
  {
    year: "2024",
    title: "Ekspansja na region",
    desc:
      "Otwarcie nowego oddziału FREE HOME w Lubinie. Przeniesienie sprawdzonych standardów skuteczności na kolejny rynek regionalny.",
  },
  {
    year: "2025",
    title: "Edukacja i autorytet",
    desc:
      "Premiera eBooka „Agent 2.0” oraz start FREE HOME Academy. Podsumowanie lat doświadczeń i wyznaczanie nowych trendów w nowoczesnej obsłudze klienta.",
  },
  {
    year: "2026",
    title: "Dekada skuteczności",
    desc:
      "Jubileusz 10 lat na rynku. Autor największej akcji marketingowej w regionie wśród lokalnych firm. Pozycja lidera innowacji, który zamiast projektować reklamy — po prostu sprzedaje mieszkania.",
    highlight: true,
  },
];
