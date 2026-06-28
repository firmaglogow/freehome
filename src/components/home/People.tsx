import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { people, site } from "@/lib/site";

export default function People({
  withHeading = true,
}: {
  withHeading?: boolean;
}) {
  return (
    <section className="border-y border-gold-500/10 bg-forest-800 py-20 sm:py-28">
      <Container>
        {withHeading ? (
          <SectionHeading
            eyebrow="Poznaj nas"
            title="Zespół FREE HOME"
            subtitle="Ludzie, do których trafiasz bezpośrednio — i zaufany partner kredytowy. Bez hierarchii, bez infolinii."
            align="center"
          />
        ) : (
          // Bez widocznego nagłówka (np. na /ludzie pod PageHeader) i tak
          // potrzebny h2, by nie powstała luka w hierarchii (h1 → h3).
          <h2 className="sr-only">Zespół FREE HOME</h2>
        )}

        <div className="mx-auto mt-12 grid max-w-6xl gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <Link
                href={`/ludzie/${p.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-gold-500/15 bg-forest-900 transition hover:border-gold-500/40 hover:bg-forest-900/80"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={p.photo}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-cream group-hover:text-gold-300">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gold-400">{p.role}</p>
                  {p.partnerLabel && (
                    <p className="mt-0.5 text-xs uppercase tracking-wide text-cream/60">
                      {p.partnerLabel}
                    </p>
                  )}
                  <span className="mt-4 inline-block text-sm font-semibold text-gold-400">
                    {p.partner ? "Zobacz profil →" : "Zobacz profil i oferty →"}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-cream/60">
          Wolisz porozmawiać od razu?{" "}
          <a
            href={site.phoneHref}
            className="font-semibold text-gold-400 hover:underline"
          >
            Zadzwoń: {site.phone}
          </a>
        </p>
      </Container>
    </section>
  );
}
