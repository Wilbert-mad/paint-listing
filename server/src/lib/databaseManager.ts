import mysql from 'mysql2/promise';
import { database, password, user } from '../configs.security';

export interface userServer {
  ServerId: string;
  _Name: string;
  ownerID: string;
  emojis: { id: string; name: string }[];
}

export interface userBot {
  BotId: string;
  _Name: string;
  ownerIDs: string[];
  _accessToken: string;
  _Description?: string;
}

export interface user {
  UserId: string;
  UserBots?: string[];
  UserServers?: string[];
}

// NOTE: only template holder data
const users: user[] = [
  {
    UserId: '1',
    UserBots: ['1'],
    UserServers: ['1'],
  },
];
const bots: userBot[] = [
  {
    BotId: '1',
    _Name: 'micro',
    ownerIDs: ['109827308'],
    _accessToken: 'aw8cjdf98awum9fc8m8e',
  },
];
const servers: userServer[] = [
  {
    ServerId: '1',
    _Name: 'gulp',
    ownerID: '9385098',
    emojis: [],
  },
];

class BaseDatabase {
  constructor(public maniger: databaseMainiger) {}
  get connection() {
    return this.maniger.connection;
  }
}

class UsersDatabase extends BaseDatabase {
  get(id: string): user | undefined {
    return users.find(u => u.UserId === id);
  }
}

class BotsDatabase extends BaseDatabase {
  get(id: string): userBot | undefined {
    return bots.find(b => b.BotId === id);
  }
}

class ServersDatabase extends BaseDatabase {
  get(id: string): userServer | undefined {
    return servers.find(b => b.ServerId === id);
  }
}

class databaseMainiger {
  private _connection?: mysql.Connection;
  get users() {
    return new UsersDatabase(this);
  }
  get bots() {
    return new BotsDatabase(this);
  }
  get servers() {
    return new ServersDatabase(this);
  }
  get connection() {
    return this._connection ?? null;
  }
  async connect() {
    try {
      this._connection = await mysql
        .createConnection({
          password,
          user,
          database,
        })
        .then(connection => {
          console.log('ready');
          return connection;
        });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new databaseMainiger();
