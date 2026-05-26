'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { ArrowRight, RefreshCw, Share2, Sparkles, Send, Shuffle } from 'lucide-react'
import {
  drawCards,
  generateReading,
  getPositionName,
  getRandomQuestion,
  type DrawnCard,
} from '@/lib/tarot-data'

type Stage = 'input' | 'drawing' | 'result'

export default function AiTarotGame({ locale }: { locale: string }) {
  const [stage, setStage] = useState<Stage>('input')
  const [question, setQuestion] = useState('')
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([])
  const [revealedCount, setRevealedCount] = useState(0)
  const [reading, setReading] = useState<{
    intro: string
    readings: string[]
    summary: string
  } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isEn = locale === 'en'

  useEffect(() => {
    if (stage === 'input') inputRef.current?.focus()
  }, [stage])

  // ==================== 开始占卜 ====================
  const handleStart = useCallback(
    (q?: string) => {
      const finalQuestion = (q ?? question).trim()
      if (!finalQuestion) return

      setQuestion(finalQuestion)
      const cards = drawCards(3)
      setDrawnCards(cards)
      setRevealedCount(0)
      setReading(null)
      setStage('drawing')
    },
    [question]
  )

  // 逐张翻牌动画
  useEffect(() => {
    if (stage !== 'drawing') return
    if (revealedCount >= 3) {
      // 生成解读
      const result = generateReading(question, drawnCards, isEn)
      setReading(result)
      setStage('result')
      return
    }

    const timer = setTimeout(() => {
      setRevealedCount((prev) => prev + 1)
    }, 800)

    return () => clearTimeout(timer)
  }, [stage, revealedCount, drawnCards, question, isEn])

  // ==================== 重新开始 ====================
  const handleRestart = useCallback(() => {
    setStage('input')
    setQuestion('')
    setDrawnCards([])
    setRevealedCount(0)
    setReading(null)
  }, [])

  // ==================== 分享 ====================
  const handleShare = useCallback(() => {
    if (!reading) return
    const text = isEn
      ? `I asked AI Tarot: "${question}" — the cards revealed my fate! 🔮 Can you guess what I got?`
      : `我问 AI 塔罗：「${question}」—— 结果把我整不会了！🔮 你也来试试？`
    const url = `${window.location.origin}/${locale}/play/ai-tarot`

    if (navigator.share) {
      navigator.share({ title: isEn ? 'AI Tarot' : 'AI 塔罗占卜', text, url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(`${text} ${url}`).catch(() => {})
    }
  }, [reading, question, isEn, locale])

  // ==================== 输入页 ====================
  if (stage === 'input') {
    return (
      <div className="text-center">
        <div className="mb-2 text-5xl">🔮</div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
          {isEn ? 'AI Tarot Reading' : 'AI 塔罗占卜'}
        </h2>
        <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          {isEn ? 'Ask the cards. Let AI unveil your fate.' : '抽三张牌，让 AI 为你解读命运的暗示。'}
        </p>

        {/* 免责声明 */}
        <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">
          ⚠️ {isEn ? 'For entertainment only. Don\'t take it too seriously.' : '仅供娱乐，请勿迷信'}
        </p>

        {/* 输入区 */}
        <div className="mt-8 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleStart()
            }}
            placeholder={
              isEn
                ? 'E.g. How\'s my career luck lately?'
                : '例如：我最近的事业运怎么样？'
            }
            maxLength={120}
            className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-purple-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-purple-500"
          />
          <button
            onClick={() => handleStart()}
            disabled={!question.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white transition-colors hover:bg-purple-700 disabled:opacity-30 dark:bg-purple-500 dark:hover:bg-purple-600"
          >
            <Send size={17} />
          </button>
        </div>

        {/* 随机占卜 */}
        <button
          onClick={() => handleStart(getRandomQuestion(isEn))}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-5 py-2.5 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100 active:scale-[0.98] dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300 dark:hover:bg-purple-900"
        >
          <Shuffle size={15} />
          {isEn ? 'Random Reading' : '随机占卜'}
        </button>

        {/* 神秘氛围装饰 */}
        <div className="mt-10 flex justify-center gap-2 opacity-30">
          <span className="text-lg">✨</span>
          <span className="text-lg">🌙</span>
          <span className="text-lg">⭐</span>
          <span className="text-lg">🔮</span>
          <span className="text-lg">🌟</span>
        </div>
      </div>
    )
  }

  // ==================== 抽牌动画 ====================
  if (stage === 'drawing') {
    return (
      <div className="text-center">
        <p className="mb-2 text-sm font-medium text-purple-600 dark:text-purple-400 animate-pulse">
          {isEn ? 'Shuffling the cards...' : '正在为你洗牌...'}
        </p>
        <p className="mb-8 text-xs text-zinc-500 dark:text-zinc-400">
          {isEn
            ? `You asked: "${question}"`
            : `你问的是：「${question}」`}
        </p>

        <div className="flex justify-center gap-4">
          {drawnCards.map((dc, i) => {
            const revealed = i < revealedCount
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-2"
                style={{ perspective: '800px' }}
              >
                {/* 牌 */}
                <div
                  className={`h-40 w-28 rounded-xl transition-all duration-500 ${
                    revealed
                      ? 'rotate-0 bg-white shadow-lg dark:bg-zinc-800'
                      : 'rotate-6 scale-95 bg-purple-600 shadow-xl dark:bg-purple-500'
                  }`}
                  style={{
                    transform: revealed ? 'rotateY(0deg)' : 'rotateY(180deg)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {revealed ? (
                    <div className="flex h-full flex-col items-center justify-center p-2">
                      <img
                        src={dc.card.image_url}
                        alt={isEn ? dc.card.name_en : dc.card.name_zh}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <p className="mt-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-tight text-center">
                        {isEn ? dc.card.name_en : dc.card.name_zh}
                      </p>
                      <span
                        className={`mt-0.5 text-[10px] font-medium ${
                          dc.isUpright
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {dc.isUpright
                          ? isEn ? 'Upright' : '正位'
                          : isEn ? 'Reversed' : '逆位'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center text-3xl text-white/50">
                      ✦
                    </div>
                  )}
                </div>

                {/* 位置标签 */}
                <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                  {getPositionName(i, isEn)}
                </span>
              </div>
            )
          })}
        </div>

        <p className="mt-8 text-xs text-zinc-400">
          {revealedCount < 3
            ? isEn
              ? `Revealing card ${revealedCount + 1} of 3...`
              : `正在翻开第 ${revealedCount + 1} 张牌...`
            : isEn
              ? 'Interpreting your reading...'
              : '正在为你解读...'}
        </p>
      </div>
    )
  }

  // ==================== 结果页 ====================
  if (stage === 'result' && reading) {
    return (
      <div>
        {/* 标题 */}
        <div className="mb-8 text-center">
          <div className="mb-2 text-4xl">🔮</div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {isEn ? 'Your Tarot Reading' : '你的塔罗解读'}
          </h2>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {isEn ? `Q: "${question}"` : `问：「${question}」`}
          </p>
        </div>

        {/* 三张牌展示 */}
        <div className="mb-8 grid grid-cols-3 gap-3">
          {drawnCards.map((dc, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-200 bg-white p-3 text-center dark:border-zinc-700 dark:bg-zinc-800"
            >
              <img
                src={dc.card.image_url}
                alt={isEn ? dc.card.name_en : dc.card.name_zh}
                className="mx-auto h-16 w-16 rounded-lg object-cover"
              />
              <p className="mt-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                {isEn ? dc.card.name_en : dc.card.name_zh}
              </p>
              <span
                className={`mt-0.5 inline-block text-[10px] font-medium ${
                  dc.isUpright
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {dc.isUpright
                  ? isEn ? 'Upright' : '正位'
                  : isEn ? 'Reversed' : '逆位'}
              </span>
              <p className="mt-1 text-[10px] text-zinc-400 uppercase tracking-wider">
                {getPositionName(i, isEn)}
              </p>
            </div>
          ))}
        </div>

        {/* AI 解读 */}
        <div className="mb-8 space-y-4 rounded-xl border border-purple-200 bg-purple-50/50 p-5 dark:border-purple-800 dark:bg-purple-950/30">
          {/* 引言 */}
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
            {reading.intro}
          </p>

          {/* 分卡解读 */}
          {reading.readings.map((r, i) => (
            <div
              key={i}
              className="border-t border-purple-200 pt-4 dark:border-purple-800"
            >
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
                {r}
              </p>
            </div>
          ))}

          {/* 总结 */}
          <div className="border-t border-purple-200 pt-4 dark:border-purple-800">
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line font-medium">
              {reading.summary}
            </p>
          </div>
        </div>

        {/* 免责声明 */}
        <p className="mb-6 text-center text-[11px] text-zinc-400 dark:text-zinc-500">
          ⚠️ {isEn ? 'For entertainment only. Your fate is in your own hands.' : '仅供娱乐，命运掌握在自己手中 ✨'}
        </p>

        {/* 操作按钮 */}
        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <RefreshCw size={16} />
            {isEn ? 'Draw Again' : '再抽一次'}
          </button>
          <button
            onClick={handleShare}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700 active:scale-[0.98] dark:bg-purple-500 dark:hover:bg-purple-600"
          >
            <Share2 size={16} />
            {isEn ? 'Share' : '分享结果'}
          </button>
        </div>
      </div>
    )
  }

  return null
}
