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

export interface dbUser {
  UserId: string;
  avatar?: string;
  UserBots?: string[];
  UserServers?: string[];
}

// NOTE: only template holder data
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

interface IUser extends dbUser {
  constructor: {
    name: 'RowDataPacket';
  };
}
class UsersDatabase extends BaseDatabase {
  private _cache = new Map<string, IUser>();
  async get(id: string): Promise<dbUser | undefined> {
    if (this._cache.has(id)) return this._cache.get(id);
    const exi = await this.connection?.query<IUser[]>(`SELECT * FROM Users WHERE UserId = ${id}`);
    if (!exi) return undefined;
    const user = exi[0].find(f => f.UserId === id);
    if (!user) return undefined;
    this._cache.set(id, user);
    return user;
  }
  async create(id: string, av: string | null): Promise<dbUser | undefined> {
    await this.connection?.execute<IUser[]>(`INSERT INTO Users (UserId, avatar) VALUES ("${id}", "${av}");`);
    const exi = await this.get(id);
    return exi;
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
          connection.execute(`CREATE TABLE IF NOT EXISTS Users(
            UserId VARCHAR(20) NOT NULL PRIMARY KEY,
            avatar TEXT,
            UserServers JSON,
            UserBots JSON
          );`);
          return connection;
        });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new databaseMainiger();
