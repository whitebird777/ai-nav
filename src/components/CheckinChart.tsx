'use client'

import { useState, useEffect } from 'react'
import { getCheckinStats, type DailyStats } from '@/lib/checkin'

export default function CheckinChart({ locale }: { locale: string }) {
  const isEn = locale === 'en'
  const [stats, setStats] = useState<DailyStats[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    getCheckinStats(7)
      .then(setStats)
      .catch(() => setError(true))
  }, [])

  if (error) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-800 dark:bg-amber-950">
        <p className="text-amber-700 dark:text-amber-400">
          {isEn ? 'Failed to load data. Please try again later.' : '数据加载失败，请稍后重试。'}
        </p>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-700 dark:border-t-zinc-400" />
        <p className="mt-3 text-sm text-zinc-400">{isEn ? 'Loading...' : '加载中...'}</p>
      </div>
    )
  }

  const total7 = stats.reduce((a, s) => a + s.count, 0)
  const todayCount = stats[stats.length - 1]?.count ?? 0
  const maxCount = Math.max(...stats.map((s) => s.count), 1)

  return (
    <div>
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {isEn ? '7-Day Total' : '7天累计'}
          </p>
          <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {total7}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {isEn ? 'Today' : '今日打卡'}
          </p>
          <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {todayCount}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {isEn ? 'Avg / Day' : '日均打卡'}
          </p>
          <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {Math.round((total7 / 7) * 10) / 10}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          {isEn ? 'Last 7 Days' : '过去 7 天'}
        </h3>
        <div className="flex items-end gap-2" style={{ height: 160 }}>
          {stats.map((s) => {
            const pct = s.count > 0 ? Math.max((s.count / maxCount) * 100, 8) : 0
            return (
              <div key={s.date} className="group relative flex flex-1 flex-col items-center justify-end">
                <div
                  className="w-full rounded-t bg-zinc-800 transition-colors hover:bg-zinc-600 dark:bg-zinc-200 dark:hover:bg-zinc-400"
                  style={{ height: `${pct}%` }}
                />
                <span className="mt-1.5 text-[11px] tabular-nums text-zinc-500 dark:text-zinc-400">
                  {s.count}
                </span>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-0.5 text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-200 dark:text-zinc-800">
                  {s.date.slice(5)} · {s.count}
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-2 flex">
          {stats.map((s) => (
            <div key={s.date} className="flex-1 text-center text-[10px] text-zinc-400 dark:text-zinc-500">
              {s.date.slice(5)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
