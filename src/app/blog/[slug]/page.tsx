import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Placeholder from "@/components/ui/Placeholder";
import { posts, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Wpis nieznaleziony" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="pt-28 pb-20">
      <Container className="max-w-3xl">
        <nav className="mb-6 text-sm text-cream/55">
          <Link href="/blog" className="hover:text-gold-300">
            ← Wróć do bloga
          </Link>
        </nav>

        <p className="eyebrow">{post.category}</p>
        <h1 className="mt-3 font-display text-3xl text-cream sm:text-4xl">
          {post.title}
        </h1>
        <time className="mt-3 block text-sm text-cream/50">
          {formatDate(post.date)}
        </time>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-gold-500/15">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 768px"
            priority
            className="object-cover"
          />
        </div>

        <div className="mt-8">
          <Placeholder>
            Pełna treść artykułu „{post.title}”. Docelowo wpisy będą zarządzane
            przez MDX lub lekki CMS (Etap 3).
          </Placeholder>
        </div>

        <p className="mt-8 text-lg leading-relaxed text-cream/80">
          {post.excerpt}
        </p>
      </Container>
    </article>
  );
}
