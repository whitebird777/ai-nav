// 全局 Footer — 产品页脚
// 三列布局：品牌介绍 + 导航链接 + 版权声明

import Link from 'next/link'
import Container from './Container'

export default function Footer() {
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
              精选 AI 工具导航站。持续整理优秀的人工智能产品，
              帮助每个人快速发现真正好用的 AI 工具。
            </p>
          </div>

          {/* 导航 */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              导航
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-zinc-500 no-underline transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  首页
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-zinc-500 no-underline transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  关于
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
              本站仅提供导航服务，不对第三方工具内容负责。
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
