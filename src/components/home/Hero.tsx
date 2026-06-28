import Container from "@/components/ui/Container";
import SearchBar from "@/components/home/SearchBar";
import { site } from "@/lib/site";

// Prefiks ścieżek do zasobów (taki sam jak loader obrazów / basePath).
// Element <picture> nie przechodzi przez loader next/image, więc dokładamy go ręcznie.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/freehome";

export default function Hero({ offersCount }: { offersCount: number }) {
  return (
    <section className="relative isolate overflow-hidden">
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

        {/* Wyszukiwarka — serce hero. Przesunięta niżej, węższa o ~20%
            (max-w-4xl 56rem → 45rem). Wysokość i układ mobilny: w SearchBar. */}
        <div className="mt-16 max-w-[45rem] sm:mt-24">
          <SearchBar offersCount={offersCount} />
        </div>
      </Container>
    </section>
  );
}
