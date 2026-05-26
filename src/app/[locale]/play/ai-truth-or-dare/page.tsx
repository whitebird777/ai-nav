// AI 真心话大冒险 — /play/ai-truth-or-dare

import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import Container from '@/components/Container'
import AiTruthOrDareGame from '@/components/AiTruthOrDareGame'
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

  const title = locale === 'zh' ? 'AI 真心话大冒险 — 敢来挑战吗？' : 'AI Truth or Dare — Do You Dare?'
  const description =
    locale === 'zh'
      ? 'AI 随机出题：真心话还是大冒险？大胆接招，看你能完成多少个挑战！'
      : 'AI challenges you: Truth or Dare? Step up and see how many you can handle!'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/play/ai-truth-or-dare`,
      languages: {
        zh: `${BASE_URL}/zh/play/ai-truth-or-dare`,
        en: `${BASE_URL}/en/play/ai-truth-or-dare`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/play/ai-truth-or-dare`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function AiTruthOrDarePage({
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
            name: locale === 'zh' ? 'AI 真心话大冒险' : 'AI Truth or Dare',
            description:
              locale === 'zh'
                ? 'AI 随机出真心话或大冒险挑战，大胆应战'
                : 'AI generates random truth or dare challenges. Take the challenge!',
            applicationCategory: 'GameApplication',
            operatingSystem: 'Web',
            url: `${BASE_URL}/${locale}/play/ai-truth-or-dare`,
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
            <AiTruthOrDareGame locale={locale} />
          </div>
        </Container>
      </div>
    </>
  )
}
