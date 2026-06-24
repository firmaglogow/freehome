import Image from "next/image";
import Container from "@/components/ui/Container";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Opcjonalna grafika tła hero (jak na stronie Praca). */
  image?: string;
}) {
  // Wariant ze zdjęciem w tle — dokładnie ten sam mechanizm co na stronie Praca.
  if (image) {
    return (
      <section className="relative isolate flex min-h-[44vh] items-end overflow-hidden border-b border-gold-500/10 pt-36 pb-16">
        {/* Tło — grafika sekcji, object-cover, wyśrodkowana, responsywna */}
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        {/* Overlay ciemnozielony — czytelność tekstu (jak na Pracy i stronie głównej) */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-950/85 via-forest-950/75 to-forest-950/95" />
        {/* Złota poświata — zielono-złoty klimat marki */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_30%,rgba(197,164,78,0.16),transparent_55%)]" />
        {/* Przyciemnienie u dołu — płynne przejście do kolejnej sekcji */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-forest-900" />
        <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
        <Container className="relative w-full">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-3 font-display text-4xl text-cream sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-lg text-cream/75">{subtitle}</p>
          )}
        </Container>
      </section>
    );
  }

  // Wariant domyślny — bez grafiki (pozostałe podstrony: regulamin, polityki itd.).
  return (
    <section className="border-b border-gold-500/10 bg-forest-900 pt-32 pb-14">
      <Container>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 font-display text-4xl text-cream sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-cream/70">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
