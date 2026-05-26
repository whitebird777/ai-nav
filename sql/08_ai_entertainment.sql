-- AI Nav — 新增 AI 娱乐分类 (AI Playground)
-- 排在最前面（全部之后），作为后续 AI 互动娱乐功能的入口
-- 在 Supabase SQL Editor 中执行

INSERT INTO categories (slug, name, name_en, icon, sort_order) VALUES
  ('entertainment', 'AI 娱乐', 'AI Playground', '🎮', 0)
ON CONFLICT (slug) DO NOTHING;
