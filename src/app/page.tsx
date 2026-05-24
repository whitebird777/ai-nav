// 首页 — Server Component
// 职责：从 Supabase 获取数据，传递给客户端交互组件
// SEO：generateMetadata + SSR 数据渲染

import type { Metadata } from 'next'
import { getTools, getCategories } from '@/lib/tools'
import HomeContent from '@/components/HomeContent'

export const metadata: Metadata = {
  title: 'AI Nav — 发现最好用的 AI 工具',
  description:
    '汇集最实用的 AI 工具，帮你发现 ChatGPT、Midjourney、Cursor 等好用的 AI 产品。',
  openGraph: {
    title: 'AI Nav — 发现最好用的 AI 工具',
    description:
      '汇集最实用的 AI 工具，帮你发现 ChatGPT、Midjourney、Cursor 等好用的 AI 产品。',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AI Nav — 发现最好用的 AI 工具',
    description:
      '汇集最实用的 AI 工具，帮你发现 ChatGPT、Midjourney、Cursor 等好用的 AI 产品。',
  },
}

export default async function HomePage() {
  const [tools, categories] = await Promise.all([
    getTools(),
    getCategories(),
  ])

  return <HomeContent tools={tools} categories={categories} />
}
