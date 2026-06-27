import { PageFrame } from "@/components/dashboard/page-frame";
import { listLinksForUser } from "@/lib/links";
import { createClient } from "@/lib/supabase/server";

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
}

function shortUrl(slug: string) {
  return `${siteUrl()}/r/${slug}`;
}

export default async function DashboardHomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const links = user ? await listLinksForUser(user.id) : [];
  const activeLinks = links.filter((link) => link.isActive);
  const pausedLinks = links.filter((link) => !link.isActive);
  const recentLinks = links.slice(0, 5);
  const metrics = [
    { label: "Total links", value: String(links.length), badge: "Owned" },
    { label: "Active links", value: String(activeLinks.length), badge: "Live" },
    { label: "Paused links", value: String(pausedLinks.length), badge: "Review" },
    { label: "Top platform", value: activeLinks[0]?.preset ? activeLinks[0].preset.replace("-", " ") : "None yet", badge: "Detected" },
  ];

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
                {recentLinks.map((link) => (
                  <tr key={link.slug}>
                    <td>{link.title}</td>
                    <td>{shortUrl(link.slug)}</td>
                    <td>{link.isActive ? "Active" : "Paused"}</td>
                  </tr>
                ))}
                {!recentLinks.length ? (
                  <tr>
                    <td colSpan={3}>Create your first smart link to populate this table.</td>
                  </tr>
                ) : null}
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
              Click trend will appear here once live traffic starts flowing through your smart links.
            </div>
          </div>

          <div className="panel">
            <div className="eyebrow">Next actions</div>
            <div className="card" style={{ marginTop: 12 }}>
              Create links for your most important social, marketplace, or affiliate destinations.
            </div>
            <div className="card" style={{ marginTop: 10 }}>
              Copy short URLs into campaigns and bios.
            </div>
            <div className="card" style={{ marginTop: 10 }}>
              Visit links to validate redirect and click tracking.
            </div>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
