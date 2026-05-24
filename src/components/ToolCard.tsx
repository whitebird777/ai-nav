// 工具卡片 — 展示单个 AI 工具
// 用途：logo、名称、描述、标签、价格、分类

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import type { ToolWithCategory } from '@/lib/types'

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

export default function ToolCard({ tool }: { tool: ToolWithCategory }) {
  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 no-underline transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      {/* 顶部：Logo + 名称 + 价格 */}
      <div className="mb-3 flex items-start gap-3">
        {tool.logo_url ? (
          <img
            src={tool.logo_url}
            alt={tool.name}
            className="h-10 w-10 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-lg dark:bg-zinc-800">
            🛠️
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {tool.name}
            </h3>
            <ExternalLink
              size={14}
              className="shrink-0 text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-600"
            />
          </div>
          {tool.pricing && (
            <span
              className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-xs font-medium ${pricingStyle[tool.pricing] || ''}`}
            >
              {pricingLabel[tool.pricing] || tool.pricing}
            </span>
          )}
        </div>
      </div>

      {/* 描述 */}
      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        {tool.description}
      </p>

      {/* 底部：分类 + 标签 */}
      <div className="mt-auto flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded bg-zinc-100 px-2 py-0.5 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          {tool.category_name}
        </span>
        {tool.tags?.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-zinc-400 dark:text-zinc-500"
          >
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
