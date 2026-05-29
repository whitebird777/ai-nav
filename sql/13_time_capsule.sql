-- AI Nav — AI 时间胶囊表
-- 在 Supabase SQL Editor 中执行

CREATE TABLE IF NOT EXISTS time_capsules (
  id BIGSERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  mood TEXT NOT NULL DEFAULT '期待',
  future_date TEXT NOT NULL,
  ai_letter TEXT NOT NULL DEFAULT '',
  ai_seal TEXT NOT NULL DEFAULT '',
  ai_response TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_capsule_created ON time_capsules (created_at DESC);

-- RLS
ALTER TABLE time_capsules ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert" ON time_capsules;
CREATE POLICY "Allow public insert" ON time_capsules
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select" ON time_capsules;
CREATE POLICY "Allow public select" ON time_capsules
  FOR SELECT USING (true);
