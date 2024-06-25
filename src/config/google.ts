import { google } from 'googleapis';
import express from 'express';

// Constants
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';

// OAuth2 Client
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Express Router
export const googleAuthRouter = express.Router();

googleAuthRouter.get('/auth/google', async (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'],
  });

  // Dynamic import of 'open' module
  const { default: open } = await import('open');
  await open(authUrl);

  res.send('Opening Google OAuth URL');
});

googleAuthRouter.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  if (code) {
    const { tokens } = await oAuth2Client.getToken(code as string);
    oAuth2Client.setCredentials(tokens);
    res.send('Gmail OAuth successful');
  } else {
    res.status(400).send('No code query parameter provided');
  }
});

export { oAuth2Client };
