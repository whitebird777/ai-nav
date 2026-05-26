// AI 猜画小游戏 — /play/ai-guess

import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getPuzzles } from '@/lib/puzzles'
import Container from '@/components/Container'
import AiGuessGame from '@/components/AiGuessGame'
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
  const t = await getTranslations({ locale, namespace: 'common' })

  const title = locale === 'zh' ? 'AI 画的是啥？— 猜画小游戏' : 'What Did AI Draw? — AI Guess Game'
  const description =
    locale === 'zh'
      ? 'AI 生成的沙雕图片，你能猜到它画的是什么吗？20 道离谱题目，测测你的 AI 审美！'
      : 'Can you guess what the AI drew? 20 ridiculous AI-generated images to test your AI aesthetic!'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/play/ai-guess`,
      languages: {
        zh: `${BASE_URL}/zh/play/ai-guess`,
        en: `${BASE_URL}/en/play/ai-guess`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/play/ai-guess`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function AiGuessPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const tc = await getTranslations({ locale, namespace: 'common' })
  const puzzles = await getPuzzles()

  if (puzzles.length === 0) {
    return (
      <div className="py-8 sm:py-12">
        <Container>
          <div className="py-16 text-center">
            <p className="text-lg text-zinc-400 dark:text-zinc-500">
              {locale === 'zh' ? '题目正在加载中，请稍后再来！' : 'Puzzles are loading, check back soon!'}
            </p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: locale === 'zh' ? 'AI 画的是啥？' : 'What Did AI Draw?',
            description:
              locale === 'zh'
                ? 'AI 生成的沙雕图片猜谜小游戏，20 道离谱题目'
                : 'Guess what the AI drew — 20 ridiculous puzzles',
            applicationCategory: 'GameApplication',
            operatingSystem: 'Web',
            url: `${BASE_URL}/${locale}/play/ai-guess`,
          }),
        }}
      />

      <div className="py-8 sm:py-12">
        <Container>
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 no-underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <ArrowLeft size={16} />
            {tc('backToHome')}
          </Link>

          <div className="mx-auto max-w-lg">
            <AiGuessGame puzzles={puzzles} />
          </div>
        </Container>
      </div>
    </>
  )
}
