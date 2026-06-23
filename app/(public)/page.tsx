import Link from "next/link";
import { PublicPageFrame } from "@/components/public/page-frame";
import { LinkComposer } from "@/components/public/link-composer";

const signals = [
  { label: "Amazon", meta: "Preserve affiliate tags and route shoppers into the app." },
  { label: "Pinterest", meta: "Move social traffic from in-app browsers to native intent." },
  { label: "Reddit", meta: "Track communities, comments, devices, and campaign sources." },
  { label: "QR", meta: "Turn every smart link into a branded offline action." },
];

const audiences = [
  { title: "Affiliate marketers", copy: "Keep Amazon, Walmart, Target, eBay, and Etsy attribution intact while measuring traffic quality." },
  { title: "Creators", copy: "Route fans from TikTok, Instagram, YouTube, Pinterest, Reddit, and newsletters into the right destination." },
  { title: "Growth teams", copy: "Use one link object for social, QR, custom domains, UTM passthrough, and app-open analytics." },
];

const platforms = [
  "Amazon",
  "Walmart",
  "Target",
  "eBay",
  "Etsy",
  "YouTube",
  "Instagram",
  "TikTok",
  "Reddit",
  "Pinterest",
  "LinkedIn",
  "Google Maps",
];

export default function HomePage() {
  return (
    <>
      <PublicPageFrame
        eyebrow="Smart links for social and commerce"
        title="Open the right app. Preserve attribution. Measure every click."
        description="DeepLinkOS turns marketplace, affiliate, social, QR, and custom-domain traffic into routed smart links with device-aware fallbacks and campaign analytics."
      >
        <LinkComposer />
      </PublicPageFrame>

      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Where it fits</div>
            <h2 className="section-title">Built for the links that actually drive revenue</h2>
            <p className="section-copy">
              A single destination can carry app-routing rules, affiliate parameters, UTM defaults, QR exports, and analytics without becoming a brittle spreadsheet of links.
            </p>
          </div>
          <Link href="/signup" className="btn btn-primary">
            Start free
          </Link>
        </div>

        <div className="card-grid">
          {audiences.map((audience) => (
            <div key={audience.title} className="card audience-card">
              <div className="metric-label">{audience.title}</div>
              <h3>{audience.copy}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Detection library</div>
            <h2 className="section-title">Social, marketplace, and app links in one registry</h2>
            <p className="section-copy">
              The composer recognizes common domains immediately and enriches unknown links with metadata and favicon previews when available.
            </p>
          </div>
        </div>

        <div className="platform-cloud">
          {platforms.map((platform) => (
            <span key={platform}>{platform}</span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="card-grid">
          {signals.map((signal) => (
            <div key={signal.label} className="card metric-card">
              <div className="metric-label">{signal.label}</div>
              <div className="metric-value">{signal.label === "QR" ? "Offline" : "App-open"}</div>
              <p className="hero-list__meta">{signal.meta}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
