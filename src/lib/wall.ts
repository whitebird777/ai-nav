// AI 时光墙 v2 — 回复 + 点赞排序 + 管理员删除

import { supabase } from './supabase'

export interface WallMessage {
  id: number
  parent_id: number | null
  nickname: string
  content: string
  tag: string | null
  likes: number
  created_at: string
  replies?: WallMessage[]
}

// ====== API ======

/** 获取顶级留言（按点赞数降序）+ 各自的回复 */
export async function fetchMessages(limit = 50): Promise<WallMessage[]> {
  const { data: top } = await supabase
    .from('ai_wall_messages')
    .select('*')
    .is('parent_id', null)
    .order('likes', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (!top) return []

  // 批量获取所有回复
  const ids = top.map((m) => m.id)
  const { data: replies } = await supabase
    .from('ai_wall_messages')
    .select('*')
    .in('parent_id', ids)
    .order('created_at', { ascending: true })

  const replyMap: Record<number, WallMessage[]> = {}
  if (replies) {
    for (const r of replies) {
      const pid = r.parent_id as number
      if (!replyMap[pid]) replyMap[pid] = []
      replyMap[pid].push(r as WallMessage)
    }
  }

  return (top as WallMessage[]).map((m) => ({
    ...m,
    replies: replyMap[m.id] || [],
  }))
}

/** 发布留言或回复 */
export async function postMessage(
  nickname: string,
  content: string,
  tag: string | null,
  parentId: number | null,
): Promise<WallMessage | null> {
  const { data, error } = await supabase
    .from('ai_wall_messages')
    .insert({
      nickname: nickname || '匿名',
      content,
      tag: parentId ? null : tag,
      parent_id: parentId,
    })
    .select()
    .single()

  if (error) {
    console.error('postMessage error:', error)
    return null
  }

  return data as WallMessage
}

/** 点赞 */
export async function likeMessage(id: number): Promise<number | null> {
  const { data: current } = await supabase
    .from('ai_wall_messages')
    .select('likes')
    .eq('id', id)
    .single()

  if (!current) return null

  const newLikes = (current.likes || 0) + 1

  const { error } = await supabase
    .from('ai_wall_messages')
    .update({ likes: newLikes })
    .eq('id', id)

  if (error) return null
  return newLikes
}

/** 管理员删除 */
export async function deleteMessage(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('ai_wall_messages')
    .delete()
    .eq('id', id)

  return !error
}
