import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Placeholder from "@/components/ui/Placeholder";
import People from "@/components/home/People";
import { awards, site } from "@/lib/site";

export const metadata = {
  title: "O nas",
  description:
    "FREE HOME Nieruchomości — lokalne biuro z Głogowa. Ludzie, których znasz, i transakcje, którym możesz zaufać.",
};

export default function ONasPage() {
  return (
    <>
      <PageHeader
        eyebrow="O nas"
        title="Lokalne biuro, które zna Twoją okolicę"
        subtitle="Jesteśmy z Głogowa i tu pracujemy. Znamy rynek, sąsiedztwa i ludzi."
      />

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Placeholder>
            Historia FREE HOME — kiedy powstało biuro, misja, wartości, czym się
            wyróżniamy. Treść do uzupełnienia z właścicielem.
          </Placeholder>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { v: `${site.reviewsCount}+`, l: "opinii klientów" },
              { v: "5,0", l: "średnia ocen" },
              { v: "100%", l: "lokalnie" },
              { v: "3", l: "osoby w zespole" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="rounded-2xl border border-gold-500/15 bg-forest-800 p-5 text-center">
                  <p className="font-display text-3xl text-gold-400">{stat.v}</p>
                  <p className="mt-1 text-xs text-cream/60">{stat.l}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <h2 className="mt-14 font-display text-2xl text-cream">Wyróżnienia</h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {awards.map((a) => (
              <span
                key={a}
                className="rounded-full border border-gold-500/25 bg-gold-500/5 px-4 py-2 text-sm text-gold-300"
              >
                {a}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <People />

      <section className="py-16 text-center">
        <Container>
          <Link
            href="/kontakt"
            className="inline-block rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-forest-950 transition hover:bg-gold-400"
          >
            Skontaktuj się z nami
          </Link>
        </Container>
      </section>
    </>
  );
}
