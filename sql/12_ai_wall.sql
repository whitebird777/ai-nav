-- AI Nav — AI 时光墙留言表
-- 在 Supabase SQL Editor 中执行

CREATE TABLE IF NOT EXISTS ai_wall_messages (
  id BIGSERIAL PRIMARY KEY,
  nickname TEXT NOT NULL DEFAULT '匿名',
  content TEXT NOT NULL,
  tag TEXT,
  ai_reply TEXT NOT NULL DEFAULT '',
  likes INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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
