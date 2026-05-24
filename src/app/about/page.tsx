// 关于页 — 静态 Server Component

import type { Metadata } from 'next'
import Container from '@/components/Container'

export const metadata: Metadata = {
  title: '关于',
  description: 'AI Nav 是一个 AI 工具导航站，帮你发现最好用的 AI 产品。',
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
              AI Nav 是一个简洁的 AI 工具导航站，致力于帮助用户发现好用的 AI
              产品。我们手工精选了 AI 聊天、AI 图像、AI 视频、AI 写作、AI
              效率、AI 编程等领域的工具。
            </p>

            <p>
              项目使用 Next.js + TailwindCSS + Supabase 构建，部署在
              Vercel 上。代码开源，欢迎贡献。
            </p>

            <p>
              如果你有好用的 AI 工具推荐，欢迎通过 GitHub Issues 提交。
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              本网站为个人练手项目，持续迭代中。
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
