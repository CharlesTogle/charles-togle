import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "Charles Nathaniel Togle",
  description: "Full-stack engineer • Systems • Real-world impact",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23110f1a'/><text x='16' y='22' font-family='monospace' font-size='14' font-weight='bold' fill='%239333ea' text-anchor='middle'>CT</text></svg>",
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
        {/* Main content — offset for header (40px) + sidebar (40px icon + 220px explorer = 260px) */}
        <main style={{ paddingTop: '40px', paddingLeft: '260px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
