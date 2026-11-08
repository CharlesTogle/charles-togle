import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import Nav from "./components/Nav";
import { contactItems, findContact } from "./data/about";
import { siteUrl } from "./helpers/siteUrl";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const siteName = "Charles Nathaniel Togle";
const siteDescription = "Software and Systems Engineer building full-stack software, infrastructure, and practical systems with measurable impact.";
const email = findContact("EMAIL")?.href;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: siteName,
  description: siteDescription,
  icons: {
    icon: [{ url: "/profile-favicon-photo.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
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
    title: siteName,
    description: siteDescription,
    images: ["/og-image.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  jobTitle: "Software and Systems Engineer",
  description: siteDescription,
  url: siteUrl,
  image: `${siteUrl}/profile.png`,
  email,
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
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Nav />
        {/* Clipped so content falling into the black hole can never grow the page */}
        <main className="overflow-clip">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
