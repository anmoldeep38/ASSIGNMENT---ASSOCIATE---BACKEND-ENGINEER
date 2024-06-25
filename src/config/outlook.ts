import passport from 'passport';
import { OutlookStrategy } from 'passport-outlook';
import express from 'express';
import { Request } from 'express';

const outlookRouter = express.Router();

passport.use(
  new OutlookStrategy(
    {
      clientID: process.env.OUTLOOK_CLIENT_ID!,
      clientSecret: process.env.OUTLOOK_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/auth/outlook/callback',
      passReqToCallback: true,
    },
    (req: Request, accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
      // Here, you would find or create the user in your database
      // and then call the done callback with the user object
      done(null, profile);
    }
  )
);

outlookRouter.get('/auth/outlook', passport.authenticate('windowslive', { scope: ['wl.signin', 'wl.offline_access', 'wl.emails'] }));

outlookRouter.get(
  '/auth/outlook/callback',
  passport.authenticate('windowslive', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

export { outlookRouter as outlookAuthRouter };
