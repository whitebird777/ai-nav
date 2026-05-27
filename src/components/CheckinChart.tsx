'use client'

import { useState, useEffect } from 'react'
import { getCheckinStats, getTotalCheckins, type DailyStats } from '@/lib/checkin'

export default function CheckinChart({ locale }: { locale: string }) {
  const isEn = locale === 'en'
  const [stats, setStats] = useState<DailyStats[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getCheckinStats(30), getTotalCheckins()]).then(([s, t]) => {
      setStats(s)
      setTotal(t)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="py-16 text-center">
        <p className="text-zinc-400">{isEn ? 'Loading...' : '加载中...'}</p>
      </div>
    )
  }

  const maxCount = Math.max(...stats.map((s) => s.count), 1)

  return (
    <div>
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {isEn ? 'Total Check-Ins' : '累计打卡次数'}
          </p>
          <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {total}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {isEn ? 'Today' : '今日打卡人数'}
          </p>
          <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {stats.length > 0 ? stats[stats.length - 1].count : 0}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {isEn ? 'Avg / Day (30d)' : '日均打卡 (30天)'}
          </p>
          <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {stats.length > 0 ? Math.round((stats.reduce((a, s) => a + s.count, 0) / stats.length) * 10) / 10 : 0}
          </p>
        </div>
      </div>

      {/* 柱状图 */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          {isEn ? 'Daily Check-In Trend (Last 30 Days)' : '每日打卡趋势（过去30天）'}
        </h3>
        <div className="flex items-end gap-1" style={{ height: 200 }}>
          {stats.map((s) => {
            const height = s.count > 0 ? `${Math.max((s.count / maxCount) * 100, 4)}%` : '0%'
            return (
              <div
                key={s.date}
                className="group relative flex flex-1 flex-col items-center justify-end"
              >
                <div
                  className="w-full rounded-t bg-zinc-900 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:hover:bg-zinc-300"
                  style={{ height }}
                  title={`${s.date}: ${s.count}`}
                />
                {/* tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-700">
                  {s.date.slice(5)}: {s.count}
                </div>
              </div>
            )
          })}
        </div>
        {/* x 轴标签 */}
        <div className="mt-2 flex">
          {stats.filter((_, i) => i % 7 === 0).map((s) => (
            <div key={s.date} className="flex-1 text-center text-[10px] text-zinc-400 dark:text-zinc-500">
              {s.date.slice(5)}
            </div>
          ))}
          <div className="flex-1 text-center text-[10px] text-zinc-400 dark:text-zinc-500">
            {stats.length > 0 ? stats[stats.length - 1].date.slice(5) : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
