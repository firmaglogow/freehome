import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { posts, formatDate } from "@/lib/blog";
import { site } from "@/lib/site";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Wpis nieznaleziony" };
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}/`,
    // Karta social pokazuje okładkę wpisu (16:9); fallback to markowy OG bloga.
    ogImage: post.image || "/og/blog.jpg",
  });
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Dane strukturalne artykułu (rich result „Article") + okruszki.
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(post.image)],
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    author: { "@type": "Organization", name: site.fullName, url: site.url },
    publisher: { "@type": "Organization", name: site.fullName, url: site.url },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}/`),
  };

  return (
    <article className="pt-28 pb-20">
      <JsonLd
        data={[
          articleLd,
          breadcrumbJsonLd([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}/` },
          ]),
        ]}
      />
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

        <p className="mt-8 text-lg leading-relaxed text-cream/85">
          {post.excerpt}
        </p>

        <div className="mt-8 text-base leading-relaxed text-cream/75">
          {post.body.map((block, i) => {
            if (block.heading) {
              return (
                <h2
                  key={i}
                  className="mt-10 mb-3 font-display text-2xl text-cream"
                >
                  {block.heading}
                </h2>
              );
            }
            if (block.list) {
              return (
                <ul
                  key={i}
                  className="mt-4 list-disc space-y-2 pl-5 marker:text-gold-400"
                >
                  {block.list.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="mt-4">
                {block.lead && (
                  <strong className="font-semibold text-cream">
                    {block.lead}{" "}
                  </strong>
                )}
                {block.text}
              </p>
            );
          })}
        </div>

        {post.note && (
          <p className="mt-10 border-t border-gold-500/15 pt-5 text-xs leading-relaxed text-cream/45">
            {post.note}
          </p>
        )}
      </Container>
    </article>
  );
}
