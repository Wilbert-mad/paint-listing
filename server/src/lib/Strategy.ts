import oauth2, { StateStore, VerifyCallback } from 'passport-oauth2';
import type { OutgoingHttpHeaders } from 'http';
import type { Request } from 'express';

interface ops {
  authorizationURL?: string;
  tokenURL?: string;
  clientID: string;
  clientSecret: string;
  callbackURL?: string;
  customHeaders?: OutgoingHttpHeaders;
  scope?: string | string[];
  scopeSeparator?: string;
  sessionKey?: string;
  store?: StateStore;
  state?: any;
  skipUserProfile?: any;
  pkce?: boolean;
  proxy?: any;
  passReqToCallback?: false;
}

const defaultOps = {
  authorizationURL: 'https://discord.com/api/oauth2/authorize',
  tokenURL: 'https://discord.com/api/oauth2/token',
  scopeSeparator: ' ',
};

export default class Strategy extends oauth2.Strategy {
  private _scope: any;
  constructor(options: ops, verify: oauth2.VerifyFunction) {
    options = options || {};
    super(Object.assign(options, defaultOps), verify);

    this.name = 'discordOauth';
    this._oauth2.useAuthorizationHeaderforGET(true);
  }

  authenticate(req: Request, options: any) {
    super.authenticate(req, options);
  }

  userProfile(accessToken: string, done: VerifyCallback) {
    this._oauth2.get('https://discord.com/api/users/@me', accessToken, (error, body) => {
      if (error) return done(new Strategy.InternalOAuthError('Failed to fetch the user profile.', error));

      try {
        var parsedData = JSON.parse(body as string);
      } catch (e) {
        return done(new Error('Failed to parse the user profile.'));
      }

      const profile = parsedData;
      profile.provider = 'discord';
      profile.accessToken = accessToken;

      this.checkScope('connections', accessToken, (err, connections) => {
        if (err) done(err);
        if (connections) profile.connections = connections;
        this.checkScope('guilds', accessToken, (erry, guilds) => {
          if (erry) done(erry);
          if (guilds) profile.guilds = guilds;

          profile.fetchedAt = new Date();
          return done(null, profile);
        });
      });
    });
  }

  checkScope(scope: string, accessToken: string, cb: VerifyCallback) {
    if (this._scope && this._scope.indexOf(scope) !== -1) {
      this._oauth2.get(`https://discord.com/api/users/@me/${scope}`, accessToken, function (err, body, res) {
        if (err) return cb(new Strategy.InternalOAuthError(`Failed to fetch user's ${scope}`, err));
        try {
          var json = JSON.parse(body as string);
        } catch (e) {
          return cb(new Error(`Failed to parse user's ${scope}`));
        }
        cb(null, json);
      });
    } else {
      cb(null, undefined);
    }
  }

  authorizationParams(options: { permissions: any; prompt: any }) {
    var params: any = {};
    if (typeof options.permissions !== 'undefined') params.permissions = options.permissions;
    if (typeof options.prompt !== 'undefined') params.prompt = options.prompt;
    return params;
  }
}
