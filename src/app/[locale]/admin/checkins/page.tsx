// 每日打卡管理后台 — /admin/checkins

import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import Container from '@/components/Container'
import CheckinChart from '@/components/CheckinChart'
import { ArrowLeft } from 'lucide-react'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'zh' ? '打卡数据 — AI Nav Admin' : 'Check-In Data — AI Nav Admin',
    description:
      locale === 'zh'
        ? '每日打卡趋势和数据统计。'
        : 'Daily check-in trends and statistics.',
    robots: 'noindex, nofollow',
  }
}

export default async function AdminCheckinsPage({
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
            {locale === 'zh' ? '📊 打卡数据' : '📊 Check-In Data'}
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            {locale === 'zh'
              ? '每日打卡人数趋势。'
              : 'Daily check-in count trends.'}
          </p>
        </div>

        <CheckinChart locale={locale} />
      </Container>
    </div>
  )
}
