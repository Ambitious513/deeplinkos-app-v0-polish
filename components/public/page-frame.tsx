import type { ReactNode } from "react";

export function PublicPageFrame({
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
    <>
      <section className="public-hero">
        <div className="public-hero__grid">
          <div>
            <div className="public-hero__eyebrow">{eyebrow}</div>
            <h1 className="public-hero__title">{title}</h1>
            <p className="public-hero__lead">{description}</p>
          </div>
          <div className="public-hero__panel">{children}</div>
        </div>
      </section>
    </>
  );
}
