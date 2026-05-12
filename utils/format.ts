export function formatDate(dateString?: string): string {
  if (!dateString) return "Unknown date";
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatSalary(salary?: string): string {
  if (!salary) return "Salary not specified";
  return salary;
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function formatRelativeTime(dateString?: string): string {
  if (!dateString) return "Unknown date";
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}min${diffInMinutes === 1 ? '' : 's'} ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}hr${diffInHours === 1 ? '' : 's'} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}day${diffInDays === 1 ? '' : 's'} ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks}wk${diffInWeeks === 1 ? '' : 's'} ago`;
  
  return formatDate(dateString);
}
export function getJobSource(platform?: string | null, url?: string | null): string {
  if (!platform) return "Unknown";
  if (platform !== "jsearch" && platform !== "manual") {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  }

  if (url) {
    try {
      const hostname = new URL(url).hostname.replace(/^www\./, "");
      // Get the main domain (e.g., bebee.com instead of ph.bebee.com)
      const parts = hostname.split(".");
      if (parts.length >= 2) {
        const domain = parts[parts.length - 2];
        return domain.charAt(0).toUpperCase() + domain.slice(1);
      }
      return hostname;
    } catch {
      return platform.charAt(0).toUpperCase() + platform.slice(1);
    }
  }

  return platform.charAt(0).toUpperCase() + platform.slice(1);
}
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}
