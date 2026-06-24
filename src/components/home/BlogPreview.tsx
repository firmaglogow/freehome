import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { posts, formatDate } from "@/lib/blog";

export default function BlogPreview() {
  const latest = posts.slice(0, 3);

  return (
    <section className="bg-forest-950 py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Wiedza"
            title="Blog i aktualności"
            subtitle="Porady, rynek i finanse — prosto i konkretnie."
          />
          <Link
            href="/blog"
            className="rounded-full border border-gold-500/40 px-5 py-2.5 text-sm font-semibold text-gold-400 transition hover:bg-gold-500 hover:text-forest-950"
          >
            Zobacz bloga
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-2xl border border-gold-500/10 bg-forest-800 transition hover:border-gold-500/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-gold-400">
                    {post.category} · {formatDate(post.date)}
                  </p>
                  <h3 className="mt-2 text-xl leading-snug text-cream group-hover:text-gold-300">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-cream/70">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
