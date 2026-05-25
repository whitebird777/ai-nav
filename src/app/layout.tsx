// RootLayout — 最小壳
// 所有实际渲染在 src/app/[locale]/layout.tsx 中完成

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'AI Nav — 发现最好用的 AI 工具',
    template: '%s | AI Nav',
  },
  description:
    '汇集最实用的 AI 工具，帮你发现 ChatGPT、Midjourney、Cursor 等好用的 AI 产品。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning className="h-full">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
