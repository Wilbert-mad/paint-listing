import { Request, Router } from 'express';
import passport from '../../lib/discordAuth';
const route = Router();

route.get('/', passport.authenticate('discordOauth'));
route.get(
  '/redirect',
  passport.authenticate('discordOauth'),
  ({ query }: Request<any, any, any, { redirect: string }>, res) => {
    if (query.redirect) return res.redirect('/');
    return res.redirect(query.redirect);
  }
);

export default route;
