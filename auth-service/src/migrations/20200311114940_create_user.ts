import * as Knex from 'knex';

const USERS_TABLE_NAME = 'users';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.hasTable(USERS_TABLE_NAME)
    .then((isExist) => {
      if (isExist) {
        return;
      }
      return knex.schema.createTable(USERS_TABLE_NAME, (table) => {
        table.uuid('id').unique().primary().index();
        table.string('username').notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('first_name').notNullable().defaultTo('');
        table.string('last_name').notNullable().defaultTo('');
        table
          .enum('roles', ['ADMIN', 'GUEST', 'USER'])
          .notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('users');
}
