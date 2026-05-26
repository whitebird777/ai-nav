'use client'

import { useState, useCallback } from 'react'
import { ArrowRight, RefreshCw, Share2, Check, X, Zap, Eye } from 'lucide-react'
import {
  getShuffledTruths,
  getShuffledDares,
  getAIRection,
  getRandomTitle,
  type Mode,
  type Challenge,
} from '@/lib/truth-or-dare-data'

type Stage = 'mode' | 'challenge' | 'reaction' | 'end'

export default function AiTruthOrDareGame({ locale }: { locale: string }) {
  const [stage, setStage] = useState<Stage>('mode')
  const [mode, setMode] = useState<Mode>('truth')
  const [truths, setTruths] = useState<Challenge[]>([])
  const [dares, setDares] = useState<Challenge[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reaction, setReaction] = useState('')
  const [completedCount, setCompletedCount] = useState(0)
  const [skippedCount, setSkippedCount] = useState(0)

  const isEn = locale === 'en'
  const pool = mode === 'truth' ? truths : dares
  const currentChallenge = pool[currentIndex]

  // ==================== 选择模式 ====================
  const handleModeSelect = useCallback((m: Mode) => {
    setMode(m)
    setTruths(getShuffledTruths())
    setDares(getShuffledDares())
    setCurrentIndex(0)
    setCompletedCount(0)
    setSkippedCount(0)
    setReaction('')
    setStage('challenge')
  }, [])

  // ==================== 完成 ====================
  const handleComplete = useCallback(() => {
    const r = getAIRection(isEn)
    setReaction(r)
    setCompletedCount((prev) => prev + 1)
    setStage('reaction')
  }, [isEn])

  // ==================== 换一个 ====================
  const handleSkip = useCallback(() => {
    setSkippedCount((prev) => prev + 1)
    if (currentIndex + 1 >= pool.length) {
      setStage('end')
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex, pool.length])

  // ==================== 下一个 ====================
  const handleNext = useCallback(() => {
    setReaction('')
    if (currentIndex + 1 >= pool.length) {
      setStage('end')
    } else {
      setCurrentIndex((prev) => prev + 1)
      setStage('challenge')
    }
  }, [currentIndex, pool.length])

  // ==================== 重来 ====================
  const handleRestart = useCallback(() => {
    setStage('mode')
    setTruths([])
    setDares([])
    setCurrentIndex(0)
    setCompletedCount(0)
    setSkippedCount(0)
    setReaction('')
  }, [])

  // ==================== 分享 ====================
  const handleShare = useCallback(() => {
    const title = getRandomTitle(isEn)
    const text = isEn
      ? `I played AI Truth or Dare! Completed ${completedCount} challenges and got "${title}"! 😈 Can you handle it?`
      : `我玩了 AI 真心话大冒险！完成了 ${completedCount} 个挑战，获得「${title}」！😈 你敢来吗？`
    const url = `${window.location.origin}/${locale}/play/ai-truth-or-dare`

    if (navigator.share) {
      navigator.share({ title: isEn ? 'AI Truth or Dare' : 'AI 真心话大冒险', text, url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(`${text} ${url}`).catch(() => {})
    }
  }, [completedCount, isEn, locale])

  // ==================== 模式选择 ====================
  if (stage === 'mode') {
    return (
      <div className="text-center">
        <div className="mb-2 text-5xl">😈</div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
          {isEn ? 'AI Truth or Dare' : 'AI 真心话大冒险'}
        </h2>
        <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          {isEn
            ? 'AI challenges you. Truth or Dare — what\'s your pick?'
            : 'AI 给你出题，真心话还是大冒险，选一个！'}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {/* 真心话 */}
          <button
            onClick={() => handleModeSelect('truth')}
            className="group flex flex-col items-center rounded-2xl border-2 border-sky-200 bg-sky-50 p-8 transition-all duration-200 hover:-translate-y-1 hover:border-sky-400 hover:shadow-lg dark:border-sky-800 dark:bg-sky-950/30 dark:hover:border-sky-600"
          >
            <span className="text-5xl">💬</span>
            <h3 className="mt-4 text-lg font-bold text-sky-700 dark:text-sky-300">
              {isEn ? 'TRUTH' : '真心话'}
            </h3>
            <p className="mt-1 text-xs text-sky-600 dark:text-sky-400">
              {isEn ? 'Answer honestly... if you dare.' : '说出你的真心话...如果你敢的话。'}
            </p>
          </button>

          {/* 大冒险 */}
          <button
            onClick={() => handleModeSelect('dare')}
            className="group flex flex-col items-center rounded-2xl border-2 border-orange-200 bg-orange-50 p-8 transition-all duration-200 hover:-translate-y-1 hover:border-orange-400 hover:shadow-lg dark:border-orange-800 dark:bg-orange-950/30 dark:hover:border-orange-600"
          >
            <span className="text-5xl">⚡</span>
            <h3 className="mt-4 text-lg font-bold text-orange-700 dark:text-orange-300">
              {isEn ? 'DARE' : '大冒险'}
            </h3>
            <p className="mt-1 text-xs text-orange-600 dark:text-orange-400">
              {isEn ? 'Complete the task. No backing out.' : '完成挑战。不能反悔。'}
            </p>
          </button>
        </div>
      </div>
    )
  }

  // ==================== 挑战页 ====================
  if (stage === 'challenge' && currentChallenge) {
    const bgColor = mode === 'truth'
      ? 'border-sky-200 bg-sky-50/50 dark:border-sky-800 dark:bg-sky-950/20'
      : 'border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/20'
    const accentColor = mode === 'truth'
      ? 'text-sky-600 dark:text-sky-400'
      : 'text-orange-600 dark:text-orange-400'
    const badgeColor = mode === 'truth'
      ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
      : 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300'
    const btnColor = mode === 'truth'
      ? 'bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500'
      : 'bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500'

    return (
      <div className="text-center">
        {/* 模式标签 */}
        <div className="mb-6">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}>
            {mode === 'truth' ? '💬' : '⚡'}
            {mode === 'truth'
              ? (isEn ? 'TRUTH' : '真心话')
              : (isEn ? 'DARE' : '大冒险')}
          </span>
        </div>

        {/* 挑战内容 */}
        <div className={`mb-8 rounded-2xl border-2 p-8 ${bgColor}`}>
          <p className={`text-lg font-semibold leading-relaxed sm:text-xl ${accentColor}`}>
            {isEn ? currentChallenge.content_en : currentChallenge.content_zh}
          </p>
        </div>

        {/* 进度 */}
        <p className="mb-6 text-xs text-zinc-400">
          #{currentIndex + 1} &middot;
          {isEn
            ? ` ${completedCount} done · ${skippedCount} skipped`
            : ` 已完成 ${completedCount} · 跳过 ${skippedCount}`}
        </p>

        {/* 操作按钮 */}
        <div className="space-y-3">
          <button
            onClick={handleComplete}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-colors active:scale-[0.98] ${btnColor}`}
          >
            <Check size={18} />
            {isEn ? 'Done! I did it!' : '完成！我做到了！'}
          </button>
          <button
            onClick={handleSkip}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <X size={16} />
            {isEn ? 'Skip this one' : '换一个'}
          </button>
        </div>
      </div>
    )
  }

  // ==================== AI 反应 ====================
  if (stage === 'reaction' && reaction) {
    const accentColor = mode === 'truth'
      ? 'border-sky-200 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/20'
      : 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20'

    return (
      <div className="text-center">
        <div className="mb-2 text-5xl">{mode === 'truth' ? '🤖' : '🔥'}</div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {isEn ? 'AI Says:' : 'AI 说：'}
        </h3>

        <div className={`mt-6 rounded-2xl border-2 p-6 ${accentColor}`}>
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {reaction}
          </p>
        </div>

        <button
          onClick={handleNext}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {currentIndex + 1 >= pool.length
            ? (isEn ? 'See Results' : '查看战绩')
            : (isEn ? 'Next Challenge' : '下一题')}
          <ArrowRight size={16} />
        </button>
      </div>
    )
  }

  // ==================== 结束页 ====================
  if (stage === 'end') {
    const title = getRandomTitle(isEn)
    const total = completedCount + skippedCount

    return (
      <div className="text-center">
        <div className="mb-2 text-5xl">🏆</div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {isEn ? 'Challenge Complete!' : '挑战结束！'}
        </h2>

        {/* 统计 */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/30">
            <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">
              {completedCount}
            </p>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
              {isEn ? 'Completed' : '已完成'}
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="text-2xl font-extrabold text-zinc-500">{skippedCount}</p>
            <p className="mt-1 text-xs text-zinc-400">
              {isEn ? 'Skipped' : '已跳过'}
            </p>
          </div>
        </div>

        {/* 称号 */}
        <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {title}
        </div>

        {/* 评语 */}
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          {completedCount >= 5
            ? (isEn ? 'You\'re a legend! Nothing can stop you. 🚀' : '你太强了！没有什么能阻挡你的脚步。🚀')
            : completedCount >= 2
              ? (isEn ? 'Not bad! But there\'s always room for more courage. 💪' : '不错不错！但勇气值还有提升空间。💪')
              : (isEn ? 'Looks like the AI was a bit too tough today... try again? 😏' : '看来今天的题目有点太狠了...再来一次？😏')}
        </p>

        {/* 按钮 */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={handleRestart}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <RefreshCw size={16} />
            {isEn ? 'Play Again' : '再玩一次'}
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
