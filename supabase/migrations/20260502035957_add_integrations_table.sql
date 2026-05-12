-- 5. INTEGRATIONS TABLE
-- Stores per-user API credentials for third-party services (RapidAPI, LLM providers, etc.)
-- Keys are protected by Postgres RLS. Application-layer envelope encryption is a v2 concern.
-- service values: 'rapidapi' | 'gemini' | 'openrouter' | 'ollama' | 'gmail'
CREATE TABLE IF NOT EXISTS integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service TEXT NOT NULL,
  config JSONB NOT NULL DEFAULT '{}'::jsonb, -- { key, model, host, ... }
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, service)
);

ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own integrations" ON integrations
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
