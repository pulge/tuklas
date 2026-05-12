import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const jobs = sqliteTable('jobs', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  company: text('company').notNull(),
  platform: text('platform'),
  url: text('url'),
  location: text('location'),
  salary: text('salary'),
  description: text('description'),
  status: text('status').default('new'),
  postedAt: text('posted_at'),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const applications = sqliteTable('applications', {
  id: text('id').primaryKey(),
  jobId: text('job_id'),
  status: text('status').default('applied'),
  appliedAt: text('applied_at'),
  notes: text('notes'),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const integrations = sqliteTable('integrations', {
  provider: text('provider').primaryKey(),
  encryptedKey: text('encrypted_key').notNull(),
  config: text('config'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
});

export const profile = sqliteTable('profile', {
  id: integer('id').primaryKey().default(1),
  resumeRaw: text('resume_raw'),
  resumeCleaned: text('resume_cleaned'),
  keywords: text('keywords'),
  preferences: text('preferences'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
});

export const activityLog = sqliteTable('activity_log', {
  id: text('id').primaryKey(),
  type: text('type'),
  message: text('message'),
  metadata: text('metadata'),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const coverLetters = sqliteTable('cover_letters', {
  id: text('id').primaryKey(),
  jobId: text('job_id').unique(),
  content: text('content'),
  rawContent: text('raw_content'),
  modelUsed: text('model_used'),
  edited: integer('edited', { mode: 'boolean' }).default(false),
  generatedAt: text('generated_at').default('CURRENT_TIMESTAMP'),
});
