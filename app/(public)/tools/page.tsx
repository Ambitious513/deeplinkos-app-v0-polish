import Link from "next/link";
import { PublicPageFrame } from "@/components/public/page-frame";

const tools = [
  { slug: "deep-link-generator", title: "Deep link generator", excerpt: "Draft smart link destinations quickly." },
  { slug: "qr-generator", title: "QR generator", excerpt: "A branded QR workflow tied to the same link object." },
  { slug: "utm-builder", title: "UTM builder", excerpt: "Create campaign-ready links without leaving the app." },
];

export default function ToolsPage() {
  return (
    <section className="section">
      <PublicPageFrame
        eyebrow="Tools"
        title="Utility pages that keep the launch useful"
        description="These pages support the product and search strategy without becoming a distraction."
      >
        <div className="hero-list">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="hero-list__item">
              <div>
                <div className="hero-list__label">{tool.title}</div>
                <div className="hero-list__meta">{tool.excerpt}</div>
              </div>
              <span className="metric-pill">Open</span>
            </Link>
          ))}
        </div>
      </PublicPageFrame>
    </section>
  );
}

