// robots.txt — Next.js file convention
// 允许所有爬虫，指向 sitemap

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://ai-navd.vercel.app/sitemap.xml',
  }
}
