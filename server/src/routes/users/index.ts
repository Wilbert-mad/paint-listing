import { Request, Response, Router } from 'express';
import databaseManager from '../../lib/databaseManager';
const route = Router();

route.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await databaseManager.users.get(id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

interface userBotsGetOps {
  id: string;
}

route.get(
  '/:id/bots',
  async (req: Request<{ id: string }, any, any, userBotsGetOps, Record<string, any>>, res: Response) => {
    const { id } = req.params;
    const { id: QId } = req.query;
    const user = await databaseManager.users.get(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (QId) {
      const bot = databaseManager.bots.get(QId);
      if (!bot) return res.json({ error: 'User bot not found' });
      return res.json(bot);
    }
    const botIDs = user.UserBots;
    res.json(botIDs ?? []);
  }
);

interface userServerGetOps {
  id: string;
}

route.get(
  '/:id/servers',
  async (req: Request<{ id: string }, any, any, userServerGetOps, Record<string, any>>, res: Response) => {
    const { id } = req.params;
    const { id: QId } = req.query;
    const user = await databaseManager.users.get(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (QId) {
      const server = databaseManager.servers.get(QId);
      if (!server) return res.status(404).json({ error: 'User sever not found' });
      return res.json(server);
    }
    const serverIDs = user.UserServers;
    return res.json(serverIDs ?? []);
  }
);

export default route;
