/**
 * Envelope encryption for sensitive config values (API keys, OAuth tokens).
 *
 * Uses AES-256-GCM — authenticated encryption that provides both
 * confidentiality AND integrity. A tampered ciphertext is rejected on decrypt.
 *
 * Key source: process.env.ENCRYPTION_KEY (hex-encoded, 64 chars = 32 bytes)
 *
 * IMPORTANT: Losing ENCRYPTION_KEY makes all stored credentials unreadable.
 * Store it securely in your hosting environment (Vercel Environment Variables)
 * and back it up offline.
 */

import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // 96-bit IV is GCM standard
const TAG_LENGTH = 16; // 128-bit auth tag

function getKey(): Buffer | null {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    console.warn('[tuklas] ENCRYPTION_KEY not set — integrations will not persist securely');
    return null;
  }
  if (key.length !== 64) {
    throw new Error(
      `ENCRYPTION_KEY must be 64 hex characters (32 bytes). Got ${key.length} characters.`
    );
  }
  return Buffer.from(key, "hex");
}

/**
 * Encrypt a plaintext string.
 * Returns a base64-encoded string: iv:tag:ciphertext
 */
export function encrypt(plaintext: string): string {
  const key = getKey();
  if (!key) return plaintext;
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  // Pack as: iv(12) + tag(16) + ciphertext — all base64 encoded
  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

/**
 * Decrypt a string produced by encrypt().
 * Throws if the key is wrong or the ciphertext was tampered with.
 */
export function decrypt(encoded: string): string {
  const key = getKey();
  if (!key) return encoded;
  const buf = Buffer.from(encoded, "base64");

  const iv = buf.subarray(0, IV_LENGTH);
  const tag = buf.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
  const ciphertext = buf.subarray(IV_LENGTH + TAG_LENGTH);

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  return Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]).toString("utf8");
}

/**
 * Encrypt all string values in a config object.
 * Skips encryption if ENCRYPTION_KEY is not set (graceful degradation in dev).
 */
export function encryptConfig(config: Record<string, string>): Record<string, string> {
  if (!process.env.ENCRYPTION_KEY) {
    console.warn("[tuklas] ENCRYPTION_KEY not set — storing config in plaintext.");
    return config;
  }
  const SKIP_ENCRYPTION = new Set(['gmail_address', 'gmail_pubsub_topic', 'google_pubsub_audience', 'model']);
  return Object.fromEntries(
    Object.entries(config).map(([k, v]) => {
      if (SKIP_ENCRYPTION.has(k) || !v) return [k, v];
      return [k, encrypt(v)];
    })
  );
}

/**
 * Decrypt all string values in a config object.
 * Gracefully handles values that are not encrypted (e.g., migrating from plaintext).
 */
export function decryptConfig(config: Record<string, string>): Record<string, string> {
  if (!process.env.ENCRYPTION_KEY) {
    return config;
  }
  return Object.fromEntries(
    Object.entries(config).map(([k, v]) => {
      if (!v) return [k, v];
      try {
        return [k, decrypt(v)];
      } catch (err) {
        // Value may not be encrypted yet (migration path) — return as-is
        console.warn(`[decryptConfig] Could not decrypt key "${k}" — treating as plaintext. This may indicate data corruption or migration.`, err);
        return [k, v];
      }
    })
  );
}
