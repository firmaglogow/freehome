import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ValuationForm from "@/components/ValuationForm";
import NapCard from "@/components/ui/NapCard";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Wyceń nieruchomość",
  description:
    "Bezpłatna i niezobowiązująca wycena nieruchomości w Głogowie i okolicach. Poznaj realną wartość rynkową swojego domu, mieszkania lub działki.",
  path: "/wycena",
  ogImage: "/og/wycena.jpg",
});

const benefits = [
  {
    title: "Bezpłatnie i bez zobowiązań",
    desc: "Wycena nie kosztuje nic i nie zobowiązuje Cię do współpracy.",
  },
  {
    title: "Realna wartość rynkowa",
    desc: "Opieramy się na lokalnych danych i bieżących transakcjach.",
  },
  {
    title: "Szybka odpowiedź",
    desc: "Oddzwaniamy zwykle tego samego dnia roboczego.",
  },
];

export default function WycenaPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Wycena", path: "/wycena" }])} />
      <PageHeader
        eyebrow="Wycena"
        title="Ile naprawdę warta jest Twoja nieruchomość?"
        subtitle="Zostaw kontakt i podstawowe informacje — przygotujemy bezpłatną wycenę."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <div className="space-y-6">
                {benefits.map((b, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-forest-950">
                        ✓
                      </span>
                      <div>
                        <h3 className="text-lg text-cream">{b.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-cream/70">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Spójny NAP — kontakt do biura przy formularzu wyceny (lokalne SEO). */}
              <Reveal delay={benefits.length * 80}>
                <NapCard className="mt-8" />
              </Reveal>
            </div>

            <div className="rounded-3xl border border-gold-500/15 bg-forest-800 p-7 sm:p-8">
              <h2 className="text-xl text-cream">Zamów bezpłatną wycenę</h2>
              <p className="mt-1 mb-6 text-sm text-cream/60">
                Wypełnij krótką ankietę — przygotujemy orientacyjną wartość i
                odezwiemy się do Ciebie.
              </p>
              <ValuationForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
