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
const siteTitle = `${siteName} | Full-Stack Engineer`;
const siteDescription =
  "Charles Togle is a full-stack engineer graduating in Computer Science from the University of Makati in May 2027. Explore the systems he has shipped, from web apps to home servers.";
const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Charles Togle portfolio: I build the systems behind the software.",
};
const email = findContact("EMAIL")?.href;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  keywords: [
    "Charles Togle",
    "Charles Nathaniel Togle",
    "full-stack engineer",
    "software engineer portfolio",
    "University of Makati",
    "Philippines",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/profile-favicon-photo.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName,
    locale: "en_US",
    type: "profile",
    firstName: "Charles Nathaniel",
    lastName: "Togle",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  jobTitle: "Full-Stack Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Makati",
  },
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
