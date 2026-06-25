export type LegalSection = {
  heading: string;
  body: string;
  link?: {
    label: string;
    href: string;
  };
};

export type LegalPage = {
  kicker: string;
  title: string;
  description: string;
  note: string;
  sections: LegalSection[];
};

export const companyMeta = {
  updated: "Last updated: June 12, 2026",
  review: "Draft for legal review",
};

export const contactPaths = [
  {
    title: "Support",
    body: "For account, link routing, analytics, QR code, or billing questions.",
    email: "hello@deeplinkos.com",
  },
  {
    title: "Partnerships",
    body: "For affiliate programs, sponsored tool placements, and partner campaigns.",
  },
  {
    title: "Product questions",
    body: "For creators, stores, marketers, and agencies comparing smart link workflows.",
  },
  {
    title: "Responsible disclosure",
    body: "For security concerns or suspected abuse, include steps to reproduce and relevant URLs.",
  },
];

export const legalPages = {
  privacy: {
    kicker: "Privacy Policy",
    title: "How we handle data",
    description:
      "This draft explains how DeepLinkOS may collect, use, protect, and share information when people use the site, accounts, smart links, blog, tools directory, and related services.",
    note: "This policy is a production-style draft for review. It should be reviewed by qualified counsel before the site is launched commercially.",
    sections: [
      {
        heading: "Information we collect",
        body: "We may collect account details such as name, email address, password credentials, workspace information, billing status, and support messages. When you create or use links, we may collect destination URLs, short link settings, QR code settings, campaign tags, routing rules, referrers, device type, browser type, approximate location, and click timestamps.",
      },
      {
        heading: "How we use information",
        body: "We use information to provide smart links, app-opening routes, analytics, fraud prevention, customer support, product improvement, billing, security monitoring, and communications about product updates. We also use aggregated or de-identified data to understand how campaigns perform and how our product can improve.",
      },
      {
        heading: "Cookies, analytics, and marketing",
        body: "DeepLinkOS may use cookies, local storage, analytics pixels, and similar technologies to keep users signed in, measure site performance, understand traffic sources, and improve marketing campaigns. Newsletter and lifecycle messages may be sent to people who opt in or create an account, with unsubscribe options where required.",
      },
      {
        heading: "Payments and service providers",
        body: "Payment information is processed by third-party payment providers. We do not intend to store full payment card numbers on DeepLinkOS servers. We may share limited information with vendors who help us provide hosting, analytics, email, support, payment, security, and operational services.",
      },
      {
        heading: "Affiliate links and external sites",
        body: "The blog and tools directory may include affiliate or partner links. If you click an external link, the destination site may collect information under its own privacy policy. We are not responsible for the privacy practices of third-party sites or products.",
      },
      {
        heading: "Your choices and rights",
        body: "You may request access, correction, deletion, or export of personal information where applicable law provides those rights. You may also unsubscribe from marketing emails. To make a request, contact ",
        link: { label: "hello@deeplinkos.com", href: "mailto:hello@deeplinkos.com" },
      },
      {
        heading: "Retention and security",
        body: "We retain information for as long as needed to provide the service, meet legal obligations, resolve disputes, prevent abuse, and maintain business records. We use reasonable technical and organizational measures to protect data, but no method of transmission or storage is completely secure.",
      },
    ],
  },
  terms: {
    kicker: "Terms of Service",
    title: "Rules for using DeepLinkOS",
    description:
      "These draft terms describe the basic rules for accounts, links, subscriptions, acceptable use, third-party services, and platform access.",
    note: "These terms are a production-style draft for review. They should be reviewed by qualified counsel before launch.",
    sections: [
      {
        heading: "Using the service",
        body: "DeepLinkOS provides smart links, deep link routing, QR code links, analytics, and related growth tools. You are responsible for the links, destinations, campaigns, content, and account activity you create through the service.",
      },
      {
        heading: "Accounts and security",
        body: "You must provide accurate account information and keep login credentials secure. You are responsible for activity under your account. If you suspect unauthorized access, contact us promptly at ",
        link: { label: "hello@deeplinkos.com", href: "mailto:hello@deeplinkos.com" },
      },
      {
        heading: "Acceptable use",
        body: "You may not use DeepLinkOS for spam, phishing, malware, deceptive redirects, unlawful content, privacy violations, harassment, platform abuse, or attempts to bypass security controls. We may suspend links or accounts that create risk for users, partners, or the platform.",
      },
      {
        heading: "Subscriptions and billing",
        body: "Paid plans may renew automatically unless canceled before the renewal date. Prices, limits, and plan features may change with reasonable notice. Taxes, fees, refunds, and billing disputes may be handled through our payment provider and applicable plan terms.",
      },
      {
        heading: "Generated links and routing",
        body: "DeepLinkOS helps route clicks to apps, stores, web pages, and fallback destinations. Routing behavior may depend on device settings, browser restrictions, operating system changes, app availability, destination platform rules, and third-party service behavior.",
      },
      {
        heading: "Availability and changes",
        body: "We aim to keep the service reliable, but we do not guarantee uninterrupted availability. We may update, modify, suspend, or discontinue parts of the service as the product evolves or as required for security, legal, or operational reasons.",
      },
      {
        heading: "Third-party services and limitations",
        body: "DeepLinkOS may integrate with or link to third-party platforms. We do not control those services and are not responsible for their availability, policies, pricing, or behavior. To the extent permitted by law, DeepLinkOS is provided without warranties and our liability is limited.",
      },
      {
        heading: "Termination",
        body: "You may stop using the service at any time. We may suspend or terminate access if an account violates these terms, creates security risk, causes operational harm, or is required by law.",
      },
    ],
  },
  disclaimer: {
    kicker: "Disclaimer",
    title: "Clear context for recommendations",
    description:
      "This draft explains how to read DeepLinkOS content, tool recommendations, affiliate mentions, and growth advice.",
    note: "This disclaimer is a production-style draft for review. It should be reviewed by qualified counsel before launch.",
    sections: [
      {
        heading: "Educational content",
        body: "DeepLinkOS blog posts, tools directory entries, examples, templates, and playbooks are provided for general educational and informational purposes. They are not legal, financial, tax, technical, or professional advice for your specific situation.",
      },
      {
        heading: "No guaranteed results",
        body: "Growth outcomes depend on your audience, offer, creative, timing, platform rules, tracking setup, product quality, budget, and many other factors. We do not guarantee app opens, conversions, rankings, revenue, or campaign performance.",
      },
      {
        heading: "Affiliate and partner links",
        body: "Some links on DeepLinkOS may be affiliate, referral, sponsored, or partner links. We may earn compensation if you click or purchase through those links. We aim to keep recommendations useful and relevant to creators, stores, marketers, and agencies.",
      },
      {
        heading: "Editorial independence",
        body: "Partner relationships may influence which tools we can review or feature, but they should not require us to publish claims we do not believe are useful or accurate. We may update, remove, or change recommendations as products evolve.",
      },
      {
        heading: "Tool information can change",
        body: "Third-party tool pricing, features, availability, free plans, trial terms, integrations, and policies may change without notice. Always verify current details on the official product website before buying, subscribing, or relying on a tool.",
      },
      {
        heading: "External links",
        body: "DeepLinkOS may link to external websites and products. We do not control third-party content, security, availability, policies, or business practices. Visiting external sites is at your own discretion.",
      },
    ],
  },
} satisfies Record<string, LegalPage>;
