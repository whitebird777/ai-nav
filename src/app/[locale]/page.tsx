// 首页 — Server Component (locale-aware)

import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getTools, getCategories } from '@/lib/tools'
import HomeContent from '@/components/HomeContent'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'homepage' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: t('title'),
      description: t('description'),
    },
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [tools, categories] = await Promise.all([
    getTools(),
    getCategories(),
  ])

  const toolCount = tools.length
  const categoryCount = categories.length

  return (
    <HomeContent
      tools={tools}
      categories={categories}
      toolCount={toolCount}
      categoryCount={categoryCount}
      locale={locale}
    />
  )
}
