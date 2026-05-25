// 工具详情页 — locale-aware Server Component

import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Metadata } from 'next'
import { getToolBySlug, getToolSlugs } from '@/lib/tools'
import Container from '@/components/Container'
import { ExternalLink } from 'lucide-react'
import { routing } from '@/i18n/routing'

const BASE_URL = 'https://nav4i.com'

const pricingStyle: Record<string, string> = {
  free: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  freemium:
    'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  paid: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
}

function parseDescription(description: string): string[] {
  return description
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export async function generateStaticParams() {
  const slugs = await getToolSlugs()
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
  const tool = await getToolBySlug(slug)

  if (!tool) return { title: 'Tool not found' }

  const description =
    locale === 'en' && tool.description_en
      ? tool.description_en
      : tool.description

  return {
    title: `${tool.name} — AI Nav`,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/tool/${tool.slug}`,
      languages: {
        zh: `${BASE_URL}/zh/tool/${tool.slug}`,
        en: `${BASE_URL}/en/tool/${tool.slug}`,
      },
    },
    openGraph: {
      title: `${tool.name} — AI Nav`,
      description,
      type: 'article',
      url: `${BASE_URL}/${locale}/tool/${tool.slug}`,
    },
    twitter: {
      card: 'summary',
      title: tool.name,
      description,
    },
  }
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'tool' })
  const tc = await getTranslations({ locale, namespace: 'common' })

  const tool = await getToolBySlug(slug)
  if (!tool) notFound()

  const descriptionText =
    locale === 'en' && tool.description_en
      ? tool.description_en
      : tool.description

  const sections = parseDescription(descriptionText)

  const pricingLabel: Record<string, string> = {
    free: t('free'),
    freemium: t('freemium'),
    paid: t('paid'),
  }

  const categoryName =
    locale === 'en' && tool.category_name_en
      ? tool.category_name_en
      : tool.category_name

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: tool.name,
            description: descriptionText,
            applicationCategory: 'AIApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: tool.pricing === 'free' ? '0' : undefined,
              priceCurrency: 'CNY',
            },
            url: tool.url,
          }),
        }}
      />

      <div className="py-8 sm:py-12">
        <Container>
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            <Link
              href="/"
              className="no-underline hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {tc('home')}
            </Link>
            <span>{tc('breadcrumbSeparator')}</span>
            <Link
              href={`/category/${tool.category_slug}`}
              className="no-underline hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {categoryName}
            </Link>
            <span>{tc('breadcrumbSeparator')}</span>
            <span className="text-zinc-900 dark:text-zinc-100">
              {tool.name}
            </span>
          </nav>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
            <div className="mb-6 flex items-start gap-4">
              {tool.logo_url ? (
                <img
                  src={tool.logo_url}
                  alt={tool.name}
                  className="h-14 w-14 shrink-0 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-2xl dark:bg-zinc-800">
                  🛠️
                </div>
              )}

              <div>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {tool.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {tool.pricing && (
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${pricingStyle[tool.pricing] || ''}`}
                    >
                      {pricingLabel[tool.pricing] || tool.pricing}
                    </span>
                  )}
                  <span className="text-sm text-zinc-400 dark:text-zinc-500">
                    {categoryName}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6 space-y-4">
              {sections.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-base leading-relaxed text-zinc-600 dark:text-zinc-300 ${
                    index === 0
                      ? 'text-zinc-800 dark:text-zinc-200'
                      : 'border-t border-zinc-100 pt-4 dark:border-zinc-800'
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {tool.tags && tool.tags.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-zinc-100 px-3 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {tc('visitWebsite')}
              <ExternalLink size={16} />
            </a>
          </div>
        </Container>
      </div>
    </>
  )
}
