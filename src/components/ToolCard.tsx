// 工具卡片 — locale-aware

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ExternalLink } from 'lucide-react'
import type { ToolWithCategory } from '@/lib/types'
import FavoriteButton from './FavoriteButton'

const pricingStyle: Record<string, string> = {
  free: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  freemium:
    'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  paid: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
}

const avatarColors = [
  'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
  'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400',
  'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400',
  'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400',
  'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-400',
]

function getAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

export default function ToolCard({
  tool,
  locale,
}: {
  tool: ToolWithCategory
  locale: string
}) {
  const t = useTranslations('tool')
  const tc = useTranslations('common')
  const [imgFailed, setImgFailed] = useState(false)

  const pricingLabel: Record<string, string> = {
    free: t('free'),
    freemium: t('freemium'),
    paid: t('paid'),
  }

  const categoryDisplayName =
    locale === 'en' && tool.category_name_en
      ? tool.category_name_en
      : tool.category_name

  const displayDescription =
    locale === 'en' && tool.description_en
      ? tool.description_en
      : tool.description

  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-5 no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="absolute right-3 top-3 flex items-center gap-1.5">
        <FavoriteButton type="tool" id={tool.slug} />
        {tool.featured && (
          <div className="rounded-md bg-zinc-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
            {tc('featured')}
          </div>
        )}
      </div>

      <div className="mb-3 flex items-start gap-3">
        {tool.logo_url && !imgFailed ? (
          <img
            src={tool.logo_url}
            alt={tool.name}
            className="h-10 w-10 shrink-0 rounded-lg object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${getAvatarColor(tool.name)}`}
          >
            {tool.name.charAt(0)}
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

      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        {displayDescription}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-1.5 text-xs">
        <span className="rounded bg-zinc-100 px-2 py-0.5 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          {categoryDisplayName}
        </span>
        {tool.tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="text-zinc-400 dark:text-zinc-500">
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
