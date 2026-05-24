// 分类页 — Server Component
// 展示该分类下所有工具

import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTools, getCategories, getCategorySlugs } from '@/lib/tools'
import Container from '@/components/Container'
import ToolCard from '@/components/ToolCard'
import { ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  const slugs = await getCategorySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find((c) => c.slug === slug)

  if (!category) return { title: '分类未找到' }

  return {
    title: `${category.name} — AI 工具`,
    description: `发现最好的${category.name}类 AI 工具`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [tools, categories] = await Promise.all([
    getTools({ category: slug }),
    getCategories(),
  ])

  const category = categories.find((c) => c.slug === slug)
  if (!category) notFound()

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* 返回链接 */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 no-underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ArrowLeft size={16} />
          返回首页
        </Link>

        {/* 分类标题 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            {category.icon && <span className="mr-2">{category.icon}</span>}
            {category.name}
          </h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            共 {tools.length} 个工具
          </p>
        </div>

        {/* 工具列表 */}
        {tools.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-zinc-400 dark:text-zinc-500">
              该分类下暂无工具
            </p>
          </div>
        )}
      </Container>
    </div>
  )
}
