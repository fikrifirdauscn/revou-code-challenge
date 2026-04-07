import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Catalog Challenge',
  description: 'Dynamic catalog with cascading filters using Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}