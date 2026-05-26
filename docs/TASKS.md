# Tasks — AI 工具导航站

---

## Phase 1: MVP 开发

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

## Phase 2: 产品化升级

### P2-T1. 扩充 AI 工具数据 ✅
- **Status**: completed
- **Description**: 从 8 个工具扩展到 72 个，新增 7 个分类（共 13 分类）
- **Steps**:
  1. [x] 新增 7 个分类：AI 音乐、AI PPT、AI 搜索、AI Agent、AI 翻译、AI 办公、AI 设计
  2. [x] 为 13 个分类各添加 4-6 个真实工具，共 64 条新数据
  3. [x] 每条工具包含真实 name/description/url/pricing/tags/logo
  4. [x] 创建 sql/04_expand_tools.sql
  5. [x] 在 Supabase SQL Editor 执行并验证（13 分类 + 72 工具）

### P2-T2. 工具详情页 SEO 强化 ✅
- **Status**: completed
- **Description**: 72 工具描述扩写为多段结构化内容（介绍+功能+场景+人群+优势），前端按段落拆 section 展示，添加 canonical URL 和面包屑导航
- **Steps**:
  1. [x] 创建 sql/05_enrich_descriptions.sql — 72 个工具每个 4-5 段详细描述
  2. [x] 更新 ToolDetailPage — parseDescription() 拆段落渲染
  3. [x] 添加 canonical URL + alternates metadata
  4. [x] 面包屑导航（首页 > 分类 > 工具名）
  5. [x] sitemap/robots 域名更新为 nav4i.com

### P2-T3. 首页产品感升级 ✅
- **Status**: completed
- **Description**: Hero 区域 + 动态计数动画 / ToolCard hover + 首字母头像 + 精选标识 / Header GitHub + 提交工具 / Footer 三列产品页脚
- **Steps**:
  1. [x] 新建 HeroSection.tsx — 渐变背景 + count-up 动画
  2. [x] ToolCard 升级 — hover 浮动 + 首字母头像 fallback + featured 标识
  3. [x] Header 升级 — GitHub 链接 + 提交工具 pill 按钮
  4. [x] Footer 重写 — 三列网格产品页脚
  5. [x] HomeContent 接入 HeroSection

### P2-T4. 新增 Analytics（轻量） ✅
- **Status**: completed
- **Description**: Vercel Analytics 接入，轻量页面浏览分析
- **Steps**:
  1. [x] 安装 @vercel/analytics
  2. [x] RootLayout 添加 <Analytics /> 组件

### P2-T5. About 页面重构 ✅
- **Status**: completed
- **Description**: 改为产品理念方向，三段式结构（为什么/怎么做/联系我们）
- **Steps**:
  1. [x] 重写内容：为什么会有这个网站 / 我们的方式 / 联系我们
  2. [x] 强调精选质量和实用性，非收录数量
  3. [x] 移除技术栈罗列和练手项目痕迹

---

## Phase 3: 国际化 + AI 娱乐实验室

### P3-T1. 国际化 (i18n) — next-intl ✅
- **Status**: completed
- **Description**: 实现 `/[locale]/...` 中英双语路由，所有页面和组件 locale-aware
- **Steps**:
  1. [x] 安装 next-intl v4，创建 `src/i18n/routing.ts` + `request.ts` + `navigation.ts`
  2. [x] 创建 `src/proxy.ts` 中间件（Next.js 16 兼容）
  3. [x] 创建 `messages/zh.json` + `en.json` 翻译文件
  4. [x] 重构布局：RootLayout（最小壳） + `[locale]/layout.tsx`（NextIntlClientProvider）
  5. [x] 迁移所有页面到 `[locale]/` 路由
  6. [x] 更新 8 个组件为 locale-aware：Header（语言切换器）、Footer、HeroSection、HomeContent、SearchBar、CategoryFilter、ToolCard、ThemeToggle
  7. [x] `ALTER TABLE tools ADD COLUMN description_en TEXT`（sql/06_i18n.sql）
  8. [x] 72 个工具英文描述（sql/07_i18n_en_descriptions.sql）
  9. [x] 类型更新：`Tool.description_en`、`ToolWithCategory.category_name_en`
  10. [x] 搜索覆盖 `description_en` 字段
  11. [x] ToolCard locale-aware 描述 + logo 加载失败兜底
  12. [x] Hreflang alternates + canonical URL 全覆盖
  13. [x] `sitemap.ts` + `robots.ts` 为 zh/en 各生成 URL

### P3-T2. AI 娱乐入口链路 ✅
- **Status**: completed
- **Description**: 首页 CategoryFilter 点击「AI 娱乐」跳转到 `/play` 游戏大厅
- **Steps**:
  1. [x] 插入 AI 娱乐分类（sql/08_ai_entertainment.sql，sort_order=0 排首位）
  2. [x] HomeContent `handleCategorySelect` 拦截 `entertainment` slug → `router.push('/play')`
  3. [x] 创建 `/play` AI 娱乐实验室 Hub 页面（标题居中 + 游戏卡片网格）
  4. [x] 卡片 hover 动效、locale-aware 文本、返回首页按钮

### P3-T3. AI 猜画小游戏 ✅
- **Status**: completed
- **Description**: 固定题库 AI 猜画游戏，20 道中英双语题目
- **Steps**:
  1. [x] 创建 `ai_guess_puzzles` 表 + 20 题中文数据（sql/09_ai_guess_puzzles.sql）
  2. [x] 创建 `src/lib/puzzles.ts` — `getPuzzles()` 查询函数 + 空数组兜底
  3. [x] 创建 `src/components/AiGuessGame.tsx` — 状态机（IDLE → SHOW_RESULT → 下一题）
  4. [x] 选项高亮（正确绿色/错误红色）+ Check/X 图标
  5. [x] 反馈卡片（搞笑成功/失败文案）+ 下一题按钮
  6. [x] 创建 `/play/ai-guess` 页面 + SEO metadata + JSON-LD
  7. [x] 添加英文列 + 20 题英文翻译（sql/10_ai_guess_en.sql）
  8. [x] AiGuessGame locale prop → 英文模式切换内容
  9. [x] 返回按钮指向 `/play`（非首页）

### P3-T4. AI 梗王争霸 ✅
- **Status**: completed
- **Description**: 第二个 AI 娱乐游戏，选主题跟 AI 斗梗
- **Steps**:
  1. [x] 创建 `src/lib/meme-battle-data.ts` — 6 主题 + 72 条 AI 回复 + 称号系统
  2. [x] 创建 `src/components/AiMemeBattle.tsx` — 三阶段状态机（主题选择 → 8 轮对战 → 结算）
  3. [x] 聊天式对战 UI + AI 思考动画（三点弹跳）
  4. [x] 总分 + 称号（按主题分 4 档）+ 对话回顾
  5. [x] 分享按钮（navigator.share / clipboard fallback）
  6. [x] 再来一局按钮
  7. [x] 创建 `/play/ai-meme-battle` 页面 + SEO metadata + JSON-LD
  8. [x] `/play` Hub 新增 AI 梗王争霸卡片
  9. [x] 返回按钮指向 `/play`
  10. [x] 中英双语支持

### P3-T5. AI 猜画数据刷新（待定）
- **Status**: pending
- **Description**: 将 20 道题目的 `image_url` 从 picsum.photos 占位图替换为真实 AI 生成图片
- **Steps**:
  1. [ ] 用 AI 绘图工具生成 20 张沙雕风格图片（对应 20 道题目）
  2. [ ] 上传到 Supabase Storage 或 CDN
  3. [ ] 更新 `ai_guess_puzzles` 表 `image_url` 字段
  4. [ ] 触发 Vercel 重新部署

---

## Active

（无进行中任务 — Phase 3 已全部完成）

## Backlog (Future)

- [ ] AI 猜画 — 替换真实 AI 生成图片
- [ ] 更多 AI 娱乐游戏（AI 谜语挑战、AI 冷笑话生成器等）
- [ ] 工具提交（用户投稿）
- [ ] 收藏功能
- [ ] 评论 / 评分系统
- [ ] 管理后台
- [ ] 更多语言支持

## Completed

- [x] **Task 1 — Initial Setup** (2026-05-24): Next.js 16 + TailwindCSS + next-themes + lucide-react
- [x] **Task 2 — Supabase Setup** (2026-05-24): 2 表、6 分类、8 工具、RLS 公开读取
- [x] **Task 3 — Layout & Common Components** (2026-05-24): Header + Footer + ThemeToggle + Container + 暗色模式
- [x] **Task 4 — Homepage** (2026-05-24): ToolCard + SearchBar + CategoryFilter + HomeContent
- [x] **Task 5 — Tool Detail Page** (2026-05-24): /tool/[slug] + OG/Twitter Card + notFound
- [x] **Task 6 — Category Page** (2026-05-24): /category/[slug] + 工具列表 + 计数
- [x] **Task 7 — About Page** (2026-05-24): /about 静态页面
- [x] **Task 8 — SEO Setup** (2026-05-24): generateMetadata 全覆盖 + sitemap + robots + JSON-LD
- [x] **Task 9 — Deploy to Vercel** (2026-05-25): GitHub + Vercel CI/CD + nav4i.com
- [x] **P2-T1 — 扩充 AI 工具数据** (2026-05-25): 72 个工具 + 13 个分类
- [x] **P2-T2 — 工具详情页 SEO 强化** (2026-05-25): 多段描述 + section 渲染 + canonical + 面包屑
- [x] **P2-T3 — 首页产品感升级** (2026-05-25): Hero count-up + ToolCard 升级 + Header 增强 + Footer 重写
- [x] **P2-T4 — Vercel Analytics** (2026-05-25): @vercel/analytics 接入
- [x] **P2-T5 — About 页面重构** (2026-05-25): 三段式产品理念页面
- [x] **P3-T1 — 国际化 (i18n)** (2026-05-25): next-intl 中英双语、72 工具英文描述、语言切换器
- [x] **P3-T2 — AI 娱乐入口链路** (2026-05-25): CategoryFilter → /play → 游戏大厅
- [x] **P3-T3 — AI 猜画小游戏** (2026-05-25-26): 20 题固定题库 + 中英双语 + 状态机
- [x] **P3-T4 — AI 梗王争霸** (2026-05-26): 6 主题 × 8 轮斗梗 + 称号系统 + 分享
