import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "Charles Nathaniel Togle",
  description: "Full-stack engineer • Systems • Real-world impact",
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
    <html lang="en" className="h-full antialiased">
      <body
        className="min-h-full"
        style={{ backgroundColor: 'var(--background)', color: 'var(--on-surface)' }}
      >
        <Header />
        <Sidebar />
        <main className="app-main">
          {children}
        </main>
      </body>
    </html>
  );
}
