import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { awards, site } from "@/lib/site";

// [DO UZUPEŁNIENIA] — treści opinii lub osadzenie widgetu Google Reviews.
const reviews = [
  {
    name: "Klient FREE HOME",
    text: "Profesjonalna obsługa od początku do końca. Sprzedaż mieszkania przebiegła sprawnie i bez stresu. Polecam!",
  },
  {
    name: "Klientka FREE HOME",
    text: "Pełne zaangażowanie i kontakt na każdym etapie. Czuło się, że naprawdę zależy im na efekcie.",
  },
  {
    name: "Klient FREE HOME",
    text: "Lokalna wiedza i uczciwe podejście. Najlepsze biuro w Głogowie — bez dwóch zdań.",
  },
];

function Stars() {
  return (
    <span className="text-gold-400" aria-label="5 na 5 gwiazdek">
      ★★★★★
    </span>
  );
}

export default function SocialProof() {
  return (
    <section className="bg-forest-950 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Zaufanie"
          title={`${site.reviewsCount}+ opinii 5 gwiazdek w Google`}
          subtitle="Realni klienci, realne historie. Dołącz do grona zadowolonych."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-2xl border border-gold-500/15 bg-forest-800 p-7">
                <Stars />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-cream/85">
                  „{r.text}"
                </blockquote>
                <figcaption className="mt-5 text-sm font-medium text-cream/60">
                  — {r.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Odznaki nagród */}
        <div className="mt-14">
          <div className="gold-rule" />
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-cream/70">
            {awards.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
                {a}
              </li>
            ))}
          </ul>
          {/* [DO UZUPEŁNIENIA: pliki logotypów odznak nagród] */}
        </div>
      </Container>
    </section>
  );
}
