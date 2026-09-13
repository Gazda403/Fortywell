import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fortywell-app.vercel.app';

  // Format blog article URLs with their respective published timestamps
  const blogUrls: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => {
    let lastMod = new Date();
    try {
      lastMod = new Date(post.publishedAt);
    } catch {
      lastMod = new Date('2026-09-05');
    }

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  return [
    // 1. Homepage (Top priority)
    {
      url: baseUrl,
      lastModified: new Date('2026-09-06'),
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [`${baseUrl}/0709.png`, `${baseUrl}/logo.png`],
    },
    // 2. Blog Journal Index
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date('2026-09-06'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // 3. Dynamic Journal Articles
    ...blogUrls,
    // 4. Trust & Legal Pages (Important for Google E-E-A-T)
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2026-09-06'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2026-09-06'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date('2026-09-06'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}

