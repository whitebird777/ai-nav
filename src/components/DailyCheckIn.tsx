'use client'

import { useState, useEffect, useCallback } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { hasCheckedInToday, doCheckin, getCheckinState } from '@/lib/checkin'

export default function DailyCheckIn({ locale }: { locale: string }) {
  const isEn = locale === 'en'

  const [checked, setChecked] = useState(false)
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const state = getCheckinState()
    if (state.lastDate) {
      const today = new Date().toISOString().slice(0, 10)
      if (state.lastDate === today) {
        setChecked(true)
      }
    }
    setStreak(state.streak)
  }, [])

  const handleCheckin = useCallback(async () => {
    if (checked || loading) return
    setLoading(true)
    const result = await doCheckin()
    if (result.success) {
      setChecked(true)
      setStreak(result.streak)
      setAnimating(true)
      setTimeout(() => setAnimating(false), 2000)
    }
    setLoading(false)
  }, [checked, loading])

  if (checked) {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-medium text-emerald-700 transition-all duration-300 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 ${
          animating ? 'scale-110 shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/30' : ''
        }`}
      >
        <Check size={16} className="shrink-0" />
        <span>{isEn ? 'Checked In Today' : '今日已打卡'}</span>
        {streak > 1 && (
          <span className="ml-1 rounded-full bg-emerald-200 px-2 py-0.5 text-xs dark:bg-emerald-800">
            {isEn ? `${streak} days` : `连续 ${streak} 天`}
          </span>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={handleCheckin}
      disabled={loading}
      className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:border-zinc-400 hover:shadow-md active:scale-95 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600"
    >
      <Sparkles
        size={16}
        className="shrink-0 text-amber-500 transition-transform group-hover:scale-110"
      />
      <span>{loading ? '...' : isEn ? 'Daily Check-In' : '今日打卡'}</span>
      {streak > 1 && (
        <span className="ml-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
          {isEn ? `${streak} days` : `连续 ${streak} 天`}
        </span>
      )}
    </button>
  )
}
