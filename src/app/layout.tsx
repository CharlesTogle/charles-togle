import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import { Suspense } from "react";
import Nav from "./components/Nav";
import VisitCount, { VisitCountLoading } from "./components/VisitCount";
import { contactItems } from "./data/about";
import { siteUrl } from "./helpers/siteUrl";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: "Charles Nathaniel Togle",
  description: "Software and Systems Engineer building full-stack software, infrastructure, and practical systems with measurable impact.",
  icons: {
    icon: [{ url: "/profile-favicon-photo.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Charles Nathaniel Togle",
    description: "Software and Systems Engineer building full-stack software, infrastructure, and practical systems with measurable impact.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1718,
        height: 806,
        alt: "Charles Nathaniel Togle portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Charles Nathaniel Togle",
    description: "Software and Systems Engineer building full-stack software, infrastructure, and practical systems with measurable impact.",
    images: ["/og-image.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Charles Nathaniel Togle",
  jobTitle: "Software and Systems Engineer",
  description: "Software and Systems Engineer building full-stack software, infrastructure, and practical systems with measurable impact.",
  url: siteUrl,
  image: `${siteUrl}/profile.png`,
  email: "mailto:charles3togle@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pasay City",
    addressCountry: "PH",
  },
  sameAs: contactItems
    .map((item) => item.href)
    .filter((href): href is string => href?.startsWith("https://") ?? false),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} bg-background text-foreground`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <div className="page-shell" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
          <Nav visitCount={<Suspense fallback={<VisitCountLoading />}><VisitCount /></Suspense>} />
          <main className="pt-20">{children}</main>
          <Analytics />
        </div>
      </body>
    </html>
  );
}
