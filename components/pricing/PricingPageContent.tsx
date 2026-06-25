"use client";

import Link from "next/link";
import { useState } from "react";
import { comparisonGroups, pricingFaqs, pricingPlans } from "@/content/pricing";

type BillingCycle = "monthly" | "annual";

export function PricingPageContent() {
  const [billing, setBilling] = useState<BillingCycle>("annual");
  const isAnnual = billing === "annual";

  return (
    <>
      <section className="pricing-page-header">
        <div className="container pricing-container">
          <div className="section-tag pricing-kicker">Pricing</div>
          <h1 className="pricing-page-title">
            Predictable pricing.
            <br />
            <span className="grad-text">No &apos;viral&apos; penalties.</span>
          </h1>
          <p className="pricing-page-sub">
            Unlike per-click competitors, we don&apos;t punish you when your post blows up. Flat-rate pricing for
            unlimited app opens.
          </p>

          <div className="billing-toggle-wrap" aria-label="Billing cycle">
            <button
              className={isAnnual ? "bt-label" : "bt-label active"}
              type="button"
              onClick={() => setBilling("monthly")}
              aria-pressed={!isAnnual}
            >
              Monthly
            </button>
            <button
              className={isAnnual ? "bt-switch annual" : "bt-switch"}
              type="button"
              onClick={() => setBilling(isAnnual ? "monthly" : "annual")}
              aria-label="Toggle annual billing"
              aria-pressed={isAnnual}
            >
              <span className="bt-knob" />
            </button>
            <button
              className={isAnnual ? "bt-label active" : "bt-label"}
              type="button"
              onClick={() => setBilling("annual")}
              aria-pressed={isAnnual}
            >
              Annual <span className="bt-save-badge">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      <section className="pricing-cards-section">
        <div className="container pricing-container">
          <div className="pricing-grid-full">
            {pricingPlans.map((plan) => (
              <article className={plan.highlighted ? "price-card price-card--pro" : "price-card"} key={plan.name}>
                {plan.badge ? <span className="price-badge">{plan.badge}</span> : null}
                <div className={plan.highlighted ? "price-plan price-plan--accent" : "price-plan"}>{plan.name}</div>
                <div className="price-amount">
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  <span>{plan.suffix}</span>
                </div>
                <p className="price-desc">{plan.description}</p>
                <Link className={plan.highlighted ? "price-cta price-cta--fill" : "price-cta price-cta--out"} href="/signup">
                  {plan.cta}
                </Link>
                <ul className="feat-list">
                  {plan.features.map((feature) => (
                    <li className="feat-item" key={feature.label}>
                      <span className="feat-check">✓</span>
                      <span className={feature.highlighted ? "feat-item--highlight" : ""}>{feature.label}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="compare-section">
        <div className="container pricing-container">
          <h2 className="compare-title">Compare all features</h2>
          <p className="compare-sub">Everything side-by-side so there are no surprises.</p>
          <span className="compare-hint">Swipe to see all plans</span>
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="compare-feature-col">Feature</th>
                  <th className="td-center">Free</th>
                  <th className="td-center compare-pro">Pro</th>
                  <th className="td-center">Growth</th>
                </tr>
              </thead>
              <tbody>
                {comparisonGroups.map((group) => (
                  <TableGroup group={group} key={group.title} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <h2 className="faq-title">Pricing FAQ</h2>
        <p className="faq-sub">No surprises. No fine print. Just honest answers.</p>
        <div className="faq-grid">
          {pricingFaqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <span className="summary-icon">+</span>
              </summary>
              <div className="faq-content">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="pricing-cta-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-icon">✦</div>
            <h2>Start with 10,000 free clicks</h2>
            <p>No credit card. No SDK. No enterprise onboarding. Just paste a link and get a smart route.</p>
            <div className="cta-actions">
              <Link className="btn btn-primary" href="/signup">
                Create Free Account
              </Link>
              <Link className="btn btn-secondary" href="/">
                Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TableGroup({ group }: { group: (typeof comparisonGroups)[number] }) {
  return (
    <>
      <tr className="section-row">
        <td colSpan={4}>{group.title}</td>
      </tr>
      {group.rows.map((row) => (
        <tr key={row.feature}>
          <td>{row.feature}</td>
          <FeatureValue value={row.free} />
          <FeatureValue value={row.pro} />
          <FeatureValue value={row.growth} />
        </tr>
      ))}
    </>
  );
}

function FeatureValue({ value }: { value: string | boolean }) {
  if (value === true) return <td className="td-center check-icon">✓</td>;
  if (value === false) return <td className="td-center dash-icon">-</td>;
  return <td className="td-center text-value">{value}</td>;
}
