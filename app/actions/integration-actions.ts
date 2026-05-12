"use server";

import { revalidatePath } from 'next/cache';
import { logActivity } from '@/lib/logger';
import { integrationRepository } from '@/lib/db/sqlite/integrations';
import { db } from '@/lib/db/client';
import { integrations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { maskConfig } from '@/lib/masking';

const ALLOWED_CONFIG_KEYS: Record<string, Set<string>> = {
  rapidapi: new Set(['key']),
  gemini: new Set(['key', 'model']),
  openrouter: new Set(['key', 'model']),
  gmail: new Set(['gmail_address', 'gmail_client_id', 'gmail_client_secret', 'gmail_refresh_token', 'gmail_pubsub_topic', 'google_pubsub_audience']),
};

export async function getIntegration(service: string, mask = false) {
  try {
    const [row] = await db.select().from(integrations).where(eq(integrations.provider, service));
    if (!row) return null;
    const config = row.config ? JSON.parse(row.config) : {};
    return mask ? maskConfig(config) : config;
  } catch {
    return null;
  }
}

export async function saveIntegration(
  service: string,
  config: Record<string, string>,
) {
  try {
    const allowedKeys = ALLOWED_CONFIG_KEYS[service];
    const sanitized: Record<string, string> = {};
    if (allowedKeys) {
      for (const [k, v] of Object.entries(config)) {
        if (allowedKeys.has(k)) sanitized[k] = v;
      }
    }

    // Fetch existing configuration to merge
    const existingConfig = await getIntegration(service) || {};
    const mergedConfig = { ...existingConfig, ...sanitized };

    // Preserve the primary API key if not provided in the update
    const newKey = sanitized.key || sanitized.gmail_client_secret;
    const existingKey = await integrationRepository.get(service);
    const finalKey = newKey || existingKey || 'dummy_key';

    await integrationRepository.save(service, finalKey, mergedConfig);

    await logActivity({
      action: 'key_update',
      status: 'success',
      details: { service, fields: Object.keys(sanitized) }
    });

    revalidatePath('/integrations');
    return { success: true };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}

export async function removeIntegration(service: string) {
  try {
    await db.delete(integrations).where(eq(integrations.provider, service));

    await logActivity({
      action: 'key_remove',
      status: 'success',
      details: { service }
    });

    revalidatePath('/integrations');
    return { success: true };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}
