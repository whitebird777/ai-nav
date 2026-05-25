// 多语言 Sitemap — 为 zh/en 各生成完整 URL

import { getTools, getCategories } from '@/lib/tools'
import { routing } from '@/i18n/routing'

const BASE_URL = 'https://nav4i.com'

export default async function sitemap() {
  const [tools, categories] = await Promise.all([
    getTools(),
    getCategories(),
  ])

  const entries: Array<{
    url: string
    lastModified?: string | Date
    changeFrequency?: string
    priority?: number
    alternates?: { languages: Record<string, string> }
  }> = []

  for (const locale of routing.locales) {
    // 首页
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    })

    // 关于页
    entries.push({
      url: `${BASE_URL}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    })

    // 分类页
    for (const cat of categories) {
      entries.push({
        url: `${BASE_URL}/${locale}/category/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      })
    }

    // 工具详情页
    for (const tool of tools) {
      entries.push({
        url: `${BASE_URL}/${locale}/tool/${tool.slug}`,
        lastModified: tool.updated_at || tool.created_at,
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  return entries
}
