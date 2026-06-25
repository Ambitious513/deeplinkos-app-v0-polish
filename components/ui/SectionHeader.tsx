type SectionHeaderProps = {
  kicker: string;
  title: string;
  children: React.ReactNode;
  centered?: boolean;
};

export function SectionHeader({ kicker, title, children, centered }: SectionHeaderProps) {
  return (
    <div className={centered ? "section-header section-header--center" : "section-header"}>
      <div className="section-tag">{kicker}</div>
      <h2 className="section-title">{title}</h2>
      <p className="section-sub">{children}</p>
    </div>
  );
}
