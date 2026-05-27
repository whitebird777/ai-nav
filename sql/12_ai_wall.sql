-- AI Nav — AI 时光墙留言表（v2：支持回复 + 点赞排序 + 管理员删除）
-- 在 Supabase SQL Editor 中执行

-- 先删除旧表（如已有数据请先备份）
-- DROP TABLE IF EXISTS ai_wall_messages;

CREATE TABLE IF NOT EXISTS ai_wall_messages (
  id BIGSERIAL PRIMARY KEY,
  parent_id INT REFERENCES ai_wall_messages(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL DEFAULT '匿名',
  content TEXT NOT NULL,
  tag TEXT,
  likes INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 如果从旧表迁移，添加列：
-- ALTER TABLE ai_wall_messages ADD COLUMN IF NOT EXISTS parent_id INT REFERENCES ai_wall_messages(id) ON DELETE CASCADE;
-- ALTER TABLE ai_wall_messages DROP COLUMN IF EXISTS ai_reply;

CREATE INDEX IF NOT EXISTS idx_wall_parent ON ai_wall_messages (parent_id);
CREATE INDEX IF NOT EXISTS idx_wall_likes ON ai_wall_messages (likes DESC);
CREATE INDEX IF NOT EXISTS idx_wall_created ON ai_wall_messages (created_at DESC);

-- RLS
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
