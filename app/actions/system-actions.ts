"use server";

import { logActivity } from "@/lib/logger";

/**
 * Checks system health and configuration status.
 */
export async function getSystemHealthAction() {
  const key = process.env.ENCRYPTION_KEY;
  const isKeyConfigured = !!key && key.length === 64;

  const health = {
    encryptionConfigured: isKeyConfigured,
  };

  await logActivity({
    action: 'system_health_check',
    status: isKeyConfigured ? 'success' : 'error',
    details: health
  });

  return health;
}
