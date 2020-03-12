import knex from 'knex';
import * as config from '../../config';

export const getPgClient = () => new PgService(config.DB_URL);

export class PgService {
  private client: any;
  constructor(dbUrl: string) {
    this.client = knex(({
      client: 'pg',
      connection: dbUrl,
      pool: { min: 0, max: config.MAX_NUMBER_OF_CLIENTS_IN_DB_POOL },
    }));
  }

  public insert(tableName: string, values: any[]): Promise<any> {
    return this.client(tableName).insert(values);
  }

  public select(tableName: string, limit?: number, skip?: number): Promise<any> {
    return this.client(tableName).select('*')
      .from(tableName)
      .limit(limit)
      .offset(skip);
  }

  public query(queryText: string, values?: any[]): Promise<any> {
    return this.client.raw(queryText, values);
  }

  public closeConnection(): Promise<void> {
    return this.client.end();
  }
}
