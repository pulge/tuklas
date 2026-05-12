CREATE TABLE `activity_log` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text,
	`message` text,
	`metadata` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`job_id` text,
	`status` text DEFAULT 'applied',
	`applied_at` text,
	`notes` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `integrations` (
	`provider` text PRIMARY KEY NOT NULL,
	`encrypted_key` text NOT NULL,
	`config` text,
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`company` text NOT NULL,
	`platform` text,
	`url` text,
	`location` text,
	`salary` text,
	`description` text,
	`status` text DEFAULT 'new',
	`posted_at` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` integer PRIMARY KEY DEFAULT 1 NOT NULL,
	`resume_raw` text,
	`resume_cleaned` text,
	`keywords` text,
	`preferences` text,
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
