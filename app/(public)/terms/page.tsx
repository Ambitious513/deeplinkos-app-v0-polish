import type { Metadata } from "next";

import { LegalPageContent } from "@/components/company/LegalPageContent";
import { legalPages } from "@/content/company";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | DeepLinkOS" },
  description: "The DeepLinkOS draft terms for accounts, subscriptions, smart links, routing, acceptable use, and platform access.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPageContent page={legalPages.terms} titleId="terms-title" />;
}
