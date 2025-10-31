app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyCryptoCap",
  description: "Kripto Piyasa Takipçisi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-gray-900 text-white min-h-screen">{children}</body>
    </html>
  );
}
