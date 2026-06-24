import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <section className="bg-forest-950 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Co robimy"
          title="Usługi"
          subtitle="Kompleksowa obsługa nieruchomości — od pierwszej rozmowy po podpisanie aktu."
          align="center"
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}>
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl border border-gold-500/15 bg-forest-800 p-7 transition hover:border-gold-500/50 hover:bg-forest-700"
              >
                <span className="font-display text-sm text-gold-500">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-2xl text-cream group-hover:text-gold-300">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/70">
                  {s.desc}
                </p>
                <span className="mt-5 text-sm font-semibold text-gold-400">
                  Dowiedz się więcej →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
