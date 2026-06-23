import { PageFrame } from "@/components/dashboard/page-frame";

const metrics = [
  { label: "Total Clicks", value: "142,847", badge: "+18.2%" },
  { label: "Unique Visitors", value: "89,647", badge: "+12.5%" },
  { label: "Active Links", value: "248", badge: "9 live" },
  { label: "Top Referrer", value: "Instagram", badge: "34.1%" },
];

const links = [
  { title: "Summer launch video", slug: "deeplinkos.com/r/summer-launch", clicks: "34,239" },
  { title: "Instagram profile handoff", slug: "deeplinkos.com/r/ig-profile", clicks: "18,567" },
  { title: "WhatsApp sales chat", slug: "deeplinkos.com/r/chat-now", clicks: "12,871" },
];

export default function DashboardHomePage() {
  return (
    <PageFrame
      eyebrow="Dashboard"
      title="Overview"
      description="A faster read on link health, campaign traffic, and the work that needs attention before the next launch."
    >
      <div className="kpi-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="card kpi-card">
            <div className="kpi-card__label">{metric.label}</div>
            <div className="kpi-card__value">{metric.value}</div>
            <span className="metric-pill">{metric.badge}</span>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="stack">
          <div className="table-card">
            <table className="table">
              <thead>
                <tr>
                  <th>Top links</th>
                  <th>URL</th>
                  <th>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr key={link.slug}>
                    <td>{link.title}</td>
                    <td>{link.slug}</td>
                    <td>{link.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel">
            <div className="eyebrow">Attention</div>
            <p className="dashboard-page__summary" style={{ marginBottom: 0 }}>
              Pending DNS, weak fallbacks, or links needing review will live here once the dashboard is fully connected.
            </p>
          </div>
        </div>

        <div className="stack">
          <div className="panel">
            <div className="eyebrow">Traffic Trend</div>
            <div className="card" style={{ marginTop: 12, minHeight: 260 }}>
              Chart placeholder for the first pass. We will wire the real chart in phase 3 and phase 6.
            </div>
          </div>

          <div className="panel">
            <div className="eyebrow">Device Breakdown</div>
            <div className="card" style={{ marginTop: 12 }}>
              Desktop 57.7%
            </div>
            <div className="card" style={{ marginTop: 10 }}>
              Mobile 33.0%
            </div>
            <div className="card" style={{ marginTop: 10 }}>
              Tablet 9.3%
            </div>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}

