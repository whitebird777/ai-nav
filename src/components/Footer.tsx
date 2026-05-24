// 全局 Footer
// 用途：版权信息，保持极简

import Container from './Container'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
      <Container>
        <div className="flex flex-col items-center gap-2 text-center text-sm text-zinc-500 dark:text-zinc-500">
          <p>发现最好用的 AI 工具</p>
          <p>&copy; {new Date().getFullYear()} AI Nav</p>
        </div>
      </Container>
    </footer>
  )
}
