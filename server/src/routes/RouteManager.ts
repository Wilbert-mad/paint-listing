import { Router } from 'express';
const route = Router();

import main from './main';

route.use('/', main);

export default route;
