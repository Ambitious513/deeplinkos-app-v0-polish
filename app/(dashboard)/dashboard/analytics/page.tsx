import { PageFrame } from "@/components/dashboard/page-frame";

export default function AnalyticsPage() {
  return (
    <PageFrame
      eyebrow="Dashboard"
      title="Analytics"
      description="A deeper performance workspace with room for trend charts, referrers, devices, and campaign tables."
    >
      <div className="dashboard-grid">
        <div className="stack">
          <div className="panel">
            <div className="eyebrow">Trend</div>
            <div className="card" style={{ marginTop: 12, minHeight: 320 }}>
              Analytics chart placeholder.
            </div>
          </div>
        </div>
        <div className="stack">
          <div className="panel">
            <div className="eyebrow">Referrers</div>
            <div className="card" style={{ marginTop: 12 }}>Instagram</div>
            <div className="card" style={{ marginTop: 10 }}>Direct</div>
            <div className="card" style={{ marginTop: 10 }}>YouTube</div>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}

