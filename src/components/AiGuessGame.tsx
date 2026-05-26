'use client'

import { useState, useCallback } from 'react'
import { ArrowRight, Check, X } from 'lucide-react'
import type { Puzzle } from '@/lib/puzzles'

interface Props {
  puzzles: Puzzle[]
  locale: string
}

export default function AiGuessGame({ puzzles, locale }: Props) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const puzzle = puzzles[index]
  if (!puzzle) return null

  const isEn = locale === 'en'
  const title = isEn && puzzle.title_en ? puzzle.title_en : puzzle.title
  const options = isEn && puzzle.options_en ? puzzle.options_en : puzzle.options
  const successText = isEn && puzzle.funny_success_text_en ? puzzle.funny_success_text_en : puzzle.funny_success_text
  const failText = isEn && puzzle.funny_fail_text_en ? puzzle.funny_fail_text_en : puzzle.funny_fail_text

  const handleSelect = (optionIndex: number) => {
    if (showResult) return
    setSelected(optionIndex)
    setShowResult(true)
  }

  const handleNext = useCallback(() => {
    setSelected(null)
    setShowResult(false)
    setIndex((prev) => (prev + 1) % puzzles.length)
  }, [puzzles.length])

  const isCorrect = selected === puzzle.correct_answer

  return (
    <div>
      {/* 进度 */}
      <div className="mb-6 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <span>{isEn ? 'AI Guess' : 'AI 猜画'}</span>
        <span>
          {index + 1} / {puzzles.length}
        </span>
      </div>

      {/* 图片 */}
      <div className="mb-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
        <img
          src={puzzle.image_url}
          alt="AI 生成的图片"
          className="w-full object-cover"
          style={{ maxHeight: 360, objectFit: 'cover' }}
        />
      </div>

      {/* 问题标题 */}
      <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl">
        {title}
      </h2>

      {/* 选项 */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        {options.map((option, i) => {
          let btnClass =
            'relative rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-150 '

          if (!showResult) {
            btnClass +=
              'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800'
          } else if (i === puzzle.correct_answer) {
            btnClass +=
              'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
          } else if (i === selected && !isCorrect) {
            btnClass +=
              'border-red-300 bg-red-50 text-red-800 dark:border-red-700 dark:bg-red-950 dark:text-red-300'
          } else {
            btnClass +=
              'border-zinc-100 bg-zinc-50 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-600'
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className={btnClass}
            >
              <span className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{option}</span>
              </span>
              {showResult && i === puzzle.correct_answer && (
                <Check
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400"
                />
              )}
              {showResult && i === selected && !isCorrect && (
                <X
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 dark:text-red-400"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* 反馈 */}
      {showResult && (
        <div className="mb-6">
          <div
            className={`rounded-xl border p-4 ${
              isCorrect
                ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950'
                : 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950'
            }`}
          >
            <p
              className={`text-sm font-semibold ${
                isCorrect
                  ? 'text-emerald-800 dark:text-emerald-300'
                  : 'text-amber-800 dark:text-amber-300'
              }`}
            >
              {isCorrect ? (isEn ? 'Correct!' : '答对了！') : (isEn ? 'Wrong!' : '猜错了！')}
            </p>
            <p
              className={`mt-1 text-sm ${
                isCorrect
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-amber-700 dark:text-amber-400'
              }`}
            >
              {isCorrect ? successText : failText}
            </p>
          </div>

          {/* 下一题按钮 */}
          <button
            onClick={handleNext}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-auto sm:px-8"
          >
            {isEn ? 'Next' : '下一题'}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
