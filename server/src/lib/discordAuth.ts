import passport from 'passport';
import type { VerifyCallback } from 'passport-oauth2';
import { callbackURL, clientID, clientSecret } from '../configs.security';
import databaseManager from './databaseManager';
import Strategy from './Strategy';

passport.serializeUser((user, done) => done(null, user.UserId));
passport.deserializeUser<string>(async (id, done) => {
  const user = await databaseManager.users.get(id);
  return user && done(null, user);
});

export interface userRaw {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
  public_flags: number;
  flags: number;
  locale: string;
  mfa_enabled: false;
  provider: string;
  accessToken: string;
  fetchedAt: Date;
}

passport.use(
  new Strategy(
    {
      clientID,
      clientSecret,
      callbackURL,
      scope: ['identify'],
    },
    async (accessToken: string, refreshToken: string, profile: userRaw, done: VerifyCallback) => {
      let user = await databaseManager.users.get(profile.id);
      if (!user) user = await databaseManager.users.create(profile.id, profile.avatar);
      if (!user) return done(new Error('Faild to get/create new user.'));

      console.log(user);
      done(undefined, user);
    }
  )
);

export default passport;
