-- AI Nav — AI 时光墙留言表（v2）
-- 在 Supabase SQL Editor 中执行
-- 兼容：无表则创建，有旧表则迁移

-- Step 1: 建表（无表时）
CREATE TABLE IF NOT EXISTS ai_wall_messages (
  id BIGSERIAL PRIMARY KEY,
  nickname TEXT NOT NULL DEFAULT '匿名',
  content TEXT NOT NULL,
  tag TEXT,
  likes INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Step 2: 迁移旧表 — 添加 parent_id
ALTER TABLE ai_wall_messages
  ADD COLUMN IF NOT EXISTS parent_id INT REFERENCES ai_wall_messages(id) ON DELETE CASCADE;

-- Step 3: 移除旧的 AI 回复字段（如有）
ALTER TABLE ai_wall_messages
  DROP COLUMN IF EXISTS ai_reply;

-- Step 4: 索引
CREATE INDEX IF NOT EXISTS idx_wall_parent ON ai_wall_messages (parent_id);
CREATE INDEX IF NOT EXISTS idx_wall_likes ON ai_wall_messages (likes DESC);
CREATE INDEX IF NOT EXISTS idx_wall_created ON ai_wall_messages (created_at DESC);

-- Step 5: RLS
ALTER TABLE ai_wall_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert" ON ai_wall_messages;
CREATE POLICY "Allow public insert" ON ai_wall_messages
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select" ON ai_wall_messages;
CREATE POLICY "Allow public select" ON ai_wall_messages
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public update likes" ON ai_wall_messages;
CREATE POLICY "Allow public update likes" ON ai_wall_messages
  FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin delete" ON ai_wall_messages;
CREATE POLICY "Allow admin delete" ON ai_wall_messages
  FOR DELETE USING (true);
