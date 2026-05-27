// AI 娱乐大厅 — /play

import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import Container from '@/components/Container'
import FavoriteButton from '@/components/FavoriteButton'
import { ArrowLeft, ArrowRight } from 'lucide-react'

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

  const title =
    locale === 'zh' ? 'AI 娱乐实验室 — AI Playground' : 'AI Playground — AI Entertainment Lab'
  const description =
    locale === 'zh'
      ? '让 AI 陪你整点离谱的。AI 猜画、沙雕互动、谜语挑战，各种 AI 娱乐小游戏。'
      : 'Let AI entertain you. AI guess games, silly interactions, riddle challenges, and more.'

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/play`,
      languages: {
        zh: `${BASE_URL}/zh/play`,
        en: `${BASE_URL}/en/play`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/${locale}/play`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function PlayPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const tc = await getTranslations({ locale, namespace: 'common' })

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 no-underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ArrowLeft size={16} />
          {tc('backToHome')}
        </Link>

        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            {locale === 'zh' ? '🎮 AI 娱乐实验室' : '🎮 AI Playground'}
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            {locale === 'zh'
              ? '让 AI 陪你整点离谱的。'
              : 'Let AI entertain you with some ridiculous fun.'}
          </p>
        </div>

        {/* 游戏卡片列表 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* AI 画的是啥？ */}
          <Link
            href="/play/ai-guess"
            className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-6 no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="absolute right-3 top-3">
              <FavoriteButton type="game" id="ai-guess" gameMeta={{ id: 'ai-guess', name_zh: 'AI 画的是啥？', name_en: 'What Did AI Draw?', icon: '🎨', desc_zh: '猜猜 AI 到底画了什么离谱东西。', desc_en: 'Guess what ridiculous thing the AI drew.', path: '/play/ai-guess' }} />
            </div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-2xl dark:bg-zinc-800">
              🎨
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {locale === 'zh' ? 'AI 画的是啥？' : 'What Did AI Draw?'}
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {locale === 'zh'
                ? '猜猜 AI 到底画了什么离谱东西。'
                : 'Guess what ridiculous thing the AI drew.'}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {locale === 'zh' ? '开始挑战' : 'Start Challenge'}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>

          {/* AI 梗王争霸 */}
          <Link
            href="/play/ai-meme-battle"
            className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-6 no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="absolute right-3 top-3">
              <FavoriteButton type="game" id="ai-meme-battle" gameMeta={{ id: 'ai-meme-battle', name_zh: 'AI 梗王争霸', name_en: 'AI Meme Battle', icon: '🔥', desc_zh: '跟 AI 斗梗，看谁才是真正的梗王。', desc_en: 'Battle AI in meme warfare. Who will reign supreme?', path: '/play/ai-meme-battle' }} />
            </div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-2xl dark:bg-zinc-800">
              🔥
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {locale === 'zh' ? 'AI 梗王争霸' : 'AI Meme Battle'}
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {locale === 'zh'
                ? '跟 AI 斗梗，看谁才是真正的梗王。'
                : 'Battle AI in meme warfare. Who will reign supreme?'}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {locale === 'zh' ? '开始挑战' : 'Start Challenge'}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>

          {/* AI 塔罗占卜 */}
          <Link
            href="/play/ai-tarot"
            className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-6 no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="absolute right-3 top-3">
              <FavoriteButton type="game" id="ai-tarot" gameMeta={{ id: 'ai-tarot', name_zh: 'AI 塔罗占卜', name_en: 'AI Tarot', icon: '🔮', desc_zh: '抽三张牌，让 AI 为你解读命运的暗示。', desc_en: 'Draw three cards. Let AI unveil what fate has in store.', path: '/play/ai-tarot' }} />
            </div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-2xl dark:bg-zinc-800">
              🔮
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {locale === 'zh' ? 'AI 塔罗占卜' : 'AI Tarot'}
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {locale === 'zh'
                ? '抽三张牌，让 AI 为你解读命运的暗示。'
                : 'Draw three cards. Let AI unveil what fate has in store.'}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {locale === 'zh' ? '开始占卜' : 'Start Reading'}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>

          {/* AI 谁是卧底 */}
          <Link
            href="/play/ai-undercover"
            className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-6 no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="absolute right-3 top-3">
              <FavoriteButton type="game" id="ai-undercover" gameMeta={{ id: 'ai-undercover', name_zh: 'AI 谁是卧底', name_en: 'AI Undercover', icon: '🕵️', desc_zh: '跟 AI 斗智斗勇，找出隐藏的卧底。', desc_en: 'Outsmart the AI and uncover the hidden spy.', path: '/play/ai-undercover' }} />
            </div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-2xl dark:bg-zinc-800">
              🕵️
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {locale === 'zh' ? 'AI 谁是卧底' : 'AI Undercover'}
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {locale === 'zh'
                ? '跟 AI 斗智斗勇，找出隐藏的卧底。'
                : 'Outsmart the AI and uncover the hidden spy.'}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {locale === 'zh' ? '开始游戏' : 'Start Game'}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>

          {/* AI 你画我猜 */}
          <Link
            href="/play/ai-draw-guess"
            className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-6 no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="absolute right-3 top-3">
              <FavoriteButton type="game" id="ai-draw-guess" gameMeta={{ id: 'ai-draw-guess', name_zh: 'AI 你画我猜', name_en: 'AI Draw & Guess', icon: '✏️', desc_zh: 'AI 负责画，你负责猜，看你能对几个。', desc_en: 'AI draws, you guess. Test your visual intuition.', path: '/play/ai-draw-guess' }} />
            </div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-2xl dark:bg-zinc-800">
              ✏️
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {locale === 'zh' ? 'AI 你画我猜' : 'AI Draw & Guess'}
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {locale === 'zh'
                ? 'AI 负责画，你负责猜，看你能对几个。'
                : 'AI draws, you guess. Test your visual intuition.'}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {locale === 'zh' ? '开始挑战' : 'Start Challenge'}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>

          {/* AI 真心话大冒险 */}
          <Link
            href="/play/ai-truth-or-dare"
            className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-6 no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="absolute right-3 top-3">
              <FavoriteButton type="game" id="ai-truth-or-dare" gameMeta={{ id: 'ai-truth-or-dare', name_zh: 'AI 真心话大冒险', name_en: 'AI Truth or Dare', icon: '😈', desc_zh: 'AI 给你出题，真心话还是大冒险，你敢接吗？', desc_en: 'AI challenges you. Truth or Dare — pick your poison.', path: '/play/ai-truth-or-dare' }} />
            </div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-2xl dark:bg-zinc-800">
              😈
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {locale === 'zh' ? 'AI 真心话大冒险' : 'AI Truth or Dare'}
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {locale === 'zh'
                ? 'AI 给你出题，真心话还是大冒险，你敢接吗？'
                : 'AI challenges you. Truth or Dare — pick your poison.'}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {locale === 'zh' ? '开始挑战' : 'Start Challenge'}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>
      </Container>
    </div>
  )
}
