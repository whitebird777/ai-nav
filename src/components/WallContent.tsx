'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Heart, Send, Sparkles, User } from 'lucide-react'
import { fetchMessages, postMessage, likeMessage, type WallMessage } from '@/lib/wall'

const TAGS = ['开心', '吐槽', '祝福', '抽象', 'emo', '求建议']

const TAG_COLORS: Record<string, string> = {
  '开心': 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800',
  '吐槽': 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-800',
  '祝福': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800',
  '抽象': 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-400 dark:border-teal-800',
  'emo': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800',
  '求建议': 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800',
  '默认': 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700',
}

const REPLY_BG = 'bg-gradient-to-r from-indigo-50 to-violet-50 border-l-2 border-indigo-300 dark:from-indigo-950/40 dark:to-violet-950/40 dark:border-indigo-700'

export default function WallContent({ locale }: { locale: string }) {
  const isEn = locale === 'en'

  const [messages, setMessages] = useState<WallMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // form
  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')
  const [tag, setTag] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // likes tracking
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({})

  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem('ai_wall_likes')
    if (stored) {
      try { setLikedIds(new Set(JSON.parse(stored))) } catch { /* */ }
    }
  }, [])

  const loadMessages = useCallback(async () => {
    try {
      const data = await fetchMessages(50)
      setMessages(data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadMessages() }, [loadMessages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || submitting) return

    setSubmitting(true)
    setSubmitError('')

    const result = await postMessage(nickname.trim() || '匿名', content.trim(), tag, locale)
    if (result) {
      setMessages((prev) => [result, ...prev])
      setContent('')
      setTag(null)
    } else {
      setSubmitError(isEn ? 'Failed to post. Please try again.' : '发布失败，请重试。')
    }
    setSubmitting(false)
  }

  const handleLike = async (id: number) => {
    if (likedIds.has(id)) return
    const newCount = await likeMessage(id)
    if (newCount !== null) {
      const next = new Set(likedIds)
      next.add(id)
      setLikedIds(next)
      setLikeCounts((prev) => ({ ...prev, [id]: newCount }))
      localStorage.setItem('ai_wall_likes', JSON.stringify([...next]))
    }
  }

  const formatTime = (ts: string) => {
    const d = new Date(ts)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMin = Math.floor(diffMs / 60000)
    if (diffMin < 1) return isEn ? 'just now' : '刚刚'
    if (diffMin < 60) return isEn ? `${diffMin}m ago` : `${diffMin} 分钟前`
    const diffH = Math.floor(diffMin / 60)
    if (diffH < 24) return isEn ? `${diffH}h ago` : `${diffH} 小时前`
    const diffD = Math.floor(diffH / 24)
    if (diffD < 7) return isEn ? `${diffD}d ago` : `${diffD} 天前`
    return d.toLocaleDateString(isEn ? 'en-US' : 'zh-CN', { month: 'short', day: 'numeric' })
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-zinc-400">{isEn ? 'Failed to load.' : '加载失败。'}</p>
        <button onClick={loadMessages} className="mt-2 text-sm text-indigo-500 underline">
          {isEn ? 'Retry' : '重试'}
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* ---- 表单 ---- */}
      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        {/* 装饰 */}
        <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-indigo-100/60 dark:bg-indigo-900/20" />

        <div className="relative">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-indigo-500" />
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {isEn ? 'Leave Your Footprint' : '留下你的足迹'}
            </span>
          </div>

          {/* 昵称 */}
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800">
            <User size={14} className="text-zinc-400" />
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={isEn ? 'Your name (optional)' : '你的名字（选填）'}
              maxLength={20}
              className="flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
            />
          </div>

          {/* 正文 */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={isEn ? '说点什么... 今天的心情、一个秘密、或任何你想留下的 ✨' : '说点什么... 今天的心情、一个秘密、或任何你想留下的 ✨'}
            maxLength={500}
            rows={3}
            className="mb-3 w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />

          {/* 标签选择 */}
          <div className="mb-4 flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-[11px] text-zinc-400">
              {isEn ? 'Mood:' : '心情：'}
            </span>
            {TAGS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTag(tag === t ? null : t)}
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-all ${
                  tag === t
                    ? TAG_COLORS[t]
                    : 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* 按钮 + 错误 */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!content.trim() || submitting}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={14} />
              {submitting
                ? '...'
                : isEn
                  ? 'Post'
                  : '发布足迹'}
            </button>
            <span className="text-[11px] text-zinc-400">
              {content.length}/500
            </span>
            {submitError && (
              <span className="text-xs text-red-500">{submitError}</span>
            )}
          </div>
        </div>
      </form>

      {/* ---- 留言列表 ---- */}
      <div ref={listRef} className="mt-8 space-y-4">
        {loading ? (
          <div className="py-12 text-center">
            <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-indigo-500" />
          </div>
        ) : messages.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-5xl">🖼️</p>
            <p className="mt-3 text-zinc-400 dark:text-zinc-500">
              {isEn ? 'The wall is empty. Be the first to leave a footprint!' : '墙上还是空的，来做第一个留下足迹的人吧！'}
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const displayLikes = likeCounts[msg.id] ?? msg.likes
            const liked = likedIds.has(msg.id)
            return (
              <div
                key={msg.id}
                className="group rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                {/* 用户留言 */}
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm dark:bg-zinc-800">
                    {msg.nickname?.charAt(0) || '?'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        {msg.nickname || (isEn ? 'Anonymous' : '匿名')}
                      </span>
                      {msg.tag && (
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${TAG_COLORS[msg.tag] || TAG_COLORS['默认']}`}>
                          {msg.tag}
                        </span>
                      )}
                      <span className="text-[11px] text-zinc-400">{formatTime(msg.created_at)}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {msg.content}
                    </p>
                  </div>
                </div>

                {/* AI 回复 */}
                <div className={`mt-3 rounded-lg px-4 py-3 ${REPLY_BG}`}>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-sm">🤖</span>
                    <p className="text-sm leading-relaxed text-indigo-900/80 dark:text-indigo-200/80">
                      {msg.ai_reply}
                    </p>
                  </div>
                </div>

                {/* 点赞 */}
                <div className="mt-3 flex items-center gap-1">
                  <button
                    onClick={() => handleLike(msg.id)}
                    disabled={liked}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-colors ${
                      liked
                        ? 'bg-red-50 text-red-500 dark:bg-red-950 dark:text-red-400'
                        : 'text-zinc-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400'
                    }`}
                  >
                    <Heart size={12} fill={liked ? 'currentColor' : 'none'} />
                    <span className="tabular-nums">{displayLikes}</span>
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
