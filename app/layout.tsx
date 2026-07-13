import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// ─── Font definitions ────────────────────────────────────────────────────────

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Fortywell — Cortisol-Conscious Wellness for Women Over 40",
  description:
    "A cortisol-conscious approach to lower-body fluid retention, heavy legs, and metabolic stress after 40. Join the Fortywell waitlist.",
  openGraph: {
    title: "Fortywell — Cortisol-Conscious Wellness for Women Over 40",
    description:
      "A cortisol-conscious approach to lower-body fluid retention, heavy legs, and metabolic stress after 40.",
    type: "website",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Fortywell',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${inter.variable}`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
