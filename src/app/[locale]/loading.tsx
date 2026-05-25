// 全局 Loading 状态

import Container from '@/components/Container'

export default function Loading() {
  return (
    <div className="py-16">
      <Container>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-8 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-5 w-48 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="mt-8 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
