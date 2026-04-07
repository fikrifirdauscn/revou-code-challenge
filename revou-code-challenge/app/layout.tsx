import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynamic Product Catalog",
  description: "Simple ecommerce catalog",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}