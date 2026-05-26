// AI 梗王争霸 — /play/ai-meme-battle

import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import Container from '@/components/Container'
import AiMemeBattle from '@/components/AiMemeBattle'
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

  const title = locale === 'zh' ? 'AI 梗王争霸 — 斗梗小游戏' : 'AI Meme Battle — Meme Duel Game'
  const description =
    locale === 'zh'
      ? '选一个主题，跟 AI 斗梗！沙雕、职场、情侣、抽象、古风，看谁才是真正的梗王。'
      : 'Pick a theme and battle AI in meme warfare. Who will be the ultimate meme champion?'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/play/ai-meme-battle`,
      languages: {
        zh: `${BASE_URL}/zh/play/ai-meme-battle`,
        en: `${BASE_URL}/en/play/ai-meme-battle`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/play/ai-meme-battle`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function AiMemeBattlePage({
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
            name: locale === 'zh' ? 'AI 梗王争霸' : 'AI Meme Battle',
            description:
              locale === 'zh'
                ? '选主题跟 AI 斗梗，6 种风格 8 轮接梗对战'
                : 'Battle AI in 8 rounds of meme warfare across 6 themes',
            applicationCategory: 'GameApplication',
            operatingSystem: 'Web',
            url: `${BASE_URL}/${locale}/play/ai-meme-battle`,
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
            <AiMemeBattle locale={locale} />
          </div>
        </Container>
      </div>
    </>
  )
}
