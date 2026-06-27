import { PageFrame } from "@/components/dashboard/page-frame";

export default function QrPage() {
  return (
    <PageFrame
      eyebrow="Dashboard"
      title="QR Designer"
      description="A focused design surface for branded QR exports and link-connected previews."
    >
      <div className="dashboard-grid">
        <div className="panel">
          <div className="eyebrow">Preview</div>
          <div className="card" style={{ marginTop: 12, minHeight: 340, display: "grid", placeItems: "center" }}>
            QR preview placeholder
          </div>
        </div>
        <div className="panel">
          <div className="eyebrow">Controls</div>
          <div className="card" style={{ marginTop: 12 }}>Color swatches, size controls, and export actions will live here.</div>
        </div>
      </div>
    </PageFrame>
  );
}

