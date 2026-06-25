import Link from "next/link";
import { pricingTeasers } from "@/content/home";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function PricingPreviewSection() {
  return (
    <section className="section section--tight">
      <div className="container">
        <SectionHeader kicker="Pricing" title="Simple, honest pricing." centered>
          No per-click fees. No viral penalties. Start free, upgrade when you grow.
        </SectionHeader>

        <div className="pricing-preview-grid">
          {pricingTeasers.map((plan) => (
            <article className={plan.highlighted ? "pricing-preview-card is-highlighted" : "pricing-preview-card"} key={plan.name}>
              {plan.badge ? <span className="plan-badge">{plan.badge}</span> : null}
              <h3>{plan.name}</h3>
              <div className="plan-price">
                {plan.price}
                <span>{plan.suffix}</span>
              </div>
              <p>{plan.description}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className="feat-check">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <Link className={plan.highlighted ? "plan-cta plan-cta--fill" : "plan-cta"} href="/signup">
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
        <div className="pricing-link-wrap">
          <Link className="pricing-link" href="/pricing">
            See full feature comparison
          </Link>
        </div>
      </div>
    </section>
  );
}
