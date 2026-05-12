import { db } from "@/lib/db/client";
import { activityLog } from "@/lib/db/schema";
import { randomUUID } from "crypto";

export type ActivityAction = 
  | 'email_ingest' 
  | 'scrape' 
  | 'cv_extract' 
  | 'cv_clean'
  | 'ai_generation'
  | 'key_update'
  | 'key_remove'
  | 'application_status_update'
  | 'pipeline_toggle'
  | 'system_health_check';

export type ActivityStatus = 'info' | 'success' | 'warning' | 'error';

interface LogOptions {
  userId?: string;
  action: ActivityAction;
  details?: Record<string, unknown>;
  status?: ActivityStatus;
  useServiceRole?: boolean;
}

/**
 * Logs an activity to the local SQLite database.
 */
export async function logActivity({
  action,
  details = {},
  status = 'info',
}: LogOptions) {
  try {
    await db.insert(activityLog).values({
        id: randomUUID(),
        type: action,
        message: status,
        metadata: JSON.stringify(details),
    });
  } catch (err) {
    console.error('Error in logActivity:', err);
  }
}
