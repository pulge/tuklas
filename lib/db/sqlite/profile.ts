import { db } from '../client';
import { profile } from '../schema';
import { eq } from 'drizzle-orm';
import type { ProfileRepository } from '../repository';

export const profileRepository: ProfileRepository = {
  async get() {
    const [row] = await db.select().from(profile).where(eq(profile.id, 1));
    return row ?? null;
  },
  async update(data) {
    await db.insert(profile)
      .values({ id: 1, ...data })
      .onConflictDoUpdate({
        target: profile.id,
        set: data,
      });
  },
};
