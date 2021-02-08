import { Request, Response, Router } from 'express';
const route = Router();

route.get('/', (req: Request, res: Response) => {
  res.send(200);
});

export default route;
