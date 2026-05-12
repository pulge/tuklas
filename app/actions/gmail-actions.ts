'use server';


import { getIntegration } from '@/app/actions/integration-actions';
import { google } from 'googleapis';
import { revalidatePath } from 'next/cache';

/**
 * Activates Gmail push notifications via Google Cloud Pub/Sub.
 */
export async function activateGmailWatch() {
  const config = await getIntegration('gmail');
  if (!config) return { error: 'Gmail integration not configured' };

  const {
    gmail_client_id,
    gmail_client_secret,
    gmail_refresh_token,
    gmail_pubsub_topic
  } = config;

  if (!gmail_client_id || !gmail_client_secret || !gmail_refresh_token || !gmail_pubsub_topic) {
    return { error: 'Gmail integration is missing required fields (Client ID, Secret, Refresh Token, or Topic)' };
  }

  const oauth2Client = new google.auth.OAuth2(
    gmail_client_id,
    gmail_client_secret
  );
  oauth2Client.setCredentials({ refresh_token: gmail_refresh_token });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  try {
    const res = await gmail.users.watch({
      userId: 'me',
      requestBody: {
        topicName: gmail_pubsub_topic,
        labelIds: ['INBOX'],
      },
    });

    console.log('[Gmail] Watch activated:', res.data);
    revalidatePath('/setup');
    return { success: true, data: res.data };
  } catch (err: unknown) {
    console.error('[Gmail] Watch failed:', err);
    return { error: `Failed to activate Gmail watch: ${err instanceof Error ? err.message : String(err)}` };
  }
}
