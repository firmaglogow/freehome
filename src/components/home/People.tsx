import Image from "next/image";
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
        {withHeading && (
          <SectionHeading
            eyebrow="Poznaj nas"
            title="Ludzie FREE HOME"
            subtitle="Trzy osoby, do których trafiasz. Bez hierarchii, bez infolinii."
            align="center"
          />
        )}

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <article className="overflow-hidden rounded-2xl border border-gold-500/15 bg-forest-900">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={p.photo}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-cream">{p.name}</h3>
                  <p className="text-sm text-gold-400">{p.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">
                    {p.bio}
                  </p>
                  <div className="mt-4 space-y-1 text-sm">
                    <p className="text-cream/80">tel. {p.phone}</p>
                    <p className="text-cream/60">{p.email}</p>
                  </div>
                </div>
              </article>
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
