import { Job } from "./job";

export type ApplicationStatus =
  | "applied"
  | "interview"
  | "offer"
  | "rejected";

export interface Application {
  id: string;
  user_id?: string;
  job_id?: string | null;
  applied_at?: string | null;
  status: string;
  job?: Job;
  cover_letter_id?: string | null;
  notes?: string | null;
  interview_at?: string | null;
}

