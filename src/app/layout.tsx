import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

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
      <body
        className="min-h-full"
        style={{ backgroundColor: 'var(--background)', color: 'var(--on-surface)' }}
      >
        <Header />
        <Sidebar />
        {/* Main content — offset for header (40px) + sidebar (40px icon + 220px explorer = 260px) */}
        <main style={{ paddingTop: '40px', paddingLeft: '260px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
