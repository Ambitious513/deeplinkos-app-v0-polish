import { notFound } from "next/navigation";

import { LinkComposer } from "@/components/public/link-composer";

const tools: Record<string, { title: string; body: string; interactive?: boolean }> = {
  "deep-link-generator": {
    title: "Deep link generator",
    body: "Paste a social, marketplace, affiliate, or app URL to see how DeepLinkOS detects the destination before creating a tracked smart link.",
    interactive: true,
  },
  "qr-generator": {
    title: "QR generator",
    body: "Create branded QR codes from the same smart link object so offline scans, social clicks, and campaign reporting stay together.",
  },
  "utm-builder": {
    title: "UTM builder",
    body: "Build campaign-ready URLs without stripping affiliate parameters or losing app-open routing behavior.",
  },
};

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools[slug];

  if (!tool) notFound();

  return (
    <section className="section">
      <div className="card" style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="eyebrow">Tools</div>
        <h1 className="dashboard-page__title">{tool.title}</h1>
        <p className="dashboard-page__summary">{tool.body}</p>
        <div className="panel" style={{ marginTop: 18 }}>
          {tool.interactive ? <LinkComposer /> : tool.body}
        </div>
      </div>
    </section>
  );
}
