import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // ── Image Optimization ────────────────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // ── Turbopack root ────────────────────────────────────────────────────────
  turbopack: {
    root: path.resolve(__dirname),
  },

  // ── Compression ───────────────────────────────────────────────────────────
  compress: true,

  // ── HTTP Headers: Security + Cache-Control ────────────────────────────────
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Cache immutable static assets (JS/CSS chunks) for 1 year
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache public images aggressively
        source: '/(.*\\.(?:png|jpg|jpeg|gif|ico|svg|webp|avif|mp4|woff2?))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },

  // ── Experimental perf flags ───────────────────────────────────────────────
  experimental: {
    optimizeCss: false, // keep false for Tailwind v4 compat
  },
};

export default nextConfig;
