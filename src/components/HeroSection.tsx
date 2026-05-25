// Hero 区域 — 首页标语 + 动态数字统计
// Client Component：计数动画需要 useEffect + IntersectionObserver

'use client'

import { useState, useEffect, useRef } from 'react'
import Container from './Container'

interface HeroStats {
  toolCount: number
  categoryCount: number
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          observer.disconnect()

          const duration = 2000
          const start = performance.now()
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(2, -10 * progress)
            setDisplay(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{display}</span>
}

function StatItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-bold tabular-nums text-zinc-900 dark:text-zinc-100 sm:text-4xl">
        <AnimatedNumber value={value} />
      </span>
      <span className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
        {label}
      </span>
    </div>
  )
}

export default function HeroSection({ toolCount, categoryCount }: HeroStats) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white pb-16 pt-20 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 sm:pb-20 sm:pt-28">
      {/* 装饰光斑 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-zinc-200/40 blur-3xl dark:bg-zinc-700/20" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-zinc-200/30 blur-3xl dark:bg-zinc-700/10" />
      </div>

      <Container>
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            AI TOOLS NAVIGATOR
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl lg:text-6xl">
            发现最好用的{' '}
            <span className="bg-gradient-to-r from-zinc-900 to-zinc-500 bg-clip-text text-transparent dark:from-zinc-100 dark:to-zinc-400">
              AI 工具
            </span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-xl">
            汇集精选 AI 产品，助你高效发现与选择
          </p>

          {/* 动态统计 */}
          <div className="mt-10 flex items-center justify-center gap-8 sm:gap-12">
            <StatItem value={toolCount} label="工具" />
            <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800" />
            <StatItem value={categoryCount} label="分类" />
          </div>
        </div>
      </Container>
    </section>
  )
}
