import * as Knex from 'knex';
import { uuid } from '../utils';

const generateUsers = (numUsers: number) => {
  const users = new Array(numUsers);
  const allRoles = ['GUEST', 'USER', 'ADMIN'];
  for (let i = 0; i < numUsers; i += 1) {
    const id = uuid.v4();
    const username = `username_${id.substr(id.length / 2, id.length)}_${i}`;
    users[i] = {
      id,
      username,
      roles: allRoles[Math.floor(Math.random() * (allRoles.length - 1) + 1) - 1],
      email: `${username}@mail.com`,
      first_name: `fn_${i}`,
      last_name: `ln_${i}`,
      password: 'qwerty',
    };
  }
  return users;
};

export async function seed(knex: Knex): Promise<any> {
  return knex('users').del()
    .then(() => {
      return knex('users').insert(generateUsers(10));
    });
}
