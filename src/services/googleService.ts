import { google } from 'googleapis';
import { oAuth2Client } from '../config/google';
import { createEmail } from '../utils/createEmail';

export async function sendEmailGmail(to: string, subject: string, body: string) {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  const raw = createEmail(to, subject, body);
  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw,
    },
  });
  return res.data;
}
