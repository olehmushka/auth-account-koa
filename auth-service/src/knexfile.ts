import * as configs from './config';
import * as utils from './utils';

const dbConfigs = utils.parser.dbUrlParse(configs.DB_URL);

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: dbConfigs.database,
      user: dbConfigs.user,
      host: dbConfigs.host,
      port: dbConfigs.port,
      password: dbConfigs.password,
    },
    pool: {
      min: 2,
      max: configs.MAX_NUMBER_OF_CLIENTS_IN_DB_POOL,
    },
    migrations: {
      directory: `${__dirname}/migrations/`,
      extension: 'ts',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: `${__dirname}/seeds/`,
    },
  },
};
