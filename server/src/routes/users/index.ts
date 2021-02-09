import { Request, Response, Router } from 'express';
const route = Router();

export interface userServer {
  id: string;
}

export interface userBot {
  id: string;
}

export interface user {
  id: string;
  username: string;
  bots: userBot[];
  servers: userServer[];
}

// NOTE: only template holder data
const users: user[] = [
  {
    id: '1',
    username: 'gamerpop',
    bots: [
      {
        id: '1',
      },
    ],
    servers: [
      {
        id: '1',
      },
    ],
  },
];

route.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.send(user);
});

interface userBotsGetOps {
  id: string;
}

route.get('/:id/bots', (req: Request<{ id: string }, any, any, userBotsGetOps, Record<string, any>>, res: Response) => {
  const { id } = req.params;
  const { id: QId } = req.query;
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const bot = user.bots.find(b => b.id === QId);
  if (!bot) return res.json({ error: 'User bot not found' });
  res.json(bot);
});

interface userServerGetOps {
  id: string;
}

route.get(
  '/:id/servers',
  (req: Request<{ id: string }, any, any, userServerGetOps, Record<string, any>>, res: Response) => {
    const { id } = req.params;
    const { id: QId } = req.query;
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const server = user.servers.find(s => s.id === QId);
    if (!server) return res.status(404).json({ error: 'User sever not found' });
    res.json(server);
  }
);

export default route;
