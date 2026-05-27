// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LitVM Dex',
  description: 'The central trading and liquidity hub on Avalanche',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-[#0a1428] text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
