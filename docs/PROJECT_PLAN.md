# Project Plan — AI 工具导航站

## Overview
- **项目名称**: AI Nav（AI 工具导航站）
- **目标**: 做一个中文用户友好的 AI 工具导航站，帮助普通人发现和使用 AI 工具
- **技术栈**: Next.js + TailwindCSS + Supabase + Vercel
- **MVP 范围**: 纯展示站，无登录，无用户系统

---

## User Stories

### MVP 用户
- 普通用户，想找 AI 工具的人
- 场景：听说有 AI 工具可以画图，来找找有哪些选择
- 场景：想看看有哪些免费的 AI 聊天工具

### 暂不支持
- 开发者找 API / 开源项目（后续扩展）
- 海外用户（后续支持英文）

---

## Data Structure

```sql
-- 分类表
categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  name_en     TEXT,                          -- 预留英文
  icon        TEXT,                          -- emoji 或图标名
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
)

-- 工具表
tools (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  description TEXT NOT NULL,
  url         TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  tags        TEXT[],                        -- PostgreSQL array
  logo_url    TEXT,
  pricing     TEXT,                          -- 'free' | 'freemium' | 'paid'
  featured    BOOLEAN DEFAULT FALSE,         -- 预留：付费推荐
  view_count  INT DEFAULT 0,                 -- 预留：访问统计
  language    TEXT DEFAULT 'zh',             -- 预留：多语言
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
)
```

---

## Page Structure

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 工具卡片列表 + 搜索框 + 分类标签筛选 |
| `/tool/[slug]` | 工具详情页 | 工具信息 + 外链跳转 |
| `/category/[slug]` | 分类页 | 该分类下的工具列表 |
| `/about` | 关于页 | 项目介绍 |

### 组件树
```
RootLayout
├── Header (Logo + 搜索 + 暗色模式切换)
├── Main Content
│   ├── HomePage
│   │   ├── SearchBar
│   │   ├── CategoryFilter (横向滚动标签)
│   │   └── ToolCard[]
│   ├── ToolDetailPage
│   │   └── ToolInfo + ExternalLink
│   ├── CategoryPage
│   │   └── ToolCard[]
│   └── AboutPage
└── Footer
```

### UI 特性
- 卡片式布局
- 暗色模式（TailwindCSS `dark:` + next-themes）
- 移动端响应式（Mobile First）

---

## Feature Scope

### MVP (Phase 1)
- [x] 工具列表展示（卡片式）
- [x] 分类筛选
- [x] 搜索（前端过滤）
- [x] 工具详情页
- [x] 关于页
- [x] 暗色模式
- [x] 响应式布局
- [x] SEO（SSR + metadata + sitemap + OG/Twitter Card）
- [x] Vercel 部署

### 暂不实现
- [ ] 用户登录
- [ ] 工具提交
- [ ] 收藏
- [ ] 评论/评分
- [ ] 访问统计
- [ ] 多语言切换
- [ ] 管理后台

---

## Admin Strategy
- 使用 Supabase Dashboard 直接管理数据
- 通过 Supabase 网页界面增删改工具和分类
- 不做自定义 admin 后台

---

## SEO Strategy
- Next.js App Router Server Components → SSR 渲染
- `generateMetadata()` → 每个页面动态 title/description
- `generateStaticParams()` → 预渲染所有工具和分类页
- `sitemap.xml` → 自动生成
- Open Graph + Twitter Card meta 标签
- 语义化 HTML + JSON-LD 结构化数据（工具详情页）

---

## Monetization (Future)
- Phase 1: 纯练手项目，不盈利
- 已预留 `featured` 字段，后续支持付费推荐
- 后续可加 Google AdSense 广告位

---

## Deployment
| 层 | 方案 | 说明 |
|----|------|------|
| 代码仓库 | GitHub | 公开仓库 |
| 数据库 | Supabase 免费层 | 500MB，足够 MVP |
| 前端部署 | Vercel 免费层 | 自动 CI/CD from GitHub |
| 域名 | `*.vercel.app` | 后续再绑定自定义域名 |
| 图片 | 外链 URL | 工具 Logo 直接用第三方 URL |

---

## Design Principles
- **简单优先**: 不过度工程化，每个文件只做一件事
- **轻量**: 不引入重型状态管理，用 Server Components 减少客户端 JS
- **易维护**: 目录结构清晰，命名规范统一
- **AI 友好**: 代码可读性高，适合 AI 辅助迭代
- **低配置友好**: 无重型依赖，本地开发内存占用低

---

## Decisions Log
| Date | Decision | Reason |
|------|----------|--------|
| 2026-05-24 | 技术栈选 Next.js + TailwindCSS + Supabase | 免费部署、SEO 友好、学习成本低 |
| 2026-05-24 | MVP 不做登录 | 最快上线，纯展示无用户系统需求 |
| 2026-05-24 | 后台用 Supabase Dashboard | 避免过度工程化，个人开发够用 |
| 2026-05-24 | Logo 用外链 URL | 省去 Supabase Storage 配置，保持简单 |
| 2026-05-24 | 搜索用前端过滤 | MVP 数据量小，不需要后端搜索 |
| 2026-05-24 | 卡片式 + 暗色模式 | 现代化 UI，用户预期 |
| 2026-05-24 | 先面向中文用户 | 快速验证，减少翻译成本 |
