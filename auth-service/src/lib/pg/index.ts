import { Pool, PoolConfig, QueryResult } from 'pg';
import * as config from '../../config';
import { parser, _ } from '../../utils';

export const getPgClient = () => new PgService(config.DB_URL);

const parseDbUrlIntoConfigs = (url: string): PoolConfig => {
  const parsed = parser.urlParse(url);
  return {
    user: parsed.username,
    database: parsed.pathname.substring(1, parsed.pathname.length),
    password: parsed.password,
    host: parsed.hostname,
    port: Number(_.get(parsed, 'port', '0')),
    max: config.MAX_NUMBER_OF_CLIENTS_IN_DB_POOL,
    idleTimeoutMillis: config.IDLE_TIMOUT_MILLIS_IN_DB,
  };
};

export class PgService {
  private client: Pool;
  constructor(dbUrl: string) {
    this.client = new Pool(parseDbUrlIntoConfigs(dbUrl));
    this.client.on('error', (err, client) => {
      console.error('idle client error', err.message, err.stack);
    });
  }

  public createConnection(): Promise<void> {
    return this.client
      .connect()
      .then(() => console.log('connected'))
      .catch(err => console.error('connection error', err.stack));
  }

  public query(queryText: string, values?: any[]): Promise<QueryResult<any>> {
    return this.client.query(queryText, values);
  }

  public closeConnection(): Promise<void> {
    return this.client.end();
  }
}
