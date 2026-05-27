// AI 时光墙 — /wall

import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import Container from '@/components/Container'
import WallContent from '@/components/WallContent'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://nav4i.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const title = locale === 'zh' ? 'AI 时光墙 — AI Nav' : 'AI Time Wall — AI Nav'
  const description =
    locale === 'zh'
      ? '在这里留下你的足迹，让 AI 陪你聊聊天。'
      : 'Leave your footprint here. Let AI chat with you.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/wall`,
      languages: {
        zh: `${BASE_URL}/zh/wall`,
        en: `${BASE_URL}/en/wall`,
      },
    },
    openGraph: { title, description, type: 'website', url: `${BASE_URL}/${locale}/wall` },
    twitter: { card: 'summary', title, description },
  }
}

export default async function WallPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 no-underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ArrowLeft size={16} />
          {locale === 'zh' ? '返回首页' : 'Back to Home'}
        </Link>

        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            {locale === 'zh' ? '🖼️ AI 时光墙' : '🖼️ AI Time Wall'}
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            {locale === 'zh'
              ? '在这里留下你的足迹，让 AI 陪你聊聊天。'
              : 'Leave your footprint here. Let AI chat with you.'}
          </p>
        </div>

        <WallContent locale={locale} />
      </Container>
    </div>
  )
}
