import { PublicPageFrame } from "@/components/public/page-frame";

export default function TermsPage() {
  return (
    <section className="section">
      <PublicPageFrame
        eyebrow="Terms"
        title="Terms placeholder"
        description="The route exists now so the launch copy can be refined without changing the structure later."
      >
        <div className="panel">Terms content will be finalized before launch.</div>
      </PublicPageFrame>
    </section>
  );
}

