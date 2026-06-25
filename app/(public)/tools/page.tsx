import type { Metadata } from "next";
import { ToolsPageContent } from "@/components/tools/ToolsPageContent";
import { aiTools } from "@/content/tools";

export const metadata: Metadata = {
  title: { absolute: "AI Tools for Growth | Free AI Tool Alternatives & Growth Stack" },
  description:
    "Explore curated AI tools and free AI tool alternatives for creators, ecommerce stores, marketers, and agencies building content, campaigns, automation, and conversions.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "AI Tools for Growth",
    description:
      "A curated AI tools directory for growth teams, with alternatives for content, SEO, social, ecommerce, automation, analytics, and conversion.",
    url: "https://deeplinkos.com/tools",
    images: ["/og/ai-tools-growth.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools for Growth",
    description:
      "A curated AI tools directory for creators, stores, marketers, and agencies, with alternatives and growth use cases.",
    images: ["/og/ai-tools-growth.svg"],
  },
};

const toolsStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://deeplinkos.com/tools#collection",
      url: "https://deeplinkos.com/tools",
      name: "AI Tools for Growth",
      description:
        "A curated AI tools directory for creators, ecommerce stores, marketers, and agencies building content, campaigns, automation, and conversions.",
      isPartOf: { "@id": "https://deeplinkos.com/#website" },
    },
    {
      "@type": "ItemList",
      "@id": "https://deeplinkos.com/tools#tools",
      itemListElement: aiTools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://deeplinkos.com/tools/${tool.slug}`,
        name: tool.name,
        description: tool.description,
      })),
    },
  ],
};

export default function ToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsStructuredData) }} />
      <ToolsPageContent />
    </>
  );
}
