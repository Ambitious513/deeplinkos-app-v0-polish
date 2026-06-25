import type { Metadata } from "next";

import { LegalPageContent } from "@/components/company/LegalPageContent";
import { legalPages } from "@/content/company";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | DeepLinkOS" },
  description: "How DeepLinkOS handles account data, smart link analytics, cookies, payments, affiliates, and user rights.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPageContent page={legalPages.privacy} titleId="privacy-title" />;
}
