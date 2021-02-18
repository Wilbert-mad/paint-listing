import { Router } from 'express';
const route = Router();

import users from './users/';
import bots from './bots';

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

export default route;
