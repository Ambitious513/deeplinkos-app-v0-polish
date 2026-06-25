import type { Metadata } from "next";
import { PricingPageContent } from "@/components/pricing/PricingPageContent";

export const metadata: Metadata = {
  title: { absolute: "DeepLinkOS Pricing | Start Free With Smart Links & App Links" },
  description:
    "Compare DeepLinkOS pricing for free smart links, app-opening deep links, QR code links, attribution, and campaign routing for creators, stores, marketers, and agencies.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "DeepLinkOS Pricing",
    description:
      "Start free with smart links, app links, QR code links, and campaign routing built for high-intent clicks.",
    url: "https://deeplinkos.com/pricing",
  },
  twitter: {
    title: "DeepLinkOS Pricing",
    description:
      "Start free with smart links, app links, QR code links, and campaign routing built for high-intent clicks.",
  },
};

export default function PricingPage() {
  return <PricingPageContent />;
}
