// AI 时间胶囊 — /play/time-capsule

import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import Container from '@/components/Container'
import TimeCapsuleGame from '@/components/TimeCapsuleGame'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://nav4i.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const title =
    locale === 'zh'
      ? 'AI 时间胶囊 — 给未来写一封信'
      : 'AI Time Capsule — Write to the Future'
  const description =
    locale === 'zh'
      ? '给未来的自己写一封信，AI 替你封存在时间深处。选一个日期，让未来的你收到此刻的心意。'
      : 'Write a letter to your future self. AI will seal it deep in time. Pick a date and let your future self receive this moment.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/play/time-capsule`,
      languages: {
        zh: `${BASE_URL}/zh/play/time-capsule`,
        en: `${BASE_URL}/en/play/time-capsule`,
      },
    },
    openGraph: { title, description, type: 'website', url: `${BASE_URL}/${locale}/play/time-capsule` },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function TimeCapsulePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* 顶部导航 */}
      <div className="border-b border-zinc-800">
        <Container>
          <Link
            href="/play"
            className="inline-flex items-center gap-1.5 py-4 text-sm text-zinc-500 no-underline hover:text-zinc-300"
          >
            <ArrowLeft size={16} />
            {locale === 'zh' ? '返回娱乐大厅' : 'Back to Playground'}
          </Link>
        </Container>
      </div>

      <Container>
        <div className="py-8 sm:py-12">
          {/* 标题 */}
          <div className="mb-12 text-center">
            <PageTitle locale={locale} />
          </div>

          <TimeCapsuleGame locale={locale} />
        </div>
      </Container>
    </div>
  )
}

function PageTitle({ locale }: { locale: string }) {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
        {locale === 'zh' ? '⏳ 给未来的自己留一句话' : '⏳ Leave a Word for Your Future Self'}
      </h1>
      <p className="mt-3 text-zinc-500">
        {locale === 'zh'
          ? 'AI 将替你封存在时间深处'
          : 'AI will seal it deep in time for you'}
      </p>
    </>
  )
}
