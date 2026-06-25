import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="cta-banner">
          <div className="cta-icon" aria-hidden="true">
            <RocketIcon />
          </div>
          <h2>Stop sending every click to the same browser page</h2>
          <p>Create your first app-opening smart link free. No SDK, no attribution setup, no credit card.</p>
          <div className="cta-actions">
            <Link className="btn btn-primary" href="/signup">
              Create Free Account
            </Link>
            <Link className="btn btn-secondary" href="/pricing">
              See pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function RocketIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 4c2.4-.8 4.4-.6 6 .2.8 1.6 1 3.6.2 6L15 15l-6-6 5-5Z" />
      <path d="m9 15-4 4 4-1 1 4 4-4" />
      <path d="M14 4 7 3 4 8l5 1" />
      <path d="m15 15 1 5 5-3-1-7" />
      <circle cx="16" cy="8" r="1.5" />
    </svg>
  );
}
