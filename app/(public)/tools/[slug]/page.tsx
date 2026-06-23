import { notFound } from "next/navigation";

const tools: Record<string, { title: string; body: string }> = {
  "deep-link-generator": {
    title: "Deep link generator",
    body: "This route is a placeholder for the production tool pages that will later be wired to the real smart-link builder.",
  },
  "qr-generator": {
    title: "QR generator",
    body: "This route will later power branded QR creation tied to DeepLinkOS link objects.",
  },
  "utm-builder": {
    title: "UTM builder",
    body: "This route will later help users generate campaign-ready URLs with tracked parameters.",
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
        <div className="panel" style={{ marginTop: 18 }}>{tool.body}</div>
      </div>
    </section>
  );
}

