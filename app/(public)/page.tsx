import Link from "next/link";
import { PublicPageFrame } from "@/components/public/page-frame";

const signals = [
  { label: "One URL", meta: "Paste a single destination and generate a smart link." },
  { label: "Open right app", meta: "Route users to iOS, Android, or desktop automatically." },
  { label: "Measure clicks", meta: "Track opens, referrers, devices, and campaigns." },
  { label: "Ship QR flows", meta: "Turn links into branded QR experiences in seconds." },
];

export default function HomePage() {
  return (
    <>
      <PublicPageFrame
        eyebrow="Smart links, finally calm"
        title="DeepLinkOS turns every link into a routed, measurable growth surface."
        description="Build smart links, QR codes, and campaign-aware redirects without losing the clarity of a real product. This clean rebuild keeps the proven routing logic and gives us a serious place to ship from."
      >
        <div className="hero-list">
          {signals.map((signal) => (
            <div key={signal.label} className="hero-list__item">
              <div>
                <div className="hero-list__label">{signal.label}</div>
                <div className="hero-list__meta">{signal.meta}</div>
              </div>
              <span className="metric-pill">Ready</span>
            </div>
          ))}
        </div>
      </PublicPageFrame>

      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">What we are building</div>
            <h2 className="section-title">A full SaaS product, not a one-page demo</h2>
            <p className="section-copy">
              The next pass will port the link engine, stabilize the schema, and then use v0 to shape the dashboard and public site around the working data contract.
            </p>
          </div>
          <Link href="/signup" className="btn btn-primary">
            Start free
          </Link>
        </div>

        <div className="card-grid">
          <div className="card metric-card">
            <div className="metric-label">Routing</div>
            <div className="metric-value">iOS / Android / Desktop</div>
            <div className="metric-pill">Core logic preserved</div>
          </div>
          <div className="card metric-card">
            <div className="metric-label">Analytics</div>
            <div className="metric-value">Clicks, devices, referrers</div>
            <div className="metric-pill">Dashboard-ready</div>
          </div>
          <div className="card metric-card">
            <div className="metric-label">QR</div>
            <div className="metric-value">Branded export flow</div>
            <div className="metric-pill">Designer next</div>
          </div>
          <div className="card metric-card">
            <div className="metric-label">Domains</div>
            <div className="metric-value">Custom domain support</div>
            <div className="metric-pill">Launch path</div>
          </div>
        </div>
      </section>
    </>
  );
}
