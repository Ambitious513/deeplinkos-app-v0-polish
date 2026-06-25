import { companyMeta } from "@/content/company";

type CompanyHeroProps = {
  kicker: string;
  title: string;
  description: string;
  titleId: string;
  meta?: string[];
};

export function CompanyHero({ kicker, title, description, titleId, meta = [companyMeta.updated, companyMeta.review] }: CompanyHeroProps) {
  return (
    <section className="company-hero" aria-labelledby={titleId}>
      <span className="company-kicker">{kicker}</span>
      <h1 className="company-title" id={titleId}>
        {title}
      </h1>
      <p className="company-sub">{description}</p>
      <div className="company-meta">
        {meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}
