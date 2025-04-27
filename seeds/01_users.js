const { hashPassword} = require('../app/helpers/password');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      username: 'abdelrahman',
      email: 'test@test.com',
      password:await hashPassword('password')
    },
  ]);
};
