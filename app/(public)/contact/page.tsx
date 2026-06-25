import type { Metadata } from "next";

import { ContactPageContent } from "@/components/company/ContactPageContent";

export const metadata: Metadata = {
  title: { absolute: "Contact DeepLinkOS | Support, Partnerships & Product Questions" },
  description: "Contact DeepLinkOS for support, partnerships, affiliate inquiries, billing questions, and product help.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
