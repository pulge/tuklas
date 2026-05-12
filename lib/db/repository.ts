import type { Job, NewJob, Application, NewApplication, Profile } from './types';

export interface JobRepository {
  getJobs(): Promise<Job[]>;
  getJob(id: string): Promise<Job | null>;
  insertJob(job: NewJob): Promise<Job>;
  updateJob(id: string, data: Partial<Job>): Promise<void>;
  updateJobStatus(id: string, status: string): Promise<void>;
  deleteJob(id: string): Promise<void>;
}

export interface ApplicationRepository {
  getApplications(): Promise<Application[]>;
  insertApplication(app: NewApplication): Promise<Application>;
  updateApplication(id: string, data: Partial<Application>): Promise<void>;
  deleteApplication(id: string): Promise<void>;
}

export interface IntegrationRepository {
  get(provider: string): Promise<string | null>;
  save(provider: string, key: string, config?: object): Promise<void>;
}

export interface ProfileRepository {
  get(): Promise<Profile | null>;
  update(data: Partial<Profile>): Promise<void>;
}
