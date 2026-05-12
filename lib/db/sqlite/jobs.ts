import { db } from '../client';
import { jobs } from '../schema';
import { eq } from 'drizzle-orm';
import type { JobRepository } from '../repository';

export const jobRepository: JobRepository = {
  async getJobs() {
    return db.select().from(jobs).orderBy(jobs.createdAt);
  },
  async getJob(id) {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, id));
    return job ?? null;
  },
  async insertJob(job) {
    const [inserted] = await db.insert(jobs).values(job).returning();
    return inserted;
  },
  async updateJob(id, data) {
    await db.update(jobs).set(data).where(eq(jobs.id, id));
  },
  async updateJobStatus(id, status) {
    await db.update(jobs).set({ status }).where(eq(jobs.id, id));
  },
  async deleteJob(id) {
    await db.delete(jobs).where(eq(jobs.id, id));
  },
};
