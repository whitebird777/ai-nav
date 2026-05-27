// 我的收藏 — /favorites

import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import Container from '@/components/Container'
import FavoritesContent from '@/components/FavoritesContent'
import { ArrowLeft } from 'lucide-react'

const BASE_URL = 'https://nav4i.com'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const title = locale === 'zh' ? '我的收藏 — AI Nav' : 'My Favorites — AI Nav'
  const description =
    locale === 'zh'
      ? '查看你收藏的 AI 工具和娱乐游戏。'
      : 'View your bookmarked AI tools and games.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/favorites`,
      languages: {
        zh: `${BASE_URL}/zh/favorites`,
        en: `${BASE_URL}/en/favorites`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/favorites`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function FavoritesPage({
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

        <div className="mb-10">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            {locale === 'zh' ? '❤️ 我的收藏' : '❤️ My Favorites'}
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            {locale === 'zh'
              ? '你收藏的 AI 工具和娱乐游戏都在这里。'
              : 'Your bookmarked AI tools and games, all in one place.'}
          </p>
        </div>

        <FavoritesContent locale={locale} />
      </Container>
    </div>
  )
}
