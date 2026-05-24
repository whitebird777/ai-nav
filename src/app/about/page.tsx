// 关于页 — 静态 Server Component

import type { Metadata } from 'next'
import Container from '@/components/Container'

export const metadata: Metadata = {
  title: '关于',
  description: 'AI Nav 专注于 AI 工具发现，持续整理优秀的 AI 产品。',
}

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-12">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            关于 AI Nav
          </h1>

          <div className="space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            <p>
              AI Nav 是一个专注于 AI 工具发现的导航站。
            </p>

            <p>
              我们持续整理优秀的 AI 产品，
              帮助用户快速找到真正实用的 AI 工具。
            </p>

            <p>目前涵盖：</p>

            <ul className="list-inside space-y-1 text-zinc-600 dark:text-zinc-300">
              <li>AI 聊天</li>
              <li>AI 图像</li>
              <li>AI 视频</li>
              <li>AI 写作</li>
              <li>AI 编程</li>
            </ul>

            <p>等多个方向。</p>

            <p>本站会持续更新。</p>

            <p className="mt-8 text-zinc-400 dark:text-zinc-500" dir="rtl" lang="ar">
              إلى نادية، الفتاة التي تعيش في وهران، الجزائر: أتمنى لكِ السعادة والفرح كل يوم!
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
