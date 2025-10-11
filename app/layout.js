import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Pelican - AI Trading Assistant',
  description: 'An AI agent that understands markets, writes strategies, and analyzes data. Build and deploy trading systems through conversation.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Pelican - AI Trading Assistant',
    description: 'Build and deploy trading systems through conversation',
    url: 'https://pelicantrading.ai',
    siteName: 'Pelican',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pelican - AI Trading Assistant',
    description: 'Build and deploy trading systems through conversation',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
