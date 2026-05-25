// 关于页 — locale-aware

import { getTranslations, setRequestLocale } from 'next-intl/server'
import Container from '@/components/Container'
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
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'about' })

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            {t('heading')}
          </h1>

          <div className="space-y-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {t('whyHeading')}
              </h2>
              <p>{t('whyP1')}</p>
              <p className="mt-3">{t('whyP2')}</p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {t('howHeading')}
              </h2>
              <p>{t('howP1')}</p>
              <p className="mt-3">{t('howP2')}</p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {t('contactHeading')}
              </h2>
              <p>{t('contactP1')}</p>
            </section>

            <p
              className="mt-8 text-zinc-400 dark:text-zinc-500"
              dir="rtl"
              lang="ar"
            >
              إلى نادية، الفتاة التي تعيش في وهران، الجزائر: أتمنى لكِ
              السعادة والفرح كل يوم!
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
