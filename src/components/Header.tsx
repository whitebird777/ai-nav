// 全局 Header
// 用途：Logo + 导航链接 + 暗色模式切换
// 响应式：移动端链接隐藏，保持简洁

import Link from 'next/link'
import Container from './Container'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <Container>
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-zinc-900 no-underline dark:text-zinc-100"
          >
            <span className="text-xl">🤖</span>
            <span className="hidden sm:inline">AI Nav</span>
          </Link>

          {/* 导航 + 主题切换 */}
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-1 text-sm">
              <Link
                href="/"
                className="rounded-md px-3 py-1.5 text-zinc-600 no-underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                首页
              </Link>
              <Link
                href="/about"
                className="rounded-md px-3 py-1.5 text-zinc-600 no-underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                关于
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  )
}
