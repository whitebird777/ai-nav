-- AI Nav — 每日打卡表
-- 在 Supabase SQL Editor 中执行

CREATE TABLE IF NOT EXISTS daily_checkins (
  id BIGSERIAL PRIMARY KEY,
  user_identifier TEXT NOT NULL,
  checkin_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_identifier, checkin_date)
);

CREATE INDEX IF NOT EXISTS idx_checkins_date ON daily_checkins (checkin_date DESC);

-- RLS: 允许公开插入和读取
ALTER TABLE daily_checkins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert" ON daily_checkins;
CREATE POLICY "Allow public insert" ON daily_checkins
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select" ON daily_checkins;
CREATE POLICY "Allow public select" ON daily_checkins
  FOR SELECT USING (true);
