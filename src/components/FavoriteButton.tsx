'use client'

import { useState, useCallback } from 'react'
import { Heart } from 'lucide-react'
import { toggleFavorite, isFavorite, type FavoriteGame } from '@/lib/favorites'

interface ToolProps {
  type: 'tool'
  id: string
  gameMeta?: never
  size?: 'sm' | 'md'
}

interface GameProps {
  type: 'game'
  id: string
  gameMeta: FavoriteGame
  size?: 'sm' | 'md'
}

type Props = ToolProps | GameProps

export default function FavoriteButton({ type, id, gameMeta, size = 'sm' }: Props) {
  const [fav, setFav] = useState(() => isFavorite(type, id))

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const nowFav = type === 'game' && gameMeta
        ? toggleFavorite('game', id, gameMeta)
        : toggleFavorite('tool' as any, id)
      setFav(nowFav)
    },
    [type, id, gameMeta]
  )

  const dims = size === 'md' ? 'h-8 w-8' : 'h-7 w-7'
  const iconSize = size === 'md' ? 15 : 13

  return (
    <button
      onClick={handleClick}
      className={`${dims} flex shrink-0 items-center justify-center rounded-lg transition-colors ${
        fav
          ? 'bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900'
          : 'bg-zinc-100 text-zinc-400 hover:bg-red-50 hover:text-red-400 dark:bg-zinc-800 dark:text-zinc-500 dark:hover:bg-red-950 dark:hover:text-red-400'
      }`}
      aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart size={iconSize} fill={fav ? 'currentColor' : 'none'} />
    </button>
  )
}
