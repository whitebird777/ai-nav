// 响应式容器 — 统一页面最大宽度和水平内边距
// 用途：包裹所有页面内容，保证对齐一致

import type { ReactNode } from 'react'

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
