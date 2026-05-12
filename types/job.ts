import { z } from "zod";

export const manualJobSchema = z.object({
  title: z.string().min(2, "Title is too short"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
  platform: z.string(),
  description: z.string().min(10, "Provide a more detailed description"),
  salary: z.string().optional(),
});

export type ManualJobValues = z.infer<typeof manualJobSchema>;

export type JobStatus = "new" | "existing" | "skipped" | "applied" | string;

export interface Job {
  id: string;
  user_id?: string;
  title: string;
  company: string;
  location?: string | null;
  platform?: string | null;
  url?: string | null;
  description?: string | null;
  salary?: string | null;
  posted_at?: string | null;
  scraped_at?: string | null;
  status: string;
}
