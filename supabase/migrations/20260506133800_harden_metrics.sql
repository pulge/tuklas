-- Hardening System Metrics
-- Enable RLS to prevent unauthorized direct access via the anon key

ALTER TABLE system_metrics ENABLE ROW LEVEL SECURITY;

-- Only Allow Admins (via Service Role) to manage metrics.
-- Regular users have NO access to this table via the public API.
-- All metrics viewing/updating should happen through Server Actions.

-- Note: We don't add any SELECT policies for authenticated users. 
-- This ensures the data is only accessible via the 'service_role' client on the server.
