// 全局 Header — locale-aware
// Logo + 导航链接 + GitHub + 提交工具 + 语言切换 + 暗色模式切换

'use client'

import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'
import Container from './Container'
import ThemeToggle from './ThemeToggle'
import { Heart } from 'lucide-react'

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

export default function Header() {
  const t = useTranslations('common')
  const locale = useLocale()
  const pathname = usePathname()

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

          {process.env.NEXT_PUBLIC_SHOW_ADMIN === 'true' && (
            <Link
              href="/admin/checkins"
              title="Stats"
              className="ml-0.5 hidden text-sm leading-none text-zinc-300 no-underline sm:inline dark:text-zinc-600"
              style={{ cursor: 'default' }}
            >
              ·
            </Link>
          )}

          {/* 右侧操作区 */}
          <div className="flex items-center gap-1">
            <nav className="flex items-center gap-1 text-sm">
              <Link
                href="/"
                className="rounded-md px-3 py-1.5 text-zinc-600 no-underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                {t('homepage')}
              </Link>
              <Link
                href="/about"
                className="rounded-md px-3 py-1.5 text-zinc-600 no-underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                {t('about')}
              </Link>
              <Link
                href="/favorites"
                className="flex items-center gap-1 rounded-md px-3 py-1.5 text-zinc-600 no-underline hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400"
              >
                <Heart size={14} />
                <span>{locale === 'zh' ? '收藏' : 'Favs'}</span>
              </Link>
            </nav>

            {/* GitHub */}
            <a
              href="https://github.com/whitebird777/ai-nav"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md px-2 py-1.5 text-zinc-500 no-underline transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 sm:inline-flex sm:items-center sm:gap-1.5"
              aria-label={t('github')}
            >
              <GitHubIcon size={16} />
              <span className="hidden md:inline">GitHub</span>
            </a>

            {/* 提交工具 */}
            <Link
              href="https://github.com/whitebird777/ai-nav/issues/new?title=%E6%8F%90%E4%BA%A4%E5%B7%A5%E5%85%B7%3A+%5B%E5%B7%A5%E5%85%B7%E5%90%8D%E7%A7%B0%5D&labels=tool-submission"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white no-underline transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {t('submitTool')}
            </Link>

            {/* 语言切换器 */}
            <div className="flex items-center rounded-lg border border-zinc-200 p-0.5 dark:border-zinc-700">
              <Link
                href={pathname}
                locale="zh"
                className={`rounded px-1.5 py-1 text-xs font-medium no-underline transition-colors ${
                  locale === 'zh'
                    ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
                    : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300'
                }`}
              >
                中
              </Link>
              <Link
                href={pathname}
                locale="en"
                className={`rounded px-1.5 py-1 text-xs font-medium no-underline transition-colors ${
                  locale === 'en'
                    ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
                    : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300'
                }`}
              >
                EN
              </Link>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  )
}
