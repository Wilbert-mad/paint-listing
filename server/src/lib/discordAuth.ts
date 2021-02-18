import passport from 'passport';
import type { VerifyCallback } from 'passport-oauth2';
import { callbackURL, clientID, clientSecret } from '../configs.security';
import databaseManager from './databaseManager';
import Strategy from './Strategy';

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser<string>((id, done) => {
  const user = databaseManager.users.get(id);
  return user && done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID,
      clientSecret,
      callbackURL,
      scope: ['identify', 'guilds'],
    },
    (accessToken: string, refreshToken: string, profile: any, verified: VerifyCallback) => {
      console.log(profile);
    }
  )
);

export default passport;
