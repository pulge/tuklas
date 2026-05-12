import { NextResponse } from 'next/server';
import { google, gmail_v1 } from 'googleapis';
import { parseEmailAlert, CONNECTORS } from '@/lib/connectors';
import { ingestJobs } from '@/lib/data/ingest-jobs';
import { logActivity } from '@/lib/logger';
import { getIntegration } from '@/app/actions/integration-actions';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    // 1. Get user's Gmail integration from local SQLite
    const config = await getIntegration('gmail');

    if (!config) {
      return NextResponse.json({ success: false, inserted: 0, message: 'Gmail not configured' });
    }

    const { 
      gmail_client_id, 
      gmail_client_secret, 
      gmail_refresh_token 
    } = config;

    if (!gmail_refresh_token) {
      return NextResponse.json({ success: false, inserted: 0, message: 'Gmail refresh token missing' });
    }

    // 2. Authorize Gmail API
    const oauth2Client = new google.auth.OAuth2(
      gmail_client_id,
      gmail_client_secret
    );
    oauth2Client.setCredentials({ refresh_token: gmail_refresh_token });
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // 3. Fetch latest messages
    const domains = CONNECTORS.flatMap(c => c.senderDomains).filter(Boolean);
    const query = domains.length > 0 
      ? `from:(${domains.join(' OR ')}) is:unread` 
      : 'is:unread';

    console.log(`[Sync] Searching Gmail with query: "${query}"`);

    const listRes = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: 10
    });

    const messages = listRes.data.messages || [];
    console.log(`[Sync] Found ${messages.length} potential job alert messages.`);
    
    let totalInserted = 0;
    let latestEmailDate: string | null = null;

    for (const msg of messages) {
      if (!msg.id) continue;
      
      const detail = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
        format: 'full'
      });

      const payload = detail.data.payload;
      if (!payload) continue;

      const headers = payload.headers || [];
      const fromHeader = headers.find(h => h.name?.toLowerCase() === 'from')?.value || '';
      const dateHeader = headers.find(h => h.name?.toLowerCase() === 'date')?.value || '';
      
      if (dateHeader) {
        const msgDate = new Date(dateHeader);
        if (!latestEmailDate || msgDate > new Date(latestEmailDate)) {
          latestEmailDate = msgDate.toISOString();
        }
      }

      const sender = fromHeader.match(/<(.+)>|(\S+@\S+)/)?.[0]?.replace(/[<>]/g, '') || fromHeader;
      let html = '';
      const getHtmlFromBody = (body: { data?: string | null } | null | undefined) => {
        if (!body?.data) return '';
        return Buffer.from(body.data, 'base64').toString();
      };

      if (payload.mimeType === 'text/html') {
        html = getHtmlFromBody(payload.body);
      } else if (payload.parts) {
        const findHtml = (parts: gmail_v1.Schema$MessagePart[]): string => {
          for (const part of parts) {
            if (part.mimeType === 'text/html') return getHtmlFromBody(part.body);
            if (part.parts) {
              const res = findHtml(part.parts);
              if (res) return res;
            }
          }
          return '';
        };
        html = findHtml(payload.parts);
      }

      if (!html) continue;

      const parsedJobs = parseEmailAlert(sender, html);

      if (parsedJobs.length > 0) {
        const { inserted } = await ingestJobs(parsedJobs);
        totalInserted += inserted;
        
        await gmail.users.messages.modify({
          userId: 'me',
          id: msg.id,
          requestBody: { removeLabelIds: ['UNREAD'] }
        });
      }
    }

    await logActivity({
      action: 'email_ingest',
      status: 'success',
      details: {
        processed: messages.length,
        inserted: totalInserted,
        latestEmailDate
      }
    });

    return NextResponse.json({ 
      success: true, 
      inserted: totalInserted,
      processed: messages.length,
      latestEmailDate
    });

  } catch (error: unknown) {
    console.error('[Ingest Sync] Error:', error);
    const msg = error instanceof Error ? error.message : 'Internal server error';

    await logActivity({
      action: 'email_ingest',
      status: 'error',
      details: { error: msg }
    });

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
