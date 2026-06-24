import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/lib/site";

export const metadata = {
  title: "Usługi",
  description:
    "Sprzedaż, zakup, wynajem, obsługa deweloperów i finansowanie. Kompleksowa obsługa nieruchomości w Głogowie i okolicach.",
};

export default function UslugiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Usługi"
        title="Jak możemy Ci pomóc"
        subtitle="Od wyceny po bezpieczną transakcję — prowadzimy Cię przez cały proces."
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-2xl border border-gold-500/15 bg-forest-800 p-7 transition hover:border-gold-500/40 hover:bg-forest-800/80"
                >
                  <span className="font-display text-sm text-gold-400">
                    0{i + 1}
                  </span>
                  <h2 className="mt-3 text-xl text-cream group-hover:text-gold-300">
                    {s.title}
                  </h2>
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
    </>
  );
}
