import { CompanyHero } from "@/components/company/CompanyHero";
import type { LegalPage } from "@/content/company";

type LegalPageContentProps = {
  page: LegalPage;
  titleId: string;
};

export function LegalPageContent({ page, titleId }: LegalPageContentProps) {
  return (
    <div className="company-shell">
      <div className="company-container company-container--legal">
        <CompanyHero kicker={page.kicker} title={page.title} description={page.description} titleId={titleId} />

        <div className="legal-layout">
          <div className="legal-note">{page.note}</div>
          {page.sections.map((section) => (
            <section className="legal-section" key={section.heading}>
              <h2>{section.heading}</h2>
              <p>
                {section.body}
                {section.link ? <a href={section.link.href}>{section.link.label}</a> : null}
                {section.link ? "." : null}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
