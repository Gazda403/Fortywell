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
  metadataBase: new URL('https://fortywell.com'), // Replace with actual production URL when known
  title: "Fortywell — Cortisol-Conscious Wellness for Women Over 40",
  description:
    "A cortisol-conscious approach to lower-body fluid retention, heavy legs, and metabolic stress after 40. Join the Fortywell waitlist.",
  keywords: [
    // Core Niche
    "wellness for women over 40", "cortisol management", "fluid retention", "heavy legs", "perimenopause fitness", "metabolic stress",
    // Fitness & Movement
    "fitness after 40", "workouts for perimenopause", "low intensity workouts for women", "cortisol-conscious workouts", "somatic movement", "nervous system regulation fitness", "holistic fitness for women", "slow fitness movement", "menopause exercise plan", "midlife fitness journey", "gentle workouts for high cortisol", "restorative movement",
    // Hormones & Biology
    "hormone balancing workouts", "estrogen decline symptoms", "perimenopause weight gain", "high cortisol symptoms in women", "cortisol belly", "metabolism after 40", "hormonal health for women", "endocrine system support", "midlife metabolic shift", "adrenal fatigue recovery", "stress hormone reduction",
    // Fluid & Lymphatic
    "water weight solutions", "swollen legs relief", "lymphatic drainage techniques", "lower body fluid retention", "reduce water retention naturally", "aldosterone and fluid retention", "lymphatic health", "swollen ankles perimenopause", "puffy legs remedy",
    // General Wellness & Mindset
    "holistic wellness over 40", "mindful movement", "women's midlife wellness", "sustainable fitness habits", "wellness retreat for women", "mind-body connection", "stress relief exercises", "wellness coaching for women over 40", "healthspan optimization", "longevity for women",
    // Specific search queries
    "why are my legs heavy after working out", "how to lower cortisol naturally", "best workouts for high cortisol", "perimenopause fluid retention", "fitness programs for women over 40", "healing from HIIT burnout", "overtraining symptoms in women"
  ],
  authors: [{ name: "Fortywell" }],
  creator: "Fortywell",
  publisher: "Fortywell",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Fortywell — Cortisol-Conscious Wellness for Women Over 40",
    description:
      "A cortisol-conscious approach to lower-body fluid retention, heavy legs, and metabolic stress after 40.",
    url: '/',
    siteName: 'Fortywell',
    locale: 'en_US',
    type: "website",
    images: [
      {
        url: '/0709.png',
        width: 1200,
        height: 630,
        alt: 'Fortywell Wellness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Fortywell — Cortisol-Conscious Wellness for Women Over 40",
    description: "A cortisol-conscious approach to lower-body fluid retention, heavy legs, and metabolic stress after 40.",
    images: ['/0709.png'],
    creator: '@fortywell',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
    statusBarStyle: 'black-translucent',
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
