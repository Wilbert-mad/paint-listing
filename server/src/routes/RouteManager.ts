import { Router } from 'express';
const route = Router();

import users from './users/';
import bots from './bots';
import auth from './auth/discord';

/**
 * users of the database:
 * * id
 * * username
 * * bots
 * * servers
 */
route.use('/users', users);

/**
 * Bots of the database:
 */
route.use('/bots', bots);

/**
 * discord login auth api
 */
route.use('/auth', auth);

export default route;
