export type PricingPlan = {
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  suffix: string;
  description: string;
  cta: string;
  highlighted?: boolean;
  badge?: string;
  features: Array<{ label: string; highlighted?: boolean }>;
};

export type ComparisonGroup = {
  title: string;
  rows: Array<{
    feature: string;
    free: string | boolean;
    pro: string | boolean;
    growth: string | boolean;
  }>;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Indie / Free",
    monthlyPrice: "$0",
    annualPrice: "$0",
    suffix: "/mo",
    description: "The perfect start to see how smart links increase your conversions.",
    cta: "Start for free",
    features: [
      { label: "10,000 Lifetime Clicks", highlighted: true },
      { label: "Natively opens iOS & Android apps" },
      { label: "8+ platform auto-detection" },
      { label: "30-day analytics history" },
      { label: "Standard dlnk.os domain" },
      { label: "Dynamic QR code generator" },
      { label: "PII-free privacy protection" },
    ],
  },
  {
    name: "Pro",
    monthlyPrice: "$14.99",
    annualPrice: "$12",
    suffix: "/mo",
    description: "For creators and sellers who need predictable routing and custom branding.",
    cta: "Get Pro",
    highlighted: true,
    badge: "Best Deal",
    features: [
      { label: "Unlimited Clicks", highlighted: true },
      { label: "Custom Branded Domains", highlighted: true },
      { label: "Remove DeepLinkOS branding" },
      { label: "1-year analytics history" },
      { label: "Bot filtering & click fraud prevention" },
      { label: "UTM campaign builder & tagging" },
      { label: "Custom fallback URLs" },
      { label: "Password-protected links" },
      { label: "Priority support" },
    ],
  },
  {
    name: "Growth",
    monthlyPrice: "$59",
    annualPrice: "$49",
    suffix: "/mo",
    description: "For teams and agencies running large-scale campaigns across multiple clients.",
    cta: "Start Growth Trial",
    features: [
      { label: "Everything in Pro" },
      { label: "Deep Attribution Tracking", highlighted: true },
      { label: "Multiple branded domains" },
      { label: "API Access & Webhooks" },
      { label: "5 Team Seats included" },
      { label: "Unlimited analytics history" },
      { label: "Dedicated growth advisor" },
    ],
  },
];

export const comparisonGroups: ComparisonGroup[] = [
  {
    title: "Core Routing & Links",
    rows: [
      { feature: "10,000 lifetime clicks included", free: true, pro: true, growth: true },
      { feature: "Unlimited clicks after free tier", free: false, pro: true, growth: true },
      { feature: "Deep link into iOS & Android apps natively", free: true, pro: true, growth: true },
      { feature: "8+ platform auto-detection", free: true, pro: true, growth: true },
      { feature: "Safe web fallback when app is not installed", free: true, pro: true, growth: true },
      { feature: "Custom fallback URLs & App Store routing", free: false, pro: true, growth: true },
      { feature: "Link expiry & scheduling", free: false, pro: true, growth: true },
      { feature: "Password-protected links", free: false, pro: true, growth: true },
    ],
  },
  {
    title: "Brand & Customization",
    rows: [
      { feature: "Standard shortlink (dlnk.os)", free: true, pro: true, growth: true },
      { feature: "Dynamic QR Code Generator", free: true, pro: true, growth: true },
      { feature: "Remove DeepLinkOS branding", free: false, pro: true, growth: true },
      { feature: "Custom branded domain (yourbrand.com)", free: false, pro: true, growth: true },
      { feature: "Multiple branded domains", free: false, pro: false, growth: true },
    ],
  },
  {
    title: "Analytics, Privacy & Security",
    rows: [
      { feature: "PII-free privacy protection", free: true, pro: true, growth: true },
      { feature: "Click analytics & referrer tracking", free: "30 Days", pro: "1 Year", growth: "Unlimited" },
      { feature: "Bot filtering & click fraud prevention", free: false, pro: true, growth: true },
      { feature: "UTM campaign builder & tagging", free: false, pro: true, growth: true },
      { feature: "Deep attribution (install tracking)", free: false, pro: false, growth: true },
    ],
  },
  {
    title: "Support & Scale",
    rows: [
      { feature: "Community support", free: true, pro: true, growth: true },
      { feature: "Priority email support", free: false, pro: true, growth: true },
      { feature: "API access & webhooks", free: false, pro: false, growth: true },
      { feature: "Team seats", free: "1", pro: "1", growth: "5 Included" },
      { feature: "Dedicated growth advisor", free: false, pro: false, growth: true },
    ],
  },
];

export const pricingFaqs = [
  {
    question: "What happens when I hit my 10,000 free clicks?",
    answer:
      "Unlike competitors, we will never break your active links if a post goes viral. Once you hit the 10,000 lifetime click limit, your links will continue to safely route users, but your analytics dashboard will lock until you upgrade to Pro.",
  },
  {
    question: "Do I need a credit card for the free tier?",
    answer:
      "No. You can sign up, create links, and route up to 10,000 clicks completely free without entering a credit card.",
  },
  {
    question: 'What does "Unlimited Clicks" on Pro actually mean?',
    answer:
      "We do not charge per click like URLGenius. Your Pro subscription covers unlimited standard usage, subject to a 2 million clicks per month fair-use limit to prevent enterprise API abuse at consumer pricing.",
  },
  {
    question: "Can I connect my own domain name?",
    answer:
      "Yes. The Pro tier includes one custom domain. Instead of dlnk.os/r/... you can use link.yourbrand.com/... to maximize trust and click-through rates.",
  },
  {
    question: "Can I switch between monthly and annual billing?",
    answer:
      "Absolutely. You can switch at any time from your account settings. Switching to annual applies the 20% discount immediately on your next billing cycle.",
  },
];
