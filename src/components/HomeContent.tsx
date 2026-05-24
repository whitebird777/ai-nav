// 首页内容 — 客户端交互壳
// 职责：管理搜索/筛选状态，过滤工具，渲染列表
// 数据由 Server Component 获取并传入

'use client'

import { useState, useMemo } from 'react'
import type { Category, ToolWithCategory } from '@/lib/types'
import Container from './Container'
import SearchBar from './SearchBar'
import CategoryFilter from './CategoryFilter'
import ToolCard from './ToolCard'

interface Props {
  tools: ToolWithCategory[]
  categories: Category[]
}

export default function HomeContent({ tools, categories }: Props) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string | null>(null)

  // 前端过滤（MVP 数据量小，无需后端搜索）
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
    <div className="py-8 sm:py-12">
      <Container>
        {/* 标题 */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            AI Nav
          </h1>
          <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
            发现最好用的 AI 工具
          </p>
        </div>

        {/* 搜索框 */}
        <div className="mb-6">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* 分类筛选 */}
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selected={category}
            onSelect={setCategory}
          />
        </div>

        {/* 工具列表 */}
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-zinc-400 dark:text-zinc-500">
              没有找到匹配的工具
            </p>
            <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
              试试其他关键词或分类
            </p>
          </div>
        )}
      </Container>
    </div>
  )
}
