import * as Knex from 'knex';

const USERS_TABLE_NAME = 'users';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable(USERS_TABLE_NAME, (table) => {
    table.renameColumn('roles', 'role');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable(USERS_TABLE_NAME, (table) => {
    table.renameColumn('role', 'roles');
  });
}
