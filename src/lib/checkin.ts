// 每日打卡 — localStorage + Supabase
// 无登录：每个浏览器一个唯一标识，同一天只能打卡一次

import { supabase } from './supabase'

const STORAGE_KEY = 'ai_nav_checkin'
const USER_KEY = 'ai_nav_user_id'

function getUserId(): string {
  let id = localStorage.getItem(USER_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(USER_KEY, id)
  }
  return id
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD
}

interface CheckinState {
  lastDate: string | null
  streak: number
}

export function getCheckinState(): CheckinState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { lastDate: null, streak: 0 }
}

export function hasCheckedInToday(): boolean {
  const { lastDate } = getCheckinState()
  return lastDate === getToday()
}

export async function doCheckin(): Promise<{ success: boolean; streak: number; message: string }> {
  const today = getToday()
  const state = getCheckinState()

  if (state.lastDate === today) {
    return { success: false, streak: state.streak, message: 'already_checked_in' }
  }

  const userId = getUserId()

  // 写入 Supabase（失败也继续，localStorage 兜底）
  try {
    await supabase.from('daily_checkins').insert({
      user_identifier: userId,
      checkin_date: today,
    })
  } catch { /* Supabase 失败不影响本地打卡 */ }

  // 计算连续天数
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().slice(0, 10)

  const newStreak = state.lastDate === yesterdayStr ? state.streak + 1 : 1

  const newState: CheckinState = { lastDate: today, streak: newStreak }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))

  return { success: true, streak: newStreak, message: 'checkin_success' }
}

export interface DailyStats {
  date: string
  count: number
}

export async function getCheckinStats(days: number = 30): Promise<DailyStats[]> {
  const since = new Date()
  since.setDate(since.getDate() - days)
  const sinceStr = since.toISOString().slice(0, 10)

  const { data } = await supabase
    .from('daily_checkins')
    .select('checkin_date')
    .gte('checkin_date', sinceStr)

  if (!data) return []

  const counts: Record<string, number> = {}
  for (const row of data) {
    const d = row.checkin_date as string
    counts[d] = (counts[d] || 0) + 1
  }

  // 补全所有日期
  const result: DailyStats[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const ds = d.toISOString().slice(0, 10)
    result.push({ date: ds, count: counts[ds] || 0 })
  }

  return result
}

export async function getTotalCheckins(): Promise<number> {
  const { count } = await supabase
    .from('daily_checkins')
    .select('*', { count: 'exact', head: true })

  return count ?? 0
}
