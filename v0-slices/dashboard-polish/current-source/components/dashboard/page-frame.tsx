import type { ReactNode } from "react";

export function PageFrame({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="dashboard-page">
      <div className="dashboard-page__head">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="dashboard-page__title">{title}</h2>
          <p className="dashboard-page__summary">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}
