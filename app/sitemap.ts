import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://fortywell-app.vercel.app',
      lastModified: new Date('2026-09-04'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
