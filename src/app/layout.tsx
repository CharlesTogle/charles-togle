import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Charles Nathaniel Togle — Forward Deployed Engineer",
  description: "Full-stack engineer • Systems • Real-world impact",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#181021] text-[#ecddf6]">
        {children}
      </body>
    </html>
  );
}
