// 分类筛选 — locale-aware 横向滚动标签

'use client'

import { useTranslations } from 'next-intl'
import type { Category } from '@/lib/types'

interface Props {
  categories: Category[]
  selected: string | null
  onSelect: (slug: string | null) => void
  locale: string
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
  locale,
}: Props) {
  const t = useTranslations('common')

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      <button
        onClick={() => onSelect(null)}
        className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          selected === null
            ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
        }`}
      >
        {t('all')}
      </button>

      {categories.map((cat) => {
        const displayName =
          locale === 'en' && cat.name_en ? cat.name_en : cat.name

        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.slug)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              selected === cat.slug
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
            }`}
          >
            {cat.icon && <span className="mr-1">{cat.icon}</span>}
            {displayName}
          </button>
        )
      })}
    </div>
  )
}
