import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display, Instrument_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import MetaPixel from "@/components/MetaPixel";
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

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",  // keeping same CSS var so no other files need changing
  display: "swap",
});

// ─── Viewport & Metadata ─────────────────────────────────────────────────────

export const viewport: Viewport = {
  themeColor: '#3A3532',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://fortywell-app.vercel.app'),
  title: "FortyWell — Cortisol-Conscious Fitness & Hormone Wellness for Women Over 40",
  description:
    "A science-backed, cortisol-conscious movement program for women over 40. Relieve lower-body fluid retention, heavy legs, and metabolic stress with joint-safe somatic strength and hormone rhythm adaptation.",
  keywords: [
    // 1. Core Demographic & Brand
    "FortyWell", "wellness for women over 40", "fitness after 40", "women over 40 workout plan", "midlife women fitness", "healthy aging for women", "longevity for women", "female healthspan optimization",
    
    // 2. Cortisol, Stress & Adrenal Health
    "cortisol management for women", "cortisol belly reduction", "lower cortisol naturally", "adrenal fatigue workouts", "nervous system regulation exercises", "vagus nerve stimulation movement", "stress hormone balance", "overtraining syndrome perimenopause", "HIIT burnout recovery", "gentle movement for high cortisol",
    
    // 3. Fluid Retention, Heavy Legs & Lymphatics
    "heavy legs after 40", "lower body fluid retention", "swollen ankles perimenopause", "puffy legs remedy", "lymphatic drainage exercises", "aldosterone fluid retention", "water weight relief perimenopause", "interstitial fluid clearance", "restorative legs up the wall inversions", "swollen feet perimenopause",
    
    // 4. Perimenopause & Menopause Physiology
    "perimenopause workouts", "menopause fitness plan", "estrogen decline symptoms", "hormone balancing workouts", "perimenopause weight gain solutions", "post-menopause strength training", "endocrine support movement", "hot flashes exercise relief", "menopause sleep quality workouts",
    
    // 5. Joint Longevity, Bones & Pelvic Floor
    "joint safe workouts for women", "knee safe exercises", "pelvic floor strengthening after 40", "diastasis recti safe core", "osteopenia exercise plan", "bone density strength training", "spine decompression routine", "morning joint stiffness relief", "low impact strength training",
    
    // 6. Somatic Movement & Low-Intensity Protocols
    "somatic movement for women", "somatic exercises for stress release", "low intensity steady state cardio for women", "zone 2 cardio over 40", "15 minute gentle home workouts", "zero equipment joint mobility", "parasympathetic nervous system workouts", "slow fitness movement",
    
    // 7. Cycle Syncing & Phase Adaptation
    "cycle syncing after 40", "perimenopause cycle syncing", "follicular phase strength training", "luteal phase restorative movement", "ovulatory phase workout pacing", "menstrual cycle fitness adaptation",
    
    // 8. Long-Tail Search Queries (Direct User Intent)
    "why are my legs heavy and swollen after working out", "how to lower cortisol to lose belly fat women", "best workout routine for perimenopause exhaustion", "how to exercise with joint pain after 40", "gentle workouts for hormonal imbalance", "home workout plan for women over 40"
  ],
  authors: [{ name: "FortyWell Editorial & Clinical Advisory" }],
  creator: "FortyWell",
  publisher: "FortyWell",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://fortywell-app.vercel.app',
  },
  openGraph: {
    title: "FortyWell — Cortisol-Conscious Fitness & Hormone Wellness for Women Over 40",
    description:
      "A science-backed, cortisol-conscious movement program for women over 40. Relieve lower-body fluid retention, heavy legs, and metabolic stress.",
    url: 'https://fortywell-app.vercel.app',
    siteName: 'FortyWell',
    locale: 'en_US',
    type: "website",
    images: [
      {
        url: 'https://fortywell-app.vercel.app/0709.png',
        width: 1200,
        height: 630,
        alt: 'FortyWell: Cortisol-Conscious Fitness & Hormone Wellness Program for Women Over 40',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "FortyWell — Cortisol-Conscious Fitness & Hormone Wellness for Women Over 40",
    description: "A science-backed, cortisol-conscious movement program for women over 40. Relieve lower-body fluid retention, heavy legs, and metabolic stress.",
    images: ['https://fortywell-app.vercel.app/0709.png'],
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
    title: 'FortyWell',
    statusBarStyle: 'black-translucent',
  },
  verification: {
    google: 'WRYSzuwisnZSz8EG0lIXJRr7vct0bKbcHYiV1yzFjNA',
    other: {
      'p:domain_verify': '6b263a6919eec1afe84d8d1c457c4663',
    },
  },
};

// ─── JSON-LD Structured Data Schema (@graph) ─────────────────────────────────

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // ── Organization ─────────────────────────────────────────────────────
    {
      "@type": "Organization",
      "@id": "https://fortywell-app.vercel.app/#organization",
      "name": "FortyWell",
      "legalName": "FortyWell Wellness Technologies",
      "url": "https://fortywell-app.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://fortywell-app.vercel.app/#logo",
        "url": "https://fortywell-app.vercel.app/logo.png",
        "contentUrl": "https://fortywell-app.vercel.app/logo.png",
        "caption": "FortyWell Logo",
        "width": 512,
        "height": 512
      },
      "image": {
        "@id": "https://fortywell-app.vercel.app/#logo"
      },
      "description": "Evidence-based, cortisol-conscious movement, lymphatic fluid drainage, and hormone health protocols designed exclusively for women over 40.",
      "slogan": "Calibrate your movement to your hormonal rhythm",
      "foundingDate": "2026",
      "knowsAbout": [
        "Perimenopause fitness",
        "Cortisol regulation",
        "Lymphatic fluid kinetics",
        "Lower-body fluid retention",
        "Somatic movement for women",
        "Joint-safe strength training",
        "Adrenal fatigue recovery"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "support@fortywell.com",
        "availableLanguage": ["English"]
      },
      "sameAs": [
        "https://www.instagram.com/fortywell",
        "https://twitter.com/fortywell"
      ]
    },
    // ── WebSite with SearchAction ─────────────────────────────────────────
    {
      "@type": "WebSite",
      "@id": "https://fortywell-app.vercel.app/#website",
      "url": "https://fortywell-app.vercel.app",
      "name": "FortyWell",
      "publisher": { "@id": "https://fortywell-app.vercel.app/#organization" },
      "inLanguage": "en-US",
      "description": "Cortisol-conscious wellness, somatic strength, and lower-body fluid retention solutions for women 40+.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://fortywell-app.vercel.app/blog?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    // ── SoftwareApplication (Mobile App) ─────────────────────────────────
    {
      "@type": "MobileApplication",
      "@id": "https://fortywell-app.vercel.app/#application",
      "name": "FortyWell",
      "applicationCategory": "HealthApplication",
      "applicationSubCategory": "FitnessApplication",
      "operatingSystem": "iOS, Android, Web",
      "description": "Personalized somatic workouts, hormone cycle tracking, and AI coaching for women navigating perimenopause and menopause. Features cycle syncing, cortisol pacing, joint-safe strength protocols, and lymphatic drainage routines.",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free 7-Day Trial & Cortisol Assessment Quiz",
        "availability": "https://schema.org/InStock"
      },
      "author": { "@id": "https://fortywell-app.vercel.app/#organization" },
      "url": "https://fortywell-app.vercel.app"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${instrumentSans.variable}`}
    >
      <head>
        {/* Google Site Verification (Google Merchant Center & Search Console) */}
        <meta name="google-site-verification" content="WRYSzuwisnZSz8EG0lIXJRr7vct0bKbcHYiV1yzFjNA" />
        {/* Pinterest Domain Verification */}
        <meta name="p:domain_verify" content="6b263a6919eec1afe84d8d1c457c4663" />
        {/* Preconnect to external origins to eliminate render-blocking latency */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        {/* Structured data: @graph with all entities */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        {/* Meta Pixel */}
        <MetaPixel />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1114440488197815&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="grain">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
