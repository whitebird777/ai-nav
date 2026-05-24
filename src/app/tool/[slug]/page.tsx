// 工具详情页 — Server Component
// SEO: generateStaticParams 预渲染 + generateMetadata 动态 meta

import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getToolBySlug, getToolSlugs } from '@/lib/tools'
import Container from '@/components/Container'
import { ArrowLeft, ExternalLink } from 'lucide-react'

const pricingLabel: Record<string, string> = {
  free: '免费',
  freemium: '免费/付费',
  paid: '付费',
}

const pricingStyle: Record<string, string> = {
  free: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  freemium:
    'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  paid: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
}

// 预渲染所有工具页面
export async function generateStaticParams() {
  const slugs = await getToolSlugs()
  return slugs.map((slug) => ({ slug }))
}

// 动态 SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = await getToolBySlug(slug)

  if (!tool) {
    return { title: '工具未找到' }
  }

  return {
    title: tool.name,
    description: tool.description,
    openGraph: {
      title: `${tool.name} — AI Nav`,
      description: tool.description,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: tool.name,
      description: tool.description,
    },
  }
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = await getToolBySlug(slug)

  if (!tool) notFound()

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: tool.name,
            description: tool.description,
            applicationCategory: 'AIApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: tool.pricing === 'free' ? '0' : undefined,
              priceCurrency: 'CNY',
            },
            url: tool.url,
          }),
        }}
      />

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

        {/* 工具信息 */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          {/* 头部：Logo + 名称 + 价格 */}
          <div className="mb-6 flex items-start gap-4">
            {tool.logo_url ? (
              <img
                src={tool.logo_url}
                alt={tool.name}
                className="h-14 w-14 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-2xl dark:bg-zinc-800">
                🛠️
              </div>
            )}

            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {tool.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {tool.pricing && (
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${pricingStyle[tool.pricing] || ''}`}
                  >
                    {pricingLabel[tool.pricing] || tool.pricing}
                  </span>
                )}
                <span className="text-sm text-zinc-400 dark:text-zinc-500">
                  {tool.category_name}
                </span>
              </div>
            </div>
          </div>

          {/* 描述 */}
          <p className="mb-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            {tool.description}
          </p>

          {/* 标签 */}
          {tool.tags && tool.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-zinc-100 px-3 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 访问按钮 */}
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            访问网站
            <ExternalLink size={16} />
          </a>
        </div>
      </Container>
    </div>
    </>
  )
}
