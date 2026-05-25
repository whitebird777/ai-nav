// 分类页 — locale-aware Server Component

import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Metadata } from 'next'
import { getTools, getCategories, getCategorySlugs } from '@/lib/tools'
import Container from '@/components/Container'
import ToolCard from '@/components/ToolCard'
import { ArrowLeft } from 'lucide-react'
import { routing } from '@/i18n/routing'

export async function generateStaticParams() {
  const slugs = await getCategorySlugs()
  const params: Array<{ locale: string; slug: string }> = []
  for (const locale of routing.locales) {
    for (const s of slugs) {
      params.push({ locale, slug: s })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const categories = await getCategories()
  const category = categories.find((c) => c.slug === slug)

  if (!category) return { title: 'Category not found' }

  const displayName =
    locale === 'en' && category.name_en ? category.name_en : category.name
  const t = await getTranslations({ locale, namespace: 'category' })

  return {
    title: `${displayName}${t('titleSuffix')}`,
    description: t('descriptionTemplate', { category: displayName }),
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'common' })

  const [tools, categories] = await Promise.all([
    getTools({ category: slug }),
    getCategories(),
  ])

  const category = categories.find((c) => c.slug === slug)
  if (!category) notFound()

  const displayName =
    locale === 'en' && category.name_en ? category.name_en : category.name

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 no-underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ArrowLeft size={16} />
          {t('backToHome')}
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            {category.icon && <span className="mr-2">{category.icon}</span>}
            {displayName}
          </h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            {tools.length} {t('tools')}
          </p>
        </div>

        {tools.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-zinc-400 dark:text-zinc-500">
              {t('noToolsInCategory')}
            </p>
          </div>
        )}
      </Container>
    </div>
  )
}
