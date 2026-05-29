'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { ArrowRight, Trash2 } from 'lucide-react'
import { getFavoriteTools, getFavoriteGames, removeFavorite, type FavoriteGame } from '@/lib/favorites'
import { supabase } from '@/lib/supabase'
import type { ToolWithCategory } from '@/lib/types'
import FavoriteButton from './FavoriteButton'

const GAME_COLORS: Record<string, string> = {
  'ai-guess': 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  'ai-meme-battle': 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400',
  'ai-tarot': 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  'ai-undercover': 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400',
  'ai-draw-guess': 'bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-400',
  'ai-truth-or-dare': 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-400',
  'ai-time-capsule': 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
}

export default function FavoritesContent({ locale }: { locale: string }) {
  const [tools, setTools] = useState<ToolWithCategory[]>([])
  const [games, setGames] = useState<FavoriteGame[]>([])
  const [loading, setLoading] = useState(true)
  const isEn = locale === 'en'

  useEffect(() => {
    loadFavorites()
  }, [])

  async function loadFavorites() {
    const toolSlugs = getFavoriteTools()
    const gameList = getFavoriteGames()
    setGames(gameList)

    if (toolSlugs.length > 0) {
      const { data } = await supabase
        .from('tools')
        .select('*, categories!inner(name, name_en, slug)')
        .in('slug', toolSlugs)
        .order('name')

      if (data) {
        setTools(
          (data as any[]).map((t: any) => ({
            ...t,
            category_name: t.categories?.name ?? '',
            category_name_en: t.categories?.name_en ?? null,
            category_slug: t.categories?.slug ?? '',
          }))
        )
      }
    } else {
      setTools([])
    }
    setLoading(false)
  }

  function handleRemoveGame(id: string) {
    removeFavorite('game', id)
    setGames((prev) => prev.filter((g) => g.id !== id))
  }

  function handleRemoveTool(slug: string) {
    removeFavorite('tool', slug)
    setTools((prev) => prev.filter((t) => t.slug !== slug))
  }

  if (loading) {
    return (
      <div className="py-16 text-center">
        <p className="text-zinc-400 dark:text-zinc-500">
          {isEn ? 'Loading...' : '加载中...'}
        </p>
      </div>
    )
  }

  if (tools.length === 0 && games.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-5xl">💔</p>
        <p className="mt-4 text-lg text-zinc-400 dark:text-zinc-500">
          {isEn ? 'No favorites yet.' : '还没有收藏任何内容。'}
        </p>
        <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
          {isEn
            ? 'Click the heart icon on any tool or game card to add it here.'
            : '点击工具或游戏卡片上的心形图标即可收藏。'}
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 no-underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          {isEn ? 'Browse Tools' : '去逛逛'}
          <ArrowRight size={14} />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {/* 工具收藏 */}
      {tools.length > 0 && (
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            {isEn ? 'AI Tools' : 'AI 工具'} ({tools.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const desc =
                isEn && tool.description_en ? tool.description_en : tool.description
              const catName =
                isEn && tool.category_name_en
                  ? tool.category_name_en
                  : tool.category_name

              return (
                <div
                  key={tool.id}
                  className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-all duration-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                >
                  {/* 操作区 */}
                  <div className="absolute right-3 top-3 flex items-center gap-1">
                    <button
                      onClick={() => handleRemoveTool(tool.slug)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:bg-zinc-800 dark:hover:bg-red-950 dark:hover:text-red-400"
                      aria-label={isEn ? 'Remove' : '取消收藏'}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <Link
                    href={`/tool/${tool.slug}`}
                    className="flex-1 no-underline"
                  >
                    <div className="mb-3 flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-xs font-bold text-zinc-500 dark:bg-zinc-800">
                        {tool.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {tool.name}
                        </h3>
                      </div>
                    </div>
                    <p className="line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
                      {desc}
                    </p>
                    <span className="mt-3 inline-block rounded bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                      {catName}
                    </span>
                  </Link>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* 游戏收藏 */}
      {games.length > 0 && (
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            {isEn ? 'Games' : '娱乐游戏'} ({games.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <div
                key={game.id}
                className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-all duration-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="absolute right-3 top-3 flex items-center gap-1">
                  <button
                    onClick={() => handleRemoveGame(game.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:bg-zinc-800 dark:hover:bg-red-950 dark:hover:text-red-400"
                    aria-label={isEn ? 'Remove' : '取消收藏'}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <Link href={game.path} className="flex-1 no-underline">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-xl dark:bg-zinc-800">
                    {game.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {isEn ? game.name_en : game.name_zh}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
                    {isEn ? game.desc_en : game.desc_zh}
                  </p>
                  <span
                    className={`mt-3 inline-block rounded px-2 py-0.5 text-[10px] font-medium ${GAME_COLORS[game.id] || 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'}`}
                  >
                    {isEn ? 'Game' : '游戏'}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
