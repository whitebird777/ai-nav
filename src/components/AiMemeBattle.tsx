'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { ArrowRight, RotateCcw, Send, Share2, Sparkles } from 'lucide-react'
import {
  THEMES,
  AI_RESPONSES,
  getRandomResponse,
  getTitle,
  getTotalRounds,
  type MemeResponse,
  type Theme,
} from '@/lib/meme-battle-data'

type Stage = 'theme' | 'battle' | 'result'

interface Round {
  userText: string
  aiResponse: string
  score: number
}

export default function AiMemeBattle({ locale }: { locale: string }) {
  const [stage, setStage] = useState<Stage>('theme')
  const [theme, setTheme] = useState<Theme | null>(null)
  const [rounds, setRounds] = useState<Round[]>([])
  const [currentRound, setCurrentRound] = useState(1)
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const isEn = locale === 'en'
  const totalRounds = getTotalRounds()

  const responses = theme ? (AI_RESPONSES[theme.id] ?? AI_RESPONSES.free!) : []

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [rounds, isThinking])

  const handleThemeSelect = useCallback((t: Theme) => {
    setTheme(t)
    setStage('battle')
    setRounds([])
    setCurrentRound(1)
    setInput('')
  }, [])

  const handleSend = useCallback(() => {
    const text = input.trim()
    if (!text || isThinking || !theme) return

    setInput('')
    setIsThinking(true)

    // 模拟 AI 思考延迟
    setTimeout(() => {
      const response: MemeResponse = getRandomResponse(responses)
      const newRound: Round = {
        userText: text,
        aiResponse: isEn ? response.text_en : response.text_zh,
        score: response.score,
      }

      setRounds((prev) => [...prev, newRound])
      setIsThinking(false)

      if (currentRound >= totalRounds) {
        setStage('result')
      } else {
        setCurrentRound((prev) => prev + 1)
      }
    }, 600 + Math.random() * 800)
  }, [input, isThinking, theme, responses, isEn, currentRound, totalRounds])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  useEffect(() => {
    if (stage === 'battle') inputRef.current?.focus()
  }, [stage, currentRound])

  const handleRestart = useCallback(() => {
    setStage('theme')
    setTheme(null)
    setRounds([])
    setCurrentRound(1)
    setInput('')
  }, [])

  const handleShare = useCallback(() => {
    if (!theme) return
    const totalScore = rounds.reduce((sum, r) => sum + r.score, 0)
    const title = getTitle(theme.id, totalScore)
    const label = isEn ? title.title_en : title.title_zh
    const text = isEn
      ? `I battled AI in "${isEn ? theme.name_en : theme.name_zh}" mode and earned the title: ${label}! Can you beat me?`
      : `我在「AI 梗王争霸」里玩了一把「${theme.name_zh}」，获得称号：${label}！来挑战我！`
    const url = `${window.location.origin}/${locale}/play/ai-meme-battle`

    if (navigator.share) {
      navigator.share({ title: isEn ? 'AI Meme Battle' : 'AI 梗王争霸', text, url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(`${text} ${url}`).catch(() => {})
    }
  }, [theme, rounds, isEn, locale])

  // ==================== 主题选择 ====================
  if (stage === 'theme') {
    return (
      <div>
        <h2 className="mb-6 text-center text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl">
          {isEn ? 'Choose Your Battle Theme' : '选择一个主题开始斗梗'}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => handleThemeSelect(t)}
              className="flex items-start gap-4 rounded-xl border border-zinc-200 bg-white p-4 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-2xl dark:bg-zinc-800">
                {t.icon}
              </span>
              <div className="min-w-0">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {isEn ? t.name_en : t.name_zh}
                </span>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                  {isEn ? t.desc_en : t.desc_zh}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ==================== 对战 ====================
  if (stage === 'battle' && theme) {
    return (
      <div className="flex flex-col" style={{ height: 'calc(100vh - 220px)', minHeight: 400, maxHeight: 600 }}>
        {/* 顶栏 */}
        <div className="mb-4 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span>{theme.icon}</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {isEn ? theme.name_en : theme.name_zh}
            </span>
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-0.5 text-xs font-medium dark:bg-zinc-800">
            {currentRound} / {totalRounds}
          </span>
        </div>

        {/* 对话区域 */}
        <div
          ref={scrollRef}
          className="mb-4 flex-1 space-y-3 overflow-y-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          {/* 开场白 */}
          <div className="flex gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-xs dark:bg-zinc-700">
              🤖
            </span>
            <div className="rounded-2xl rounded-tl-md bg-white px-3.5 py-2 text-sm text-zinc-700 shadow-sm dark:bg-zinc-800 dark:text-zinc-300">
              {isEn
                ? `"${theme.name_en}" mode activated! You go first. Make me laugh!`
                : `「${theme.name_zh}」模式已激活！你先出招，看你能不能梗到我～`}
            </div>
          </div>

          {rounds.map((round, i) => (
            <div key={i} className="space-y-3">
              {/* 用户消息 */}
              <div className="flex gap-2 justify-end">
                <div className="rounded-2xl rounded-tr-md bg-zinc-900 px-3.5 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900">
                  {round.userText}
                </div>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-xs dark:bg-zinc-700">
                  👤
                </span>
              </div>
              {/* AI 回复 */}
              <div className="flex gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-xs dark:bg-zinc-700">
                  🤖
                </span>
                <div className="max-w-[85%]">
                  <div className="rounded-2xl rounded-tl-md bg-white px-3.5 py-2 text-sm text-zinc-700 shadow-sm dark:bg-zinc-800 dark:text-zinc-300">
                    {round.aiResponse}
                  </div>
                  <span className="mt-1 ml-1 inline-block text-xs font-medium text-zinc-400">
                    {round.score}/10
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* AI 思考中 */}
          {isThinking && (
            <div className="flex gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-xs dark:bg-zinc-700">
                🤖
              </span>
              <div className="rounded-2xl rounded-tl-md bg-white px-4 py-2.5 shadow-sm dark:bg-zinc-800">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 输入区 */}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isEn ? 'Drop your meme...' : '输入你的梗...'}
            disabled={isThinking}
            maxLength={200}
            className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-400 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-zinc-600"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white transition-colors hover:bg-zinc-800 disabled:opacity-30 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Send size={17} />
          </button>
        </div>
      </div>
    )
  }

  // ==================== 结果 ====================
  if (stage === 'result' && theme) {
    const totalScore = rounds.reduce((sum, r) => sum + r.score, 0)
    const maxScore = totalRounds * 10
    const title = getTitle(theme.id, totalScore)

    return (
      <div>
        {/* 得分 */}
        <div className="mb-8 text-center">
          <div className="mb-2 text-5xl">{theme.icon}</div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {isEn ? 'Battle Complete!' : '对战结束！'}
          </h2>
          <div className="mt-3">
            <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
              {totalScore}
            </span>
            <span className="text-lg text-zinc-400"> / {maxScore}</span>
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            <Sparkles size={14} />
            {isEn ? title.title_en : title.title_zh}
          </div>
        </div>

        {/* 对话回顾 */}
        <div className="mb-6 space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {isEn ? 'Battle Recap' : '精彩回顾'}
          </h3>
          {rounds.map((round, i) => (
            <div key={i} className="border-b border-zinc-200 pb-3 last:border-0 last:pb-0 dark:border-zinc-800">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {round.userText}
                </p>
                <span className="ml-2 shrink-0 rounded bg-zinc-200 px-1.5 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {round.score}/10
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                🤖 {round.aiResponse}
              </p>
            </div>
          ))}
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <RotateCcw size={16} />
            {isEn ? 'Play Again' : '再来一局'}
          </button>
          <button
            onClick={handleShare}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Share2 size={16} />
            {isEn ? 'Share' : '分享战绩'}
          </button>
        </div>
      </div>
    )
  }

  return null
}
