# Tasks — AI 工具导航站

---

## Phase 1: MVP 开发（当前阶段）

### 1. Initial Setup ✅
- **Status**: completed
- **Description**: 项目初始化，安装依赖，配置基础工具链
- **Steps**:
  1. [x] `npx create-next-app` 创建项目（App Router + TypeScript + TailwindCSS）
  2. [x] 安装额外依赖：`next-themes`（暗色模式）、`lucide-react`（图标）
  3. [x] 创建目录结构：`src/app/`, `src/components/`, `src/lib/`
  4. [x] 配置 `.env.local.example` 模板（Supabase URL, Anon Key）
  5. [x] 确认 `npm run dev` 正常启动

### 2. Supabase Setup ✅
- **Status**: completed
- **Description**: 创建 Supabase 项目，建表，插入种子数据
- **Steps**:
  1. [x] 创建 Supabase 项目
  2. [x] 在 SQL Editor 中执行建表 SQL（`sql/01_schema.sql`）
  3. [x] 创建 RLS 策略（公开读取）（`sql/03_rls.sql`）
  4. [x] 插入 5-10 条种子数据（6 分类 + 8 工具）（`sql/02_seed.sql`）
  5. [x] 创建 Supabase 客户端 util（`src/lib/supabase.ts`）

### 3. Layout & Common Components ✅
- **Status**: completed
- **Description**: 全局布局、Header、Footer、暗色模式
- **Steps**:
  1. [x] 实现 RootLayout + 全局样式（globals.css + layout.tsx）
  2. [x] 实现 ThemeProvider（next-themes）+ ThemeToggle 按钮
  3. [x] 实现 Header 组件（Logo + 导航 + 暗色切换）
  4. [x] 实现 Footer 组件
  5. [x] 移动端响应式适配（Container + sm: 断点）

### 4. Homepage ✅
- **Status**: completed
- **Description**: 首页工具列表 + 搜索 + 分类筛选
- **Steps**:
  1. [x] 实现 `src/lib/tools.ts` 数据查询函数（Task 2 已完成）
  2. [x] 实现 ToolCard 组件（logo, name, description, tags, pricing）
  3. [x] 实现 CategoryFilter 组件（横向滚动标签）
  4. [x] 实现 SearchBar 组件
  5. [x] 组装 HomePage（Server Component + HomeContent 客户端交互壳）
  6. [x] Loading 状态 + Empty 状态

### 5. Tool Detail Page ✅
- **Status**: completed
- **Description**: 工具详情页
- **Steps**:
  1. [x] 实现 `/tool/[slug]` 页面（generateStaticParams + generateMetadata + OG/Twitter Card）
  2. [x] 展示工具完整信息（logo/名称/描述/标签/价格/分类）+ 访问按钮
  3. [x] 返回链接 + 面包屑
  4. [x] 404 处理（notFound() → not-found 页面）

### 6. Category Page ✅
- **Status**: completed
- **Description**: 分类下的工具列表
- **Steps**:
  1. [x] 实现 `/category/[slug]` 页面（generateStaticParams + generateMetadata）
  2. [x] 展示该分类下所有工具卡片 + 工具计数
  3. [x] 空状态处理 + 404 分类不存在

### 7. About Page ✅
- **Status**: completed
- **Description**: 关于页面
- **Steps**:
  1. [x] 实现 `/about` 页面 + metadata
  2. [x] 项目介绍 + 联系方式

### 8. SEO Setup ✅
- **Status**: completed
- **Description**: SEO 标配
- **Steps**:
  1. [x] 每个页面添加 `generateMetadata`（首页/工具详情/分类/关于）
  2. [x] 添加 Open Graph + Twitter Card meta
  3. [x] 实现 `sitemap.xml` 自动生成（含静态+动态路由）
  4. [x] 创建 `robots.txt`
  5. [x] JSON-LD 结构化数据（工具详情页 — SoftwareApplication schema）

### 9. Deploy to Vercel ✅
- **Status**: completed
- **Description**: 部署上线
- **Steps**:
  1. [x] 创建 GitHub 仓库（whitebird777/ai-nav），SSH 推送
  2. [x] Vercel 关联 GitHub 仓库，自动 CI/CD
  3. [x] 配置环境变量（Supabase URL + Anon Key）
  4. [x] 构建成功，TypeScript 严格模式通过
  5. [x] 测试线上所有页面功能（用户浏览器验证通过）

---

## Active

<!-- 当前进行中的任务 -->

## Backlog (Phase 2+)

- [ ] 工具提交（用户投稿）
- [ ] 收藏功能
- [ ] 评论/评分系统
- [ ] 访问统计
- [ ] 多语言支持（中/英）
- [ ] 管理后台
- [ ] 自定义域名绑定

## Completed

- [x] **Task 1 — Initial Setup** (2026-05-24): Next.js 16 + TailwindCSS + next-themes + lucide-react，项目可运行
- [x] **Task 2 — Supabase Setup** (2026-05-24): 2 表、6 分类、8 工具、RLS 公开读取、数据库连接验证通过
- [x] **Task 3 — Layout & Common Components** (2026-05-24): Header + Footer + ThemeToggle + Container + 暗色模式 + 响应式
- [x] **Task 4 — Homepage** (2026-05-24): ToolCard + SearchBar + CategoryFilter + HomeContent + SSR 数据渲染验证通过
- [x] **Task 5 — Tool Detail Page** (2026-05-24): /tool/[slug] + generateStaticParams + OG/Twitter Card + notFound 处理
- [x] **Task 6 — Category Page** (2026-05-24): /category/[slug] + 工具列表 + 计数 + 空状态 + 404
- [x] **Task 7 — About Page** (2026-05-24): /about 静态页面 + metadata
- [x] **Task 8 — SEO Setup** (2026-05-24): generateMetadata 全覆盖 + OG/Twitter + sitemap + robots + JSON-LD
- [x] **Task 9 — Deploy to Vercel** (2026-05-25): GitHub + Vercel CI/CD + 环境变量 + 线上验证通过
