// AI 你画我猜 — /play/ai-draw-guess

import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import Container from '@/components/Container'
import AiDrawGuessGame from '@/components/AiDrawGuessGame'
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

  const title = locale === 'zh' ? 'AI 你画我猜 — 抽象猜词' : 'AI Draw & Guess — Abstract Doodle Quiz'
  const description =
    locale === 'zh'
      ? 'AI 画抽象涂鸦，你来猜是什么。10 道沙雕题目，测测你的眼力！'
      : 'AI draws abstract doodles. Guess what they are! 10 fun drawings to test your eyes.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/play/ai-draw-guess`,
      languages: {
        zh: `${BASE_URL}/zh/play/ai-draw-guess`,
        en: `${BASE_URL}/en/play/ai-draw-guess`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/play/ai-draw-guess`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function AiDrawGuessPage({
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
            name: locale === 'zh' ? 'AI 你画我猜' : 'AI Draw & Guess',
            description:
              locale === 'zh'
                ? 'AI 画抽象涂鸦，你来猜词，10 道趣味挑战'
                : 'AI draws abstract doodles. Guess the word in 10 fun rounds.',
            applicationCategory: 'GameApplication',
            operatingSystem: 'Web',
            url: `${BASE_URL}/${locale}/play/ai-draw-guess`,
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
            <AiDrawGuessGame locale={locale} />
          </div>
        </Container>
      </div>
    </>
  )
}
