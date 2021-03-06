import { Request, Router } from 'express';
import passport from '../../lib/discordAuth';
const route = Router();

route.get('/', passport.authenticate('discordOauth'));
route.get('/redirect', passport.authenticate('discordOauth'), ({ user }: Request, res) => {
  res.send(user);
});

export default route;
