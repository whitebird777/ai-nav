-- AI 工具导航站 — RLS 策略
-- 在 Supabase SQL Editor 中执行此文件
-- 用途：允许匿名用户公开读取 categories 和 tools

-- 1. 开启 RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- 2. 允许公开读取（无需登录）
CREATE POLICY "allow_public_read" ON categories
  FOR SELECT
  USING (true);

CREATE POLICY "allow_public_read" ON tools
  FOR SELECT
  USING (true);
