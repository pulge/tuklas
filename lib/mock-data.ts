import { Job } from "@/types/job";
import { Application } from "@/types/application";

export const mockJobs: Job[] = [
  {
    id: "1",
    user_id: "u1",
    title: "Senior Frontend Engineer",
    company: "Tech Innovators",
    location: "Remote, PH",
    platform: "jobstreet",
    url: "https://example.com",
    description: "Looking for a React expert with 5+ years experience in Next.js and Tailwind. Must have strong understanding of SSR and App Router.",
    status: "new",
    scraped_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2h ago
  },
  {
    id: "2",
    user_id: "u1",
    title: "Full Stack Developer",
    company: "Acme Corp",
    location: "Makati City",
    platform: "linkedin",
    url: "https://example.com",
    description: "Next.js and Node.js required for a high-traffic e-commerce platform.",
    status: "new",
    scraped_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1d ago
  },
  {
    id: "3",
    user_id: "u1",
    title: "UI/UX Designer",
    company: "Creative Minds",
    location: "BGC, Taguig",
    platform: "jobstreet",
    url: "https://example.com",
    description: "Design beautiful interfaces for our next-gen mobile apps.",
    status: "new",
    scraped_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5h ago
  },
  {
    id: "4",
    user_id: "u1",
    title: "Backend Architect",
    company: "DataFlow",
    location: "Remote",
    platform: "linkedin",
    url: "https://example.com",
    description: "Scaling distributed systems with Go and Kubernetes.",
    status: "new",
    scraped_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() // 2d ago
  },
  {
    id: "5",
    user_id: "u1",
    title: "QA Automation Engineer",
    company: "BugFree",
    location: "Manila, PH",
    platform: "jobstreet",
    url: "https://example.com",
    description: "Implement Playwright and Cypress tests for our web suites.",
    status: "new",
    scraped_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() // 12h ago
  },
  {
    id: "6",
    user_id: "u1",
    title: "DevOps Lead",
    company: "CloudOps",
    location: "Remote",
    platform: "linkedin",
    url: "https://example.com",
    description: "Managing AWS infrastructure and CI/CD pipelines.",
    status: "new",
    scraped_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3d ago
  },
  {
    id: "7",
    user_id: "u1",
    title: "Junior React Developer",
    company: "StartupInc",
    location: "Pasig City",
    platform: "jobstreet",
    url: "https://example.com",
    description: "Join our fast-growing team and learn the latest in React.",
    status: "new",
    scraped_at: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30m ago
  }
];

export const mockApplications: Application[] = [
  {
    id: "app1",
    user_id: "u1",
    job_id: "1",
    applied_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: "interview",
    job: mockJobs[0]
  },
  {
    id: "app2",
    user_id: "u1",
    job_id: "4",
    applied_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "applied",
    job: mockJobs[3]
  }
];
