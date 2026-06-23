export default function MissingPage() {
  return (
    <section className="section">
      <div className="card" style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="eyebrow">Missing</div>
        <h1 className="dashboard-page__title">Link not found</h1>
        <p className="dashboard-page__summary">
          The redirect route will eventually point here for inactive, expired, or unknown slugs.
        </p>
      </div>
    </section>
  );
}

