import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import Nav from "./components/Nav";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} bg-background text-foreground`}>
        <div className="page-shell" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
          <Nav />
          <main className="pt-20">{children}</main>
        </div>
      </body>
    </html>
  );
}
