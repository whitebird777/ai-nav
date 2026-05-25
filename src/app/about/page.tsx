// 关于页 — 产品理念

import type { Metadata } from 'next'
import Container from '@/components/Container'

export const metadata: Metadata = {
  title: '关于',
  description:
    'AI Nav 是一个精选 AI 工具导航站，帮助每个人快速发现真正好用的 AI 产品。',
}

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-12">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            关于 AI Nav
          </h1>

          <div className="space-y-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                为什么会有这个网站
              </h2>
              <p>
                AI 工具正在以惊人的速度涌现，每天都有新产品上线。
                但对于普通用户来说，在海量信息中发现真正好用、值得信赖的工具变得越来越困难。
              </p>
              <p className="mt-3">
                AI Nav 的初衷很简单：做一层过滤，把经过筛选的优质 AI 工具整理在一起，
                让你不必在信息洪流中大海捞针。
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                我们的方式
              </h2>
              <p>
                我们不追求收录数量，而是注重质量和实用性。
                每个收录的工具都经过实际体验，确保它是真正能解决问题的产品，
                而非昙花一现的营销噱头。
              </p>
              <p className="mt-3">
                目前的分类覆盖了 AI 聊天、图像、视频、写作、编程、音乐、
                搜索、Agent、翻译、办公、设计、效率、PPT 等主流方向，
                未来会随着 AI 领域的发展持续扩展。
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                联系我们
              </h2>
              <p>
                如果你有好的 AI 工具推荐，或者发现信息有误，
                欢迎通过 GitHub 提交 Issue 或直接联系我们。
                你的反馈会直接帮助我们改进。
              </p>
            </section>

            <p className="mt-8 text-zinc-400 dark:text-zinc-500" dir="rtl" lang="ar">
              إلى نادية، الفتاة التي تعيش في وهران، الجزائر: أتمنى لكِ السعادة والفرح كل يوم!
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
