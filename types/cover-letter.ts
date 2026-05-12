export interface CoverLetter {
  id: string;
  user_id: string;
  job_id: string;
  content: string;
  raw_content: string;
  model_used: string;
  generated_at: string;
  edited: boolean;
}
