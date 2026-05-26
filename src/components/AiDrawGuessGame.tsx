'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { ArrowRight, RefreshCw, Share2, HelpCircle, SkipForward, Check, X, Lightbulb } from 'lucide-react'
import {
  getWordSet,
  getSuccessMessage,
  getFailMessage,
  getFinalTitle,
  type DrawWord,
} from '@/lib/draw-guess-data'

type Stage = 'start' | 'play' | 'feedback' | 'end'

const TOTAL_ROUNDS = 10

export default function AiDrawGuessGame({ locale }: { locale: string }) {
  const [stage, setStage] = useState<Stage>('start')
  const [words, setWords] = useState<DrawWord[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [guess, setGuess] = useState('')
  const [hintsUsed, setHintsUsed] = useState(0)
  const [guessesThisRound, setGuessesThisRound] = useState(0)
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isEn = locale === 'en'
  const currentWord = words[currentIndex]

  useEffect(() => {
    if (stage === 'play') inputRef.current?.focus()
  }, [stage, currentIndex])

  // ==================== 开始 ====================
  const handleStart = useCallback(() => {
    const wordSet = getWordSet(TOTAL_ROUNDS)
    setWords(wordSet)
    setCurrentIndex(0)
    setScore(0)
    setGuess('')
    setHintsUsed(0)
    setGuessesThisRound(0)
    setFeedback(null)
    setFinished(false)
    setStage('play')
  }, [])

  // ==================== 提交答案 ====================
  const handleSubmit = useCallback(() => {
    const answer = guess.trim()
    if (!answer || !currentWord || feedback) return

    const correctAnswer = isEn ? currentWord.word_en.toLowerCase() : currentWord.word_zh
    const isCorrect = answer.toLowerCase() === correctAnswer.toLowerCase()

    if (isCorrect) {
      const msg = getSuccessMessage(isEn)
      setFeedback({ correct: true, message: msg })
      setScore((prev) => prev + 1)
    } else {
      const newGuesses = guessesThisRound + 1
      setGuessesThisRound(newGuesses)

      if (newGuesses >= 3) {
        // 3次猜错直接揭晓
        const correct = isEn ? currentWord.word_en : currentWord.word_zh
        const msg = getFailMessage(correct, isEn)
        setFeedback({ correct: false, message: msg })
      } else {
        // 提示还有机会
        setFeedback({
          correct: false,
          message: isEn
            ? `Not quite! ${3 - newGuesses} tries left. Try a hint?`
            : `不对哦！还剩 ${3 - newGuesses} 次机会，要提示吗？`,
        })
      }
    }
  }, [guess, currentWord, feedback, guessesThisRound, isEn])

  // ==================== 提示 ====================
  const handleHint = useCallback(() => {
    if (!currentWord) return
    const maxHints = isEn ? currentWord.hints_en.length : currentWord.hints_zh.length
    if (hintsUsed >= maxHints) return
    setHintsUsed((prev) => prev + 1)
  }, [currentWord, hintsUsed, isEn])

  // ==================== 跳过 ====================
  const handleSkip = useCallback(() => {
    if (!currentWord) return
    const correct = isEn ? currentWord.word_en : currentWord.word_zh
    const msg = getFailMessage(correct, isEn)
    setFeedback({ correct: false, message: msg })
  }, [currentWord, isEn])

  // ==================== 下一题 ====================
  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= words.length) {
      setFinished(true)
      setStage('end')
    } else {
      setCurrentIndex((prev) => prev + 1)
      setGuess('')
      setHintsUsed(0)
      setGuessesThisRound(0)
      setFeedback(null)
      setStage('play')
    }
  }, [currentIndex, words.length])

  // ==================== 分享 ====================
  const handleShare = useCallback(() => {
    const title = getFinalTitle(score, words.length, isEn)
    const text = isEn
      ? `I played AI Draw & Guess and scored ${score}/${words.length} — "${title}"! Can you beat me? ✏️`
      : `我玩了 AI 你画我猜，得分 ${score}/${words.length} —「${title}」！来挑战我！✏️`
    const url = `${window.location.origin}/${locale}/play/ai-draw-guess`

    if (navigator.share) {
      navigator.share({ title: isEn ? 'AI Draw & Guess' : 'AI 你画我猜', text, url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(`${text} ${url}`).catch(() => {})
    }
  }, [score, words.length, isEn, locale])

  // ==================== 开始页 ====================
  if (stage === 'start') {
    return (
      <div className="text-center">
        <div className="mb-2 text-5xl">✏️</div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl">
          {isEn ? 'AI Draw & Guess' : 'AI 你画我猜'}
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {isEn
            ? 'AI draws abstract doodles. Can you figure out what they are?'
            : 'AI 负责画抽象图，你来猜它到底画的是什么。'}
        </p>

        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-left dark:border-zinc-800 dark:bg-zinc-900/50">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {isEn ? 'How to Play' : '玩法说明'}
          </h3>
          <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
            <li>{isEn ? '1. AI draws a random word — abstract style' : '1. AI 随机画一个词——抽象画风'}</li>
            <li>{isEn ? '2. Type your guess (up to 3 tries per drawing)' : '2. 输入你的猜测（每张图最多 3 次）'}</li>
            <li>{isEn ? '3. Use hints if stuck' : '3. 猜不出可以要提示'}</li>
            <li>{isEn ? `4. ${TOTAL_ROUNDS} drawings total. Get as many right as you can!` : `4. 共 ${TOTAL_ROUNDS} 道题，猜对越多越好！`}</li>
          </ul>
        </div>

        <button
          onClick={handleStart}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-rose-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-rose-600 active:scale-[0.98] dark:bg-rose-600 dark:hover:bg-rose-500"
        >
          {isEn ? 'Start Game' : '开始游戏'}
          <ArrowRight size={16} />
        </button>
      </div>
    )
  }

  // ==================== 游戏页 ====================
  if (stage === 'play' && currentWord) {
    const hintPool = isEn ? currentWord.hints_en : currentWord.hints_zh
    const currentHint = hintsUsed > 0 && hintsUsed <= hintPool.length ? hintPool[hintsUsed - 1] : null
    const category = isEn ? currentWord.category_en : currentWord.category_zh

    return (
      <div>
        {/* 顶栏 */}
        <div className="mb-4 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
            {category}
          </span>
          <span className="flex items-center gap-3">
            <span>
              {isEn ? 'Score' : '得分'}：<span className="font-semibold text-zinc-700 dark:text-zinc-300">{score}</span>
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-0.5 text-xs font-medium dark:bg-zinc-800">
              {currentIndex + 1} / {words.length}
            </span>
          </span>
        </div>

        {/* 图片 */}
        <div className="mb-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
          <img
            src={currentWord.image_url}
            alt={isEn ? 'AI drawing' : 'AI 画的图'}
            className="w-full object-cover"
            style={{ maxHeight: 300, objectFit: 'cover' }}
          />
        </div>

        {/* 提示区域 */}
        {currentHint && (
          <div className="mb-4 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-300">
            <Lightbulb size={15} className="mt-0.5 shrink-0" />
            <span>{currentHint}</span>
          </div>
        )}

        {/* 反馈消息 */}
        {feedback && !feedback.correct && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 dark:bg-red-950/30 dark:border-red-800 dark:text-red-300">
            {feedback.message}
          </div>
        )}

        {/* 输入区 */}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit()
            }}
            placeholder={isEn ? 'Your guess...' : '输入你的猜测...'}
            disabled={feedback?.correct === true}
            maxLength={60}
            className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-rose-400 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-rose-500"
          />
          <button
            onClick={handleSubmit}
            disabled={!guess.trim() || feedback?.correct === true}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500 text-white transition-colors hover:bg-rose-600 disabled:opacity-30 dark:bg-rose-600 dark:hover:bg-rose-500"
          >
            <Check size={17} />
          </button>
        </div>

        {/* 操作按钮 */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleHint}
            disabled={hintsUsed >= hintPool.length || feedback?.correct === true}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white py-2 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-30 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <HelpCircle size={13} />
            {isEn ? 'Hint' : '提示'} ({hintsUsed}/{hintPool.length})
          </button>
          <button
            onClick={handleSkip}
            disabled={feedback?.correct === true}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white py-2 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-30 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <SkipForward size={13} />
            {isEn ? 'Skip' : '跳过'}
          </button>
        </div>

        {/* 猜对 → 下一题 */}
        {feedback?.correct && (
          <div className="mt-4">
            <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/30">
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                {isEn ? 'Correct!' : '答对了！'}
              </p>
              <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
                {feedback.message}
              </p>
            </div>
            <button
              onClick={handleNext}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {currentIndex + 1 >= words.length
                ? (isEn ? 'See Results' : '查看结果')
                : (isEn ? 'Next' : '下一题')}
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* 猜错3次 → 揭晓 + 下一题 */}
        {feedback && !feedback.correct && guessesThisRound >= 3 && (
          <div className="mt-4">
            <button
              onClick={handleNext}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {currentIndex + 1 >= words.length
                ? (isEn ? 'See Results' : '查看结果')
                : (isEn ? 'Next' : '下一题')}
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    )
  }

  // ==================== 结束页 ====================
  if (stage === 'end') {
    const title = getFinalTitle(score, words.length, isEn)
    const ratio = score / (words.length || 1)

    return (
      <div className="text-center">
        <div className="mb-2 text-5xl">{ratio >= 0.7 ? '🏆' : ratio >= 0.5 ? '🎨' : '📚'}</div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {isEn ? 'Game Over!' : '游戏结束！'}
        </h2>

        {/* 分数 */}
        <div className="mt-4">
          <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">{score}</span>
          <span className="text-xl text-zinc-400"> / {words.length}</span>
        </div>

        {/* 称号 */}
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-4 py-1.5 text-sm font-semibold text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
          {title}
        </div>

        {/* 搞笑评语 */}
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          {isEn
            ? ratio >= 0.9
              ? 'Incredible! You and AI art are soulmates. The Louvre is calling.'
              : ratio >= 0.7
                ? 'Great job! You speak fluent AI doodle.'
                : ratio >= 0.5
                  ? 'Not bad! A few more rounds and you\'ll be an AI art expert.'
                  : 'The AI suggests you look at more abstract art... or maybe the drawings were just really bad.'
            : ratio >= 0.9
              ? '太强了！你跟 AI 抽象艺术灵魂契合，卢浮宫在向你招手。'
              : ratio >= 0.7
                ? '不错！你已经掌握了 AI 涂鸦的基本语法。'
                : ratio >= 0.5
                  ? '还行！再练练就能成为 AI 艺术鉴赏家了。'
                  : 'AI 建议你多看一点抽象画……或者，是它画得太烂了。'}
        </p>

        {/* 按钮 */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={handleStart}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <RefreshCw size={16} />
            {isEn ? 'Play Again' : '再玩一局'}
          </button>
          <button
            onClick={handleShare}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-500 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-600 active:scale-[0.98] dark:bg-rose-600 dark:hover:bg-rose-500"
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
