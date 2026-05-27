// 收藏系统 — localStorage MVP
//
// 数据模型：
//   localStorage key: "ai_nav_favorites"
//   value: JSON { tools: string[], games: { id, name_zh, name_en, icon, desc_zh, desc_en, path }[] }
//
// 未来 Supabase 升级（需用户登录）：
//   CREATE TABLE favorites (
//     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
//     item_type TEXT NOT NULL CHECK (item_type IN ('tool', 'game')),
//     item_id   TEXT NOT NULL,
//     metadata  JSONB DEFAULT '{}',
//     created_at TIMESTAMPTZ DEFAULT NOW(),
//     UNIQUE(user_id, item_type, item_id)
//   );
//   CREATE INDEX idx_favorites_user ON favorites(user_id);

export interface FavoriteGame {
  id: string
  name_zh: string
  name_en: string
  icon: string
  desc_zh: string
  desc_en: string
  path: string
}

interface FavoritesData {
  tools: string[]
  games: FavoriteGame[]
}

function getStorage(): FavoritesData {
  if (typeof window === 'undefined') return { tools: [], games: [] }
  try {
    const raw = localStorage.getItem('ai_nav_favorites')
    if (!raw) return { tools: [], games: [] }
    return JSON.parse(raw) as FavoritesData
  } catch {
    return { tools: [], games: [] }
  }
}

function setStorage(data: FavoritesData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('ai_nav_favorites', JSON.stringify(data))
}

export function isFavorite(type: 'tool' | 'game', id: string): boolean {
  const data = getStorage()
  if (type === 'tool') return data.tools.includes(id)
  return data.games.some((g) => g.id === id)
}

export function addFavorite(type: 'tool', id: string, _meta?: never): void
export function addFavorite(type: 'game', id: string, meta: FavoriteGame): void
export function addFavorite(type: 'tool' | 'game', id: string, meta?: FavoriteGame): void {
  const data = getStorage()
  if (type === 'tool') {
    if (!data.tools.includes(id)) data.tools.push(id)
  } else if (meta) {
    if (!data.games.some((g) => g.id === id)) data.games.push(meta)
  }
  setStorage(data)
}

export function removeFavorite(type: 'tool' | 'game', id: string): void {
  const data = getStorage()
  if (type === 'tool') {
    data.tools = data.tools.filter((s) => s !== id)
  } else {
    data.games = data.games.filter((g) => g.id !== id)
  }
  setStorage(data)
}

export function toggleFavorite(type: 'tool', id: string, _meta?: never): boolean
export function toggleFavorite(type: 'game', id: string, meta: FavoriteGame): boolean
export function toggleFavorite(type: 'tool' | 'game', id: string, meta?: FavoriteGame): boolean {
  if (isFavorite(type, id)) {
    removeFavorite(type, id)
    return false
  }
  if (type === 'game' && meta) {
    addFavorite('game', id, meta)
  } else if (type === 'tool') {
    addFavorite('tool', id)
  }
  return true
}

export function getFavoriteTools(): string[] {
  return getStorage().tools
}

export function getFavoriteGames(): FavoriteGame[] {
  return getStorage().games
}
