import { PublicPageFrame } from "@/components/public/page-frame";

export default function ContactPage() {
  return (
    <section className="section">
      <PublicPageFrame
        eyebrow="Contact"
        title="Talk to the team"
        description="Use this page for support, partnerships, and early launch feedback while we rebuild the product."
      >
        <div className="hero-list">
          <div className="hero-list__item">
            <div>
              <div className="hero-list__label">Email</div>
              <div className="hero-list__meta">support@deeplinkos.com</div>
            </div>
            <span className="metric-pill">Open</span>
          </div>
        </div>
      </PublicPageFrame>
    </section>
  );
}

