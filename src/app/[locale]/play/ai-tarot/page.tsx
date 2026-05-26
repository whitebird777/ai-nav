// AI 塔罗占卜 — /play/ai-tarot

import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import Container from '@/components/Container'
import AiTarotGame from '@/components/AiTarotGame'
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

  const title = locale === 'zh' ? 'AI 塔罗占卜 — 抽牌解读' : 'AI Tarot — Card Reading'
  const description =
    locale === 'zh'
      ? '抽三张塔罗牌，让 AI 为你解读命运的暗示。仅供娱乐，切勿迷信！'
      : 'Draw three tarot cards and let AI reveal your fate. For entertainment only!'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/play/ai-tarot`,
      languages: {
        zh: `${BASE_URL}/zh/play/ai-tarot`,
        en: `${BASE_URL}/en/play/ai-tarot`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/play/ai-tarot`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function AiTarotPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: locale === 'zh' ? 'AI 塔罗占卜' : 'AI Tarot',
            description:
              locale === 'zh'
                ? '抽三张塔罗牌，AI 解读命运暗示，仅供娱乐'
                : 'Draw 3 tarot cards. AI interprets your fate — for entertainment only.',
            applicationCategory: 'GameApplication',
            operatingSystem: 'Web',
            url: `${BASE_URL}/${locale}/play/ai-tarot`,
          }),
        }}
      />

      <div className="py-8 sm:py-12">
        <Container>
          <Link
            href="/play"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 no-underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <ArrowLeft size={16} />
            {locale === 'zh' ? '返回娱乐大厅' : 'Back to Playground'}
          </Link>

          <div className="mx-auto max-w-lg">
            <AiTarotGame locale={locale} />
          </div>
        </Container>
      </div>
    </>
  )
}
