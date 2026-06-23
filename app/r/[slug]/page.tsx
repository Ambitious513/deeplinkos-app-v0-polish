import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const knownSlugs = new Set(["example", "summer-launch", "ig-profile", "chat-now"]);

export default async function RedirectPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!knownSlugs.has(slug)) {
    notFound();
  }

  return (
    <main className="section">
      <div className="card" style={{ maxWidth: 720, margin: "12vh auto 0", textAlign: "center" }}>
        <div className="eyebrow">Redirect engine</div>
        <h1 className="dashboard-page__title">Preparing smart link redirect</h1>
        <p className="dashboard-page__summary">
          This route will later run the full DeepLinkOS redirect stack. For now it exists as the clean scaffold entry point.
        </p>
        <div className="panel" style={{ marginTop: 18, textAlign: "left" }}>
          /r/{slug}
        </div>
      </div>
    </main>
  );
}

