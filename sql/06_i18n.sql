-- 06_i18n: Add description_en column for English tool descriptions
-- Falls back to description (Chinese) when NULL

ALTER TABLE tools ADD COLUMN IF NOT EXISTS description_en TEXT;
