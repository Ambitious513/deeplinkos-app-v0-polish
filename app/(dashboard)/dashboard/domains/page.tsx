import { PageFrame } from "@/components/dashboard/page-frame";

export default function DomainsPage() {
  return (
    <PageFrame
      eyebrow="Features"
      title="Custom Domains"
      description="Active, pending, and failed domains will be listed here with DNS copy helpers."
    >
      <div className="panel">Domain management placeholder.</div>
    </PageFrame>
  );
}

