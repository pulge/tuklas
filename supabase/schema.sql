-- Tuklas Database Schema
-- Based on CONTEXT.md specifications

-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. JOBS TABLE
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  platform TEXT NOT NULL, -- 'jobstreet', 'linkedin', 'indeed', 'manual'
  url TEXT,
  description TEXT,
  salary TEXT,
  posted_at TIMESTAMPTZ,
  scraped_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new' -- 'new', 'reviewed', 'approved', 'skipped'
);

-- 2. COVER LETTERS TABLE
CREATE TABLE IF NOT EXISTS cover_letters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  content TEXT,
  raw_content TEXT,
  model_used TEXT,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  edited BOOLEAN DEFAULT FALSE
);

-- 3. APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'applied', -- 'applied', 'interview', 'offer', 'rejected'
  cover_letter_id UUID REFERENCES cover_letters(id) ON DELETE SET NULL,
  notes TEXT,
  interview_at TIMESTAMPTZ
);

-- 4. PROFILE TABLE
CREATE TABLE IF NOT EXISTS profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  cv_text TEXT,
  preferences JSONB DEFAULT '{}'::jsonb,
  rate_limits JSONB DEFAULT '{}'::jsonb,
  usage_quotas JSONB DEFAULT '{"ai_generations": 0, "last_ai_reset": null}'::jsonb,
  consent_at TIMESTAMPTZ
);

-- Enable RLS on all tables
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE cover_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- Add RLS Policies (Single User / Auth User Access)
-- Policy: Users can only see/edit their own data
DROP POLICY IF EXISTS "Users can manage their own jobs" ON jobs;
CREATE POLICY "Users can manage their own jobs" ON jobs 
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage their own applications" ON applications;
CREATE POLICY "Users can manage their own applications" ON applications 
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage their own cover letters" ON cover_letters;
CREATE POLICY "Users can manage their own cover letters" ON cover_letters 
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage their own profile" ON profile;
CREATE POLICY "Users can manage their own profile" ON profile 
  FOR ALL USING (auth.uid() = user_id);

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

DROP POLICY IF EXISTS "Users can manage their own integrations" ON integrations;
CREATE POLICY "Users can manage their own integrations" ON integrations
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 6. ACTIVITY LOGS TABLE
-- Tracks system and user actions for transparency and debugging.
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'email_ingest', 'scrape', 'cv_extract', 'admin_update', etc.
  details JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'info', -- 'info', 'success', 'warning', 'error'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Admins can see all logs, users can only see their own.
DROP POLICY IF EXISTS "Users can see their own logs" ON activity_log;
CREATE POLICY "Users can see their own logs" ON activity_log
  FOR SELECT USING (auth.uid() = user_id);

-- Admin log viewing uses Service Role client (bypasses RLS).
-- This placeholder policy is kept for documentation; real admin access is via Service Role.
DROP POLICY IF EXISTS "Admins can see all logs" ON activity_log;
CREATE POLICY "Admins can see all logs" ON activity_log
  FOR SELECT USING (auth.uid() = user_id);

-- Allow authenticated users to insert their own activity logs
DROP POLICY IF EXISTS "Users can insert their own logs" ON activity_log;
CREATE POLICY "Users can insert their own logs" ON activity_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);
