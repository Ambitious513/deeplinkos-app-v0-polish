import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { aiTools, findTool } from "@/content/tools";

type ToolDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return aiTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = findTool(slug);

  if (!tool) {
    return {
      title: { absolute: "AI Tool Not Found | DeepLinkOS" },
    };
  }

  return {
    title: { absolute: tool.seoTitle },
    description: tool.seoDescription,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: `https://deeplinkos.com/tools/${tool.slug}`,
    },
  };
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params;
  const tool = findTool(slug);

  if (!tool) notFound();

  return (
    <article className="tools-detail-shell">
      <div className="tools-detail-inner">
        <Link className="tools-back-link" href="/tools">
          Back to AI Tools
        </Link>
        <span className="tools-eyebrow">{tool.categoryLabel}</span>
        <h1>
          {tool.name} for <span className="grad-text">Growth</span>
        </h1>
        <p>{tool.description}</p>

        <div className="tools-detail-card">
          <div>
            <span className={`tools-tool-mark tools-tool-mark--${tool.category}`}>{tool.initials}</span>
            <h2>{tool.tagline}</h2>
            <p>Best for: {tool.bestFor}</p>
          </div>
          <div className="tools-detail-meta">
            <span>{tool.pricingCue}</span>
            {tool.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <section className="tools-detail-card" aria-labelledby="tool-alternatives-title">
          <h2 id="tool-alternatives-title">{tool.name} alternatives</h2>
          <div className="tools-alt-row">
            {tool.alternatives.map((alternative) => (
              <span className="tools-alt-chip" key={alternative.name}>
                {alternative.name}
              </span>
            ))}
          </div>
          <p>
            Full tool reviews, screenshots, pricing notes, affiliate links, and comparison content will be supplied from
            the CMS later. This route is ready for the directory integration phase.
          </p>
        </section>
      </div>
    </article>
  );
}
