// 数据查询函数 — 从 Supabase 获取工具和分类

import { supabase } from './supabase'
import type { Tool, Category, ToolWithCategory } from './types'

// ==================== 分类 ====================

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data
}

// ==================== 工具 ====================

export async function getTools(options?: {
  category?: string
  search?: string
  featured?: boolean
}): Promise<ToolWithCategory[]> {
  let query = supabase
    .from('tools')
    .select('*, categories!inner(name, slug)')
    .order('created_at', { ascending: false })

  if (options?.category) {
    query = query.eq('categories.slug', options.category)
  }
  if (options?.search) {
    // 搜索工具名、描述、标签
    query = query.or(
      `name.ilike.%${options.search}%,description.ilike.%${options.search}%`
    )
  }
  if (options?.featured) {
    query = query.eq('featured', true)
  }

  const { data, error } = await query

  if (error) throw error

  return (data || []).map((item: Record<string, unknown>) => {
    const cat = item.categories as Record<string, string> | null
    return {
      ...item,
      category_name: cat?.name ?? '',
      category_slug: cat?.slug ?? '',
    } as ToolWithCategory
  })
}

export async function getToolBySlug(
  slug: string
): Promise<ToolWithCategory | null> {
  const { data, error } = await supabase
    .from('tools')
    .select('*, categories!inner(name, slug)')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // not found
    throw error
  }

  const item = data as Record<string, unknown>
  const cat = item.categories as Record<string, string> | null
  return {
    ...(item as Tool),
    category_name: cat?.name ?? '',
    category_slug: cat?.slug ?? '',
  }
}

export async function getToolSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('slug')

  if (error) throw error
  return data.map((t: { slug: string }) => t.slug)
}

export async function getCategorySlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('slug')

  if (error) throw error
  return data.map((c: { slug: string }) => c.slug)
}
