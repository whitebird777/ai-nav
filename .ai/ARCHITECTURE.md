# Technical Architecture — AI 工具导航站

## Tech Stack

| 层 | 技术 | 说明 |
|----|------|------|
| 框架 | Next.js 15 (App Router) | SSR/SSG, 文件路由, Server Components |
| 样式 | TailwindCSS 4 | 原子化 CSS, dark mode class strategy |
| 数据库 | Supabase (PostgreSQL) | 免费层 500MB, 自带 REST API |
| ORM | Supabase JS Client (`@supabase/supabase-js`) | 轻量，直接用，不引入 Prisma |
| 部署 | Vercel | 免费层, 自动 CI/CD |
| 图标 | Lucide React | 轻量，tree-shaking |
| 暗色模式 | next-themes | 避免 flash，SSR 安全 |

## 为什么不引入 X

- **Prisma**: Supabase JS Client 已足够，加了多一层映射
- **Redux/Zustand**: 纯展示站，Server Components 搞定，不需要客户端状态管理
- **shadcn/ui**: MVP 卡片 + 标签够简单，TailwindCSS 手写更快
- **i18next**: MVP 只做中文，后续再考虑
- **Supabase Storage**: Logo 用外链 URL，省去配置

## Directory Structure

```
first_project/
├── .ai/
│   └── ARCHITECTURE.md          # 本文件
├── docs/
│   ├── PROJECT_PLAN.md          # 项目计划
│   └── TASKS.md                 # 任务看板
├── workflow/
│   ├── BRAINSTORMING.md
│   ├── DEVELOPMENT_RULES.md
│   ├── TESTING_RULES.md
│   └── RAP_LOOP.md
├── src/
│   ├── app/
│   │   ├── layout.tsx           # RootLayout (ThemeProvider + Header + Footer)
│   │   ├── page.tsx             # 首页 (Server Component)
│   │   ├── tool/
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # 工具详情页
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # 分类页
│   │   ├── about/
│   │   │   └── page.tsx         # 关于页
│   │   ├── robots.ts            # robots.txt
│   │   └── sitemap.ts           # sitemap.xml
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── ToolCard.tsx
│   │   ├── SearchBar.tsx
│   │   └── CategoryFilter.tsx
│   └── lib/
│       ├── supabase.ts          # Supabase 客户端
│       ├── tools.ts             # 数据查询函数
│       └── types.ts             # TypeScript 类型
├── public/
│   └── (favicon, og-image 等)
├── .env.local.example           # 环境变量模板
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Data Flow

```
┌─────────────┐     ┌──────────────┐     ┌──────────┐
│  Supabase   │────▶│ lib/tools.ts │────▶│  Server  │
│  PostgreSQL │     │ (查询函数)    │     │ Component│
└─────────────┘     └──────────────┘     └────┬─────┘
                                              │ props
                                              ▼
                                    ┌──────────────────┐
                                    │  Client Component │
                                    │  (SearchBar,      │
                                    │   ThemeToggle)    │
                                    └──────────────────┘
```

- 大部分页面是 **Server Components**，构建时或请求时从 Supabase 获取数据
- 搜索在客户端做前端过滤（MVP 数据量小）
- 暗色模式通过 `next-themes` 在客户端切换，但服务端渲染时不会闪烁

## Performance Target

- Lighthouse 评分: 90+
- 首屏 JS 大小: < 100KB（gzipped）
- 首页数据: Supabase 免费层 500MB 数据库，REST API 查询 < 100ms
- 构建时间: < 2 分钟（低配置电脑友好）

## API Routes (None for MVP)

- MVP 不做 API Routes
- 数据通过 Supabase JS Client 直接在 Server Components 中查询
- 后续如果需要 API 再添加
