const stats = [
  ["8+", "Supported Platforms"],
  ["<60s", "Link Setup Time"],
  ["100%", "Free To Start"],
  ["0", "SDK Required"],
];

export function StatsBanner() {
  return (
    <section className="stats-banner" aria-label="DeepLinkOS quick stats">
      <div className="stats-banner-inner">
        {stats.map(([value, label]) => (
          <div className="stat-item" key={label}>
            <div className="stat-val">{value}</div>
            <div className="stat-lbl">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
