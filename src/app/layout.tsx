// RootLayout — 全局布局壳
// 职责：ThemeProvider、Header、Footer、全局 Metadata

import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "AI Nav — 发现最好用的 AI 工具",
    template: "%s | AI Nav",
  },
  description: "汇集最实用的 AI 工具，帮你发现 ChatGPT、Midjourney、Cursor 等好用的 AI 产品。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className="h-full"
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
