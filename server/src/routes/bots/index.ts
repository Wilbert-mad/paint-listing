import { Request, Response, Router } from 'express';
import databaseManager from '../../lib/databaseManager';
const route = Router();

interface botsGetOps {
  id: string;
}

route.get('/:id', (req: Request<botsGetOps, any, any, any, Record<string, any>>, res: Response) => {
  const { id } = req.params;
  const bot = databaseManager.bots.get(id);
  if (!bot) return res.status(404).json({ error: 'Bot no found' });
  res.json(bot);
});

export default route;
