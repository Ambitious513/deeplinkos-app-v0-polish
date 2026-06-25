import type { Metadata } from "next";
import type { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deeplinkos.com"),
  title: {
    default: "DeepLinkOS",
    template: "%s | DeepLinkOS",
  },
  description:
    "DeepLinkOS builds smart links, QR flows, and click analytics for modern app growth teams.",
};

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('dlos-theme');
    if (!theme) return;
    document.documentElement.setAttribute('data-theme', theme);
  } catch (error) {}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <NextTopLoader color="#ef7a22" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
