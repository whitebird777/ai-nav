# Project Plan — AI 工具导航站

## Overview
- **项目名称**: AI Nav（AI 工具导航站）
- **目标**: 做一个中英双语的 AI 工具导航站 + AI 娱乐游戏平台，帮助普通人发现和使用 AI 工具
- **技术栈**: Next.js 16 + TailwindCSS 4 + Supabase + Vercel + next-intl
- **当前阶段**: Phase 3 — AI 娱乐实验室 + 国际化

---

## User Stories

### 当前用户
- 中文/英文用户，想找 AI 工具的人
- 想体验 AI 沙雕游戏的人（猜画、斗梗等）

### 暂不支持
- 开发者找 API / 开源项目（后续扩展）
- 用户登录 / 收藏 / 评论

---

## Data Structure

```sql
-- 分类表
categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  name_en     TEXT,
  icon        TEXT,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
)

-- 工具表
tools (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  description TEXT NOT NULL,
  description_en TEXT,
  url         TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  tags        TEXT[],
  logo_url    TEXT,
  pricing     TEXT,
  featured    BOOLEAN DEFAULT FALSE,
  view_count  INT DEFAULT 0,
  language    TEXT DEFAULT 'zh',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
)

-- AI 猜画题库表
ai_guess_puzzles (
  id              SERIAL PRIMARY KEY,
  title           TEXT NOT NULL,
  title_en        TEXT,
  image_url       TEXT NOT NULL,
  options         TEXT[] NOT NULL,
  options_en      TEXT[],
  correct_answer  INT NOT NULL,
  funny_success_text    TEXT NOT NULL,
  funny_success_text_en TEXT,
  funny_fail_text       TEXT NOT NULL,
  funny_fail_text_en    TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
)
```

---

## Page Structure

| 路由 | 页面 | 说明 |
|------|------|------|
| `/[locale]/` | 首页 | 工具卡片列表 + 搜索 + 分类筛选 + Hero |
| `/[locale]/tool/[slug]` | 工具详情页 | 多段描述 + 面包屑 + 外链 |
| `/[locale]/category/[slug]` | 分类页 | 该分类下的工具列表 |
| `/[locale]/about` | 关于页 | 产品理念 |
| `/[locale]/play` | AI 娱乐实验室 Hub | 游戏大厅，网格布局展示游戏卡片 |
| `/[locale]/play/ai-guess` | AI 画的是啥？ | 20 道 AI 猜画题目，固定题库 |
| `/[locale]/play/ai-meme-battle` | AI 梗王争霸 | 6 主题 × 8 轮斗梗对战 |

### 组件树
```
RootLayout (最小壳: html + body)
└── [locale]/Layout (NextIntlClientProvider + ThemeProvider + Header + Footer + Analytics)
    ├── HomePage
    │   ├── HeroSection (count-up 动画)
    │   ├── SearchBar (locale-aware placeholder)
    │   ├── CategoryFilter (locale-aware 分类名)
    │   └── ToolCard[] (locale-aware description + logo fallback)
    ├── ToolDetailPage (多段描述 section 渲染 + 面包屑 + JSON-LD)
    ├── CategoryPage
    ├── AboutPage
    ├── PlayPage (AI 娱乐 Hub)
    │   └── GameCard[] (图标 + 名称 + 描述 → 进入游戏)
    ├── AiGuessGame (状态机: IDLE → SHOW_RESULT → 下一题)
    └── AiMemeBattle (状态机: 选主题 → 8 轮对战 → 结算)
```

### UI 特性
- 卡片式布局 + hover 升浮动效
- 暗色模式（TailwindCSS `dark:` + next-themes）
- 移动端响应式（Mobile First）
- 语言切换器（Header 双按钮 "中 | EN"）
- Vercel Analytics 轻量分析

---

## Feature Scope

### Phase 1 — MVP ✅
- [x] 工具列表展示（卡片式）
- [x] 分类筛选
- [x] 搜索（前端过滤）
- [x] 工具详情页
- [x] 关于页
- [x] 暗色模式
- [x] 响应式布局
- [x] SEO（SSR + metadata + sitemap + OG/Twitter Card + JSON-LD）
- [x] Vercel 部署 + 自定义域名 nav4i.com

### Phase 2 — 产品化升级 ✅
- [x] 72 个工具 + 13 个分类
- [x] 工具详情页 SEO 强化（多段描述 + 面包屑）
- [x] 首页产品感升级（Hero + count-up + ToolCard 升级 + Footer 重写）
- [x] Vercel Analytics
- [x] About 页面重构（产品理念方向）

### Phase 3 — 国际化 + AI 娱乐 ✅
- [x] next-intl 中英双语（`/[locale]/...` 路由）
- [x] 72 个工具英文描述（`description_en`）
- [x] AI 娱乐入口链路（CategoryFilter → `/play` → 游戏）
- [x] AI 猜画小游戏（20 题中英双语）
- [x] AI 梗王争霸（6 主题 × 8 轮斗梗）
- [x] 语言切换器（Header 中 | EN）

### 暂不实现
- [ ] 用户登录 / 注册
- [ ] 工具提交 / 投稿
- [ ] 收藏功能
- [ ] 评论 / 评分
- [ ] 访问统计
- [ ] 管理后台

---

## i18n Architecture
- **方案**: `next-intl` v4 + `localePrefix: "always"`
- **路由**: `/[locale]/...`（`zh` / `en`）
- **中间件**: `src/proxy.ts`（Next.js 16 兼容）
- **翻译文件**: `messages/zh.json` + `messages/en.json`
- **导航组件**: `Link` / `useRouter` / `usePathname` 从 `@/i18n/navigation` 导入
- **Locale-aware 数据**: 工具描述 `description_en`，分类名 `name_en`，游戏题目 `title_en / options_en`

---

## Admin Strategy
- 使用 Supabase Dashboard 直接管理数据
- SQL 脚本放在 `sql/` 目录，按编号执行
- 不做自定义 admin 后台

---

## SEO Strategy
- Next.js App Router Server Components → SSR 渲染
- `generateMetadata()` → 每个页面动态 title/description
- `generateStaticParams()` → SSG 预渲染所有路由
- hreflang alternates → `zh` / `en` 双语 SEO
- Open Graph + Twitter Card meta 标签
- JSON-LD 结构化数据（工具详情页、游戏页）
- `sitemap.xml` + `robots.txt` 自动生成

---

## Monetization (Future)
- Phase 1-3: 纯免费项目
- 已预留 `featured` 字段，后续支持付费推荐
- 后续可加 Google AdSense

---

## Deployment
| 层 | 方案 | 说明 |
|----|------|------|
| 代码仓库 | GitHub | whitebird777/ai-nav |
| 数据库 | Supabase 免费层 | 500MB，RLS 公开读取 |
| 前端部署 | Vercel 免费层 | 自动 CI/CD from GitHub |
| 域名 | `nav4i.com` | 已配置 |
| 图片 | 外链 URL + picsum.photos | 游戏图片用占位服务 |

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
| 2026-05-24 | Logo 用外链 URL | 省去 Supabase Storage 配置 |
| 2026-05-24 | 搜索用前端过滤 | MVP 数据量小，不需要后端搜索 |
| 2026-05-24 | 卡片式 + 暗色模式 | 现代化 UI，用户预期 |
| 2026-05-25 | next-intl 而非自研 i18n | 社区标准方案，SSG 兼容好 |
| 2026-05-25 | localePrefix: "always" | URL 始终含 `zh`/`en`，最可预测 |
| 2026-05-25 | 游戏用固定题库 + 本地数据 | 避免 AI API 成本和延迟，确保稳定 |
| 2026-05-26 | AI 梗王争霸用客户端随机回复 | MVP 无需真实 AI，预设回复已够有趣 |
