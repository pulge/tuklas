export interface AIPreferences {
  provider: "server" | "gemini" | "openrouter";
  model?: string;
  gemini_api_key?: string;
  openrouter_api_key?: string;
}

export interface ConnectorCredentials {
  gmail_address?: string;
  gmail_client_id?: string;
  gmail_client_secret?: string;
  gmail_refresh_token?: string;
  gmail_pubsub_topic?: string;
  google_pubsub_audience?: string;
}

export interface ProfilePreferences {
  keywords: string[];
  location: string;
  salary_floor?: number;
  active_connectors: string[];
  ai_preferences?: AIPreferences;
  connector_credentials?: ConnectorCredentials;
  resume_prompt?: string;
  cover_letter_prompt?: string;
  pipeline_toggles?: {
    scraping: boolean;
    email: boolean;
  };
  jsearch_source?: "server" | "own";
  last_server_refresh_at?: string;
}

export interface Profile {
  id: string | number;
  user_id?: string;
  cv_text?: string;
  resumeRaw?: string | null;
  resumeCleaned?: string | null;
  preferences?: string | null;
  consent_at?: string | null;
  updatedAt?: string | null;
}
