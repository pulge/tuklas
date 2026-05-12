ALTER TABLE profile ADD COLUMN IF NOT EXISTS usage_quotas JSONB DEFAULT '{"ai_generations": 0, "last_ai_reset": null}'::jsonb;
