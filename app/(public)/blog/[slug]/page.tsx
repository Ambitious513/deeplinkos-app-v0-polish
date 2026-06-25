import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/content/blog";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: { absolute: "Article Not Found | DeepLinkOS" },
    };
  }

  return {
    title: { absolute: post.seoTitle },
    description: post.seoDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `https://deeplinkos.com/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <article className="blog-article-placeholder">
      <div className="blog-article-placeholder-inner">
        <Link className="blog-back-link" href="/blog">
          Back to Growth Library
        </Link>
        <span className="blog-eyebrow">{post.categoryLabel}</span>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        <div className="blog-meta">
          <span>{post.author}</span>
          <span>{post.readTime}</span>
          <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        </div>
        <div className="blog-placeholder-card">
          Full article content will be supplied from Supabase later. This route is ready for the CMS integration phase.
        </div>
      </div>
    </article>
  );
}
