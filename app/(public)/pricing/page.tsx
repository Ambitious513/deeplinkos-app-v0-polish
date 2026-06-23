import { PublicPageFrame } from "@/components/public/page-frame";

const tiers = [
  { name: "Free", price: "$0", detail: "Smart links, starter analytics, and basic QR exports." },
  { name: "Pro", price: "$19", detail: "Custom domains, advanced analytics, team workflows, and campaign reporting." },
];

export default function PricingPage() {
  return (
    <section className="section">
      <PublicPageFrame
        eyebrow="Pricing"
        title="Simple pricing that matches the product"
        description="We will keep the first release honest: a free starting point and a paid plan for teams who need domains, analytics depth, and higher usage."
      >
        <div className="hero-list">
          {tiers.map((tier) => (
            <div key={tier.name} className="hero-list__item">
              <div>
                <div className="hero-list__label">{tier.name}</div>
                <div className="hero-list__meta">{tier.detail}</div>
              </div>
              <span className="metric-pill">{tier.price}</span>
            </div>
          ))}
        </div>
      </PublicPageFrame>
    </section>
  );
}

