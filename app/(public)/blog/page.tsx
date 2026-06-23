import Link from "next/link";
import { PublicPageFrame } from "@/components/public/page-frame";

const posts = [
  { slug: "smart-link-basics", title: "Smart link basics", excerpt: "How routing, fallbacks, and tracking fit together." },
  { slug: "qr-conversion", title: "QR that converts", excerpt: "Why QR should live inside the same link system." },
  { slug: "custom-domains", title: "Why custom domains matter", excerpt: "The trust and brand lift that domains create." },
];

export default function BlogIndexPage() {
  return (
    <section className="section">
      <PublicPageFrame
        eyebrow="Blog"
        title="A practical growth library"
        description="Short, useful articles that support the product, the search footprint, and the launch narrative."
      >
        <div className="hero-list">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="hero-list__item">
              <div>
                <div className="hero-list__label">{post.title}</div>
                <div className="hero-list__meta">{post.excerpt}</div>
              </div>
              <span className="metric-pill">Read</span>
            </Link>
          ))}
        </div>
      </PublicPageFrame>
    </section>
  );
}

