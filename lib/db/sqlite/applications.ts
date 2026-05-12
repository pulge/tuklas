import { db } from '../client';
import { applications, jobs } from '../schema';
import { eq } from 'drizzle-orm';
import type { ApplicationRepository } from '../repository';

export const applicationRepository: ApplicationRepository = {
  async getApplications() {
    const rows = await db.select()
      .from(applications)
      .leftJoin(jobs, eq(applications.jobId, jobs.id))
      .orderBy(applications.createdAt);

    return rows.map(row => ({
      ...row.applications,
      job: row.jobs
    }));
  },
  async insertApplication(app) {
    const [inserted] = await db.insert(applications).values(app).returning();
    return inserted;
  },
  async updateApplication(id, data) {
    await db.update(applications).set(data).where(eq(applications.id, id));
  },
  async deleteApplication(id) {
    await db.delete(applications).where(eq(applications.id, id));
  },
};
