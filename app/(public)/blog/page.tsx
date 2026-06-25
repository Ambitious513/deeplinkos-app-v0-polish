import type { Metadata } from "next";

import { BlogPageContent } from "@/components/blog/BlogPageContent";
import { blogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: { absolute: "DeepLinkOS Growth Library | Creator, Ecommerce & Mobile Growth Playbooks" },
  description:
    "Read practical growth playbooks for creators, ecommerce stores, founders, and mobile teams covering smart links, social traffic, QR codes, attribution, campaigns, and conversions.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "DeepLinkOS Growth Library",
    description:
      "Growth playbooks for creators, ecommerce stores, founders, and mobile teams covering conversion, attribution, smart links, lifecycle campaigns, and deep linking.",
    url: "https://deeplinkos.com/blog",
    images: ["/og/growth-library.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepLinkOS Growth Library",
    description:
      "Growth playbooks for creators, ecommerce stores, founders, and mobile teams covering conversion, attribution, smart links, lifecycle campaigns, and deep linking.",
    images: ["/og/growth-library.svg"],
  },
};

const blogStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": "https://deeplinkos.com/blog#blog",
      url: "https://deeplinkos.com/blog",
      name: "DeepLinkOS Growth Library",
      description:
        "Growth playbooks for creators, ecommerce stores, founders, and mobile teams covering conversion, attribution, smart links, lifecycle campaigns, and deep linking.",
      blogPost: blogPosts.map((post) => ({ "@id": `https://deeplinkos.com/blog/${post.slug}` })),
    },
    {
      "@type": "ItemList",
      "@id": "https://deeplinkos.com/blog#posts",
      itemListElement: blogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://deeplinkos.com/blog/${post.slug}`,
        name: post.title,
      })),
    },
  ],
};

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }} />
      <BlogPageContent />
    </>
  );
}
