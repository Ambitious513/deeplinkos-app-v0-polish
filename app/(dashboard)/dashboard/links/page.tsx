import { PageFrame } from "@/components/dashboard/page-frame";

const rows = [
  { title: "Summer launch video", platform: "YouTube", status: "Active", clicks: "34,239" },
  { title: "Instagram profile handoff", platform: "Instagram", status: "Active", clicks: "18,567" },
  { title: "WhatsApp sales chat", platform: "WhatsApp", status: "Active", clicks: "12,871" },
];

export default function LinksPage() {
  return (
    <PageFrame
      eyebrow="Dashboard"
      title="Links"
      description="A dense but calm link manager for fast scanning, filtering, and edits."
    >
      <div className="panel">
        <div className="card-grid" style={{ marginBottom: 16 }}>
          <div className="card metric-card">
            <div className="metric-label">Search</div>
            <div className="metric-value" style={{ fontSize: "1.35rem" }}>Filter-ready</div>
          </div>
          <div className="card metric-card">
            <div className="metric-label">Status</div>
            <div className="metric-value" style={{ fontSize: "1.35rem" }}>Active / Paused</div>
          </div>
        </div>
        <div className="table-card">
          <table className="table">
            <thead>
              <tr>
                <th>Smart link</th>
                <th>Platform</th>
                <th>Status</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.title}>
                  <td>{row.title}</td>
                  <td>{row.platform}</td>
                  <td>{row.status}</td>
                  <td>{row.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageFrame>
  );
}

