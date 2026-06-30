import Container from "@/components/ui/Container";
import SearchBar from "@/components/home/SearchBar";
import { site } from "@/lib/site";

// Prefiks ścieżek do zasobów (taki sam jak loader obrazów / basePath).
// Element <picture> nie przechodzi przez loader next/image, więc dokładamy go ręcznie.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/freehome";

export default function Hero({ offersCount }: { offersCount: number }) {
  return (
    <section className="relative isolate overflow-hidden bg-[radial-gradient(120%_90%_at_85%_12%,rgba(197,164,78,0.14),transparent_55%),linear-gradient(160deg,#0e2b1a_0%,#0a2113_60%)]">
      {/* Tło bazowe sekcji (markowy gradient zieleń + delikatne złoto w prawym
          górnym rogu) widoczne tylko przez ułamek sekundy, zanim doczyta się
          panorama LCP — żeby ten moment wyglądał celowo, a nie jak czarne pole.
          Siedzi pod warstwami -z-10, więc po załadowaniu zdjęcie je przykrywa. */}
      {/* Tło hero — panorama Głogowa (ruiny kolegiaty). Art direction: pionowy
          kadr na mobile, szeroki 21:9 na desktopie. Pobiera się tylko jeden plik
          (decyzję podejmuje przeglądarka wg <source media>). LCP strony głównej. */}
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet={`${BASE_PATH}/hero/glogow-mobile.webp`}
        />
        <img
          src={`${BASE_PATH}/hero/glogow.webp`}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      </picture>
      {/* Overlay zielono-złoty: ciemna zieleń od lewej/dołu (czytelność tekstu
          i wyszukiwarki), spokojniejsze prawe/górne pole (widać panoramę),
          delikatna złota poświata w prawym górnym rogu. */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(7,26,14,0.90)_0%,rgba(7,26,14,0.62)_38%,rgba(10,33,19,0.34)_62%,rgba(13,38,24,0.50)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/85 via-forest-950/10 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(115%_85%_at_88%_12%,rgba(197,164,78,0.18),transparent_55%)]" />

      <Container className="flex min-h-[92vh] flex-col justify-center py-28">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
            {site.fullName.split(" ")[0]} {site.name.split(" ")[1] ?? ""}
            <span className="block text-gold-400">{site.tagline}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cream/80">{site.subtitle}</p>
        </div>

        {/* Wyszukiwarka — serce hero. Węższa o ~20% (max-w-4xl 56rem → 45rem),
            podniesiona delikatnie bliżej nagłówka. Wysokość i układ mobilny: w SearchBar. */}
        <div className="mt-10 max-w-[45rem] sm:mt-16">
          <SearchBar offersCount={offersCount} />
        </div>

        {/* Pasek dowodów pod wyszukiwarką — twarde liczby już na pierwszym ekranie
            (opinie, lata na rynku, transakcje). Wg audytu copy: najmocniejsza
            pojedyncza dźwignia — przenosi atuty „nad linię zgięcia". */}
        <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-8 sm:gap-x-8">
          <div className="flex items-baseline gap-1.5">
            <dt className="font-display text-2xl font-semibold text-gold-400 sm:text-3xl">
              {site.reviewsCount}+
            </dt>
            <dd className="text-sm text-cream/75">opinii 5,0★ w Google</dd>
          </div>
          <span aria-hidden className="hidden h-4 w-px bg-cream/25 sm:block" />
          <div className="flex items-baseline gap-1.5">
            <dt className="font-display text-2xl font-semibold text-gold-400 sm:text-3xl">
              10 lat
            </dt>
            <dd className="text-sm text-cream/75">na rynku</dd>
          </div>
          <span aria-hidden className="hidden h-4 w-px bg-cream/25 sm:block" />
          <div className="flex items-baseline gap-1.5">
            <dt className="font-display text-2xl font-semibold text-gold-400 sm:text-3xl">
              300+
            </dt>
            <dd className="text-sm text-cream/75">transakcji</dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
