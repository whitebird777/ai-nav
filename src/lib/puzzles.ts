// AI 猜画 — 题库查询

import { supabase } from './supabase'

export interface Puzzle {
  id: number
  title: string
  image_url: string
  options: string[]
  correct_answer: number
  funny_success_text: string
  funny_fail_text: string
}

export async function getPuzzles(): Promise<Puzzle[]> {
  const { data, error } = await supabase
    .from('ai_guess_puzzles')
    .select('*')
    .order('id', { ascending: true })

  // 表尚未创建或查询出错时返回空数组，避免 SSG 构建崩溃
  if (error) {
    console.warn('getPuzzles: returning empty,', error.message)
    return []
  }
  return (data as Puzzle[]) || []
}
