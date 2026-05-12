import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { jobs, applications, integrations, profile, activityLog } from './schema';

export type Job = InferSelectModel<typeof jobs>;
export type NewJob = InferInsertModel<typeof jobs>;

export type Application = InferSelectModel<typeof applications>;
export type NewApplication = InferInsertModel<typeof applications>;

export type Integration = InferSelectModel<typeof integrations>;
export type NewIntegration = InferInsertModel<typeof integrations>;

export type Profile = InferSelectModel<typeof profile>;
export type NewProfile = InferInsertModel<typeof profile>;

export type ActivityLog = InferSelectModel<typeof activityLog>;
export type NewActivityLog = InferInsertModel<typeof activityLog>;
