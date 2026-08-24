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

export const metadata: Metadata = {
  title: "Charles Nathaniel Togle",
  description: "Future Forward Deployed Engineer building practical software and systems with measurable impact.",
  icons: {
    icon: "/favicon.svg",
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
