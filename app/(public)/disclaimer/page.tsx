import { PublicPageFrame } from "@/components/public/page-frame";

export default function DisclaimerPage() {
  return (
    <section className="section">
      <PublicPageFrame
        eyebrow="Disclaimer"
        title="Disclaimer placeholder"
        description="This route is reserved for the legal copy that will ship with the product."
      >
        <div className="panel">Disclaimer content will be added later.</div>
      </PublicPageFrame>
    </section>
  );
}

