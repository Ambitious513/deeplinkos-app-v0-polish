import { notFound } from "next/navigation";

const posts: Record<string, { title: string; excerpt: string; body: string }> = {
  "smart-link-basics": {
    title: "Smart link basics",
    excerpt: "How routing, fallbacks, and tracking fit together.",
    body: "This article route is ready for the CMS phase. We will later wire it to the blog content source without changing the routing shell.",
  },
  "qr-conversion": {
    title: "QR that converts",
    excerpt: "Why QR should live inside the same link system.",
    body: "QR is not a separate feature. It should use the same link, analytics, and campaign model as the rest of the product.",
  },
  "custom-domains": {
    title: "Why custom domains matter",
    excerpt: "The trust and brand lift that domains create.",
    body: "This route exists so we can later plug in structured article content and preserve SEO-friendly URLs.",
  },
};

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) notFound();

  return (
    <section className="section">
      <div className="card" style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="eyebrow">Blog</div>
        <h1 className="dashboard-page__title">{post.title}</h1>
        <p className="dashboard-page__summary">{post.excerpt}</p>
        <div className="panel" style={{ marginTop: 18 }}>{post.body}</div>
      </div>
    </section>
  );
}

