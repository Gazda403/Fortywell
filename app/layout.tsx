import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Instrument_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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

// ─── Metadata ────────────────────────────────────────────────────────────────

// ─── Metadata ────────────────────────────────────────────────────────────────

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
    canonical: '/',
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
        url: '/0709.png',
        width: 1200,
        height: 630,
        alt: 'FortyWell - Cortisol-Conscious Wellness for Women Over 40',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "FortyWell — Cortisol-Conscious Fitness & Hormone Wellness for Women Over 40",
    description: "A science-backed, cortisol-conscious movement program for women over 40. Relieve lower-body fluid retention, heavy legs, and metabolic stress.",
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
    title: 'FortyWell',
    statusBarStyle: 'black-translucent',
  },
};

// ─── JSON-LD Structured Data Schema (@graph) ─────────────────────────────────

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://fortywell-app.vercel.app/#organization",
      "name": "FortyWell",
      "url": "https://fortywell-app.vercel.app",
      "logo": "https://fortywell-app.vercel.app/logo.png",
      "description": "Evidence-based, cortisol-conscious fitness, lymphatic fluid drainage, and hormone health protocols designed specifically for women over 40.",
      "slogan": "Calibrate your movement to your hormonal rhythm",
      "sameAs": [
        "https://www.instagram.com/fortywell",
        "https://twitter.com/fortywell"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://fortywell-app.vercel.app/#website",
      "url": "https://fortywell-app.vercel.app",
      "name": "FortyWell",
      "publisher": { "@id": "https://fortywell-app.vercel.app/#organization" },
      "inLanguage": "en-US",
      "description": "Cortisol-conscious wellness, somatic strength, and lower-body fluid retention solutions for women 40+."
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://fortywell-app.vercel.app/#application",
      "name": "FortyWell",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "iOS, Android, Web",
      "description": "Personalized somatic workouts, hormone cycle tracking, and AI coaching for women navigating perimenopause and menopause.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free 7-Day Trial & Quiz Assessment"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://fortywell-app.vercel.app/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why do women over 40 experience lower-body fluid retention and heavy legs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "After 40, fluctuating estrogen levels and elevated baseline cortisol disrupt aldosterone regulation—the hormone that balances fluid retention and sodium. When physical or emotional stress spikes, interstitial fluid accumulates in the calves, ankles, and thighs, creating a sensation of heavy, exhausted legs. FortyWell utilizes somatic inversions and rhythmic skeletal muscle pumps to accelerate lymphatic drainage and clear trapped fluid without triggering inflammatory stress."
          }
        },
        {
          "@type": "Question",
          "name": "What is a cortisol-conscious workout and how does it differ from traditional HIIT?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Traditional high-intensity interval training (HIIT) can trigger massive cortisol spikes in perimenopausal and menopausal women, leading to adrenal fatigue, stubborn belly fat retention, and joint inflammation. A cortisol-conscious workout prioritizes parasympathetic nervous system safety, tempo-controlled isometric holds, and restorative pacing. It builds lean muscle and bone density while keeping your body in an optimal fat-burning, low-inflammation metabolic state."
          }
        },
        {
          "@type": "Question",
          "name": "How does FortyWell protect joints, knees, and pelvic floor health during perimenopause?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Declining estrogen reduces collagen synthesis and synovial joint lubrication, making standard jumping and heavy impact risky for knees, lower back, and pelvic floor integrity. FortyWell exercises are 100% low-impact, joint-calibrated protocols focusing on deep core bracing, glute ignition, and segmental spinal mobility to preserve joint longevity and prevent injury."
          }
        },
        {
          "@type": "Question",
          "name": "How does hormonal stage and cycle tracking adapt my daily workouts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your physical capacity naturally shifts across follicular, ovulatory, and luteal phases. FortyWell dynamically adjusts exercise intensity, volume, and recovery recommendations based on your reported energy, sleep quality, and cycle phase. When estrogen peaks, we introduce strength stimulus; when progesterone rises or fatigue appears, we shift seamlessly to restorative wind-down protocols."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly will I feel relief from sluggishness and lower-body puffiness?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most women report a noticeable reduction in evening leg heaviness and puffiness within the first 7 to 10 days of consistent 15-minute daily resets. Improved morning joint fluidity, deeper sleep quality, and calmer daytime energy typically consolidate over 3 to 4 weeks of cortisol-calibrated movement."
          }
        }
      ]
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="grain">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
