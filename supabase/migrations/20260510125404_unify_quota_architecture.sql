-- Remove redundant column from profile
ALTER TABLE profile DROP COLUMN IF EXISTS usage_quotas;

-- Add AI user limit configuration
INSERT INTO system_metrics (key, value, month) 
VALUES ('ai_user_limit', 10, 'config')
ON CONFLICT (key, month) DO UPDATE SET value = EXCLUDED.value;
