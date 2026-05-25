// 全局 Footer — locale-aware

'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Container from './Container'

export default function Footer() {
  const t = useTranslations('common')
  const tf = useTranslations('footer')

  return (
    <footer className="border-t border-zinc-200 py-12 dark:border-zinc-800">
      <Container>
        <div className="grid gap-8 sm:grid-cols-3">
          {/* 品牌 */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold text-zinc-900 no-underline dark:text-zinc-100"
            >
              <span>🤖</span>
              <span>AI Nav</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {tf('description')}
            </p>
          </div>

          {/* 导航 */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {t('navigation')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-zinc-500 no-underline transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {t('homepage')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-zinc-500 no-underline transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/whitebird777/ai-nav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 no-underline transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* 版权 */}
          <div className="sm:text-right">
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              &copy; {new Date().getFullYear()} AI Nav
            </p>
            <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
              {t('disclaimer')}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
