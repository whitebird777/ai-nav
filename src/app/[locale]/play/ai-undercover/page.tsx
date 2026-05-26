// AI 谁是卧底 — /play/ai-undercover

import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import Container from '@/components/Container'
import AiUndercoverGame from '@/components/AiUndercoverGame'
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

  const title = locale === 'zh' ? 'AI 谁是卧底 — 推理派对' : 'AI Undercover — Spy Hunt'
  const description =
    locale === 'zh'
      ? '你和 AI 各拿一个词，其中有一个卧底！通过描述找出谁是卧底，快来挑战！'
      : 'You and AI each get a word — one is a spy! Describe and deduce who\'s hiding something.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/play/ai-undercover`,
      languages: {
        zh: `${BASE_URL}/zh/play/ai-undercover`,
        en: `${BASE_URL}/en/play/ai-undercover`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/play/ai-undercover`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function AiUndercoverPage({
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
            name: locale === 'zh' ? 'AI 谁是卧底' : 'AI Undercover',
            description:
              locale === 'zh'
                ? '你和 AI 各拿一个词，通过描述找出卧底'
                : 'Find the spy among AI players through word descriptions',
            applicationCategory: 'GameApplication',
            operatingSystem: 'Web',
            url: `${BASE_URL}/${locale}/play/ai-undercover`,
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
            <AiUndercoverGame locale={locale} />
          </div>
        </Container>
      </div>
    </>
  )
}
