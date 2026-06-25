import { features } from "@/content/home";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FeatureGridSection() {
  return (
    <section className="section section--tight" id="features">
      <div className="container">
        <SectionHeader kicker="Features" title="Everything You Need">
          Use DeepLinkOS when the destination matters more than showing a list of links.
        </SectionHeader>
        <div className="features-grid">
          {features.map((feature) => (
            <article
              className={[
                "feature-card",
                feature.wide ? "feature-card--wide" : "",
                feature.hero ? "feature-card--hero" : "",
              ].join(" ")}
              key={feature.title}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              {feature.tag ? <span className="feature-tag">{feature.tag}</span> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
