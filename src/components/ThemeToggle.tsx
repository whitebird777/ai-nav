// 暗色模式切换按钮 — locale-aware

'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('common')

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button
        className="h-9 w-9 rounded-lg border border-zinc-200 dark:border-zinc-800"
        aria-label={t('toggleTheme')}
      />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
      aria-label={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
