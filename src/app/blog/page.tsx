import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { posts, formatDate } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description:
    "Porady, analizy rynku i przewodniki dla kupujących i sprzedających nieruchomości w Głogowie i okolicach.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Wiedza o rynku nieruchomości"
        subtitle="Porady, trendy i praktyczne przewodniki — prosto z lokalnego rynku."
        image="/hero/blog.jpg"
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold-500/10 bg-forest-800 transition hover:border-gold-500/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-forest-950/80 px-3 py-1 text-xs text-gold-300 backdrop-blur">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <time className="text-xs text-cream/50">
                      {formatDate(post.date)}
                    </time>
                    <h2 className="mt-2 text-lg leading-snug text-cream group-hover:text-gold-300">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/65">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-gold-400">
                      Czytaj dalej →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
