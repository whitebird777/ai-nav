// 数据库类型 — 与 Supabase 表结构一一对应

export interface Category {
  id: string
  slug: string
  name: string
  name_en: string | null
  icon: string | null
  sort_order: number
  created_at: string
}

export interface Tool {
  id: string
  slug: string
  name: string
  description: string
  url: string
  category_id: string
  tags: string[]
  logo_url: string | null
  pricing: 'free' | 'freemium' | 'paid' | null
  featured: boolean
  view_count: number
  language: string
  created_at: string
  updated_at: string
}

// 前端使用 — Tool 携带关联的 category 名称
export interface ToolWithCategory extends Tool {
  category_name: string
  category_slug: string
}
