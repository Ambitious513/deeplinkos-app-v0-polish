import type { Metadata } from "next";

import { LegalPageContent } from "@/components/company/LegalPageContent";
import { legalPages } from "@/content/company";

export const metadata: Metadata = {
  title: { absolute: "Disclaimer | DeepLinkOS" },
  description: "DeepLinkOS disclosure for affiliate links, recommendations, educational content, external links, and growth results.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return <LegalPageContent page={legalPages.disclaimer} titleId="disclaimer-title" />;
}
