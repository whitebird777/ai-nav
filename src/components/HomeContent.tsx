// 首页内容 — locale-aware 客户端交互壳

'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import type { Category, ToolWithCategory } from '@/lib/types'
import Container from './Container'
import HeroSection from './HeroSection'
import SearchBar from './SearchBar'
import CategoryFilter from './CategoryFilter'
import ToolCard from './ToolCard'

interface Props {
  tools: ToolWithCategory[]
  categories: Category[]
  toolCount: number
  categoryCount: number
  locale: string
}

export default function HomeContent({
  tools,
  categories,
  toolCount,
  categoryCount,
  locale,
}: Props) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const t = useTranslations('common')

  const filtered = useMemo(() => {
    let result = tools

    if (category) {
      result = result.filter((t) => t.category_slug === category)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(q))
      )
    }

    return result
  }, [tools, search, category])

  return (
    <div>
      <HeroSection toolCount={toolCount} categoryCount={categoryCount} />

      <div className="py-8 sm:py-12">
        <Container>
          <div className="mb-6">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          <div className="mb-8">
            <CategoryFilter
              categories={categories}
              selected={category}
              onSelect={setCategory}
              locale={locale}
            />
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tool) => (
                <ToolCard key={tool.id} tool={tool} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-zinc-400 dark:text-zinc-500">
                {t('noResults')}
              </p>
              <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
                {t('tryOtherKeywords')}
              </p>
            </div>
          )}
        </Container>
      </div>
    </div>
  )
}
