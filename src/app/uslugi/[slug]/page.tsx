import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Placeholder from "@/components/ui/Placeholder";
import { services, site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/uslugi/[slug]">) {
  const { slug } = await props.params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Usługa nieznaleziona" };
  return { title: service.title, description: service.desc };
}

export default async function ServicePage(props: PageProps<"/uslugi/[slug]">) {
  const { slug } = await props.params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <PageHeader eyebrow="Usługa" title={service.title} subtitle={service.desc} />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Placeholder>
            Szczegółowy opis usługi „{service.title}” — przebieg współpracy,
            korzyści, FAQ. Treść do uzupełnienia z właścicielem.
          </Placeholder>

          <div className="mt-10 space-y-6 text-cream/75">
            <h2 className="font-display text-2xl text-cream">Jak to działa</h2>
            <ol className="space-y-4">
              {[
                "Bezpłatna konsultacja i analiza potrzeb.",
                "Wycena i ustalenie strategii.",
                "Działanie — marketing, prezentacje, negocjacje.",
                "Bezpieczna, dopięta transakcja.",
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gold-500 text-sm font-semibold text-forest-950">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-12 rounded-3xl border border-gold-500/15 bg-forest-800 p-8 text-center">
            <h3 className="font-display text-2xl text-cream">
              Porozmawiajmy o Twojej sprawie
            </h3>
            <p className="mt-2 text-sm text-cream/70">
              Zadzwoń lub napisz — odpowiemy szybko i bez zobowiązań.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={site.phoneHref}
                className="rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-forest-950 transition hover:bg-gold-400"
              >
                Zadzwoń: {site.phone}
              </a>
              <Link
                href="/kontakt"
                className="rounded-full border border-gold-500/30 px-6 py-3 text-sm font-semibold text-gold-400 transition hover:bg-gold-500/10"
              >
                Napisz do nas
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
