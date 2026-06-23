import { PublicPageFrame } from "@/components/public/page-frame";

export default function PrivacyPage() {
  return (
    <section className="section">
      <PublicPageFrame
        eyebrow="Privacy"
        title="Privacy policy placeholder"
        description="This page will later hold the final policy text. For now it keeps the route structure clean and buildable."
      >
        <div className="panel">Policy content will be added during the launch hardening phase.</div>
      </PublicPageFrame>
    </section>
  );
}

