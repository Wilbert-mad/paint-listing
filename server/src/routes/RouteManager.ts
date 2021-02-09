import { Router } from 'express';
const route = Router();

import users from './users/';

/**
 * users of the database:
 * * id
 * * username
 * * bots
 * * servers
 */
route.use('/users', users);

export default route;
