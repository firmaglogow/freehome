import Image from "next/image";
import Container from "@/components/ui/Container";
import SearchBar from "@/components/home/SearchBar";
import { site } from "@/lib/site";

export default function Hero({ offersCount }: { offersCount: number }) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Tło hero (WebP, priorytet — element LCP strony głównej). */}
      <Image
        src="/hero/hero-dom.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Overlay ciemnozielony */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-950/85 via-forest-950/75 to-forest-950/95" />

      <Container className="flex min-h-[92vh] flex-col justify-center py-28">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
            {site.fullName.split(" ")[0]} {site.name.split(" ")[1] ?? ""}
            <span className="block text-gold-400">{site.tagline}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cream/80">{site.subtitle}</p>
        </div>

        {/* Wyszukiwarka — serce hero */}
        <div className="mt-9 max-w-4xl">
          <SearchBar offersCount={offersCount} />
        </div>

        {/* Pasek zaufania */}
        <p className="mt-6 text-sm text-cream/70">
          <span className="font-semibold text-gold-400">
            {site.reviewsCount}+ opinii
          </span>{" "}
          ★★★★★ · TOP 25 Otodom · Orły Nieruchomości GOLD ×4
        </p>
      </Container>
    </section>
  );
}
