import { db } from "../client";
import { coverLetters } from "../schema";
import { eq } from "drizzle-orm";

export const coverLetterRepository = {
  async getByJobId(jobId: string) {
    const results = await db
      .select()
      .from(coverLetters)
      .where(eq(coverLetters.jobId, jobId))
      .limit(1);
    return results[0] || null;
  },

  async upsert(data: typeof coverLetters.$inferInsert) {
    // SQLite upsert in Drizzle
    return await db
      .insert(coverLetters)
      .values(data)
      .onConflictDoUpdate({
        target: coverLetters.jobId,
        set: {
          content: data.content,
          rawContent: data.rawContent,
          modelUsed: data.modelUsed,
          edited: data.edited,
        },
      });
  },
};
