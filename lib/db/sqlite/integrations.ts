import { db } from '../client';
import { integrations } from '../schema';
import { eq } from 'drizzle-orm';
import { encrypt, decrypt } from '@/lib/encryption';
import type { IntegrationRepository } from '../repository';

export const integrationRepository: IntegrationRepository = {
  async get(provider: string): Promise<string | null> {
    const [row] = await db.select().from(integrations).where(eq(integrations.provider, provider));
    if (!row) return null;
    return decrypt(row.encryptedKey);
  },
  async save(provider: string, key: string, config?: object): Promise<void> {
    const encryptedKey = encrypt(key);
    await db.insert(integrations)
      .values({ provider, encryptedKey, config: config ? JSON.stringify(config) : null })
      .onConflictDoUpdate({
        target: integrations.provider,
        set: { encryptedKey, config: config ? JSON.stringify(config) : null },
      });
  },
};
