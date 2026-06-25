import { steps } from "@/content/home";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HowItWorksSection() {
  return (
    <section className="section section--tight">
      <div className="container">
        <SectionHeader kicker="How It Works" title="Make Every Link Behave Correctly">
          DeepLinkOS sits between simple link-in-bio pages and heavy enterprise attribution suites.
        </SectionHeader>
        <div className="steps">
          {steps.map((step) => (
            <article className="step" key={step.label}>
              <div className="step-left">
                <div className={`step-num step-num--${step.gradient ?? "primary"}`}>{step.label}</div>
                <div className="step-line" />
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
