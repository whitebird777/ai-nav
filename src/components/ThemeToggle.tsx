// 暗色模式切换按钮
// 用途：点击切换 light/dark，图标随状态变化
// 依赖：next-themes 的 useTheme hook

'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 避免 SSR 水合不匹配 — 挂载后才渲染图标
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button
        className="h-9 w-9 rounded-lg border border-zinc-200 dark:border-zinc-800"
        aria-label="切换主题"
      />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
      aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
