const db = require('../../config/database');

const createUser = async ({ username, email, password }) => {
  const [userId] = await db('users').insert({
    username,
    email,
    password
  });
  return userId;
};

const findUserByUsername = async (username) => {
  return await db('users').where({ username }).first();
};

module.exports = { createUser, findUserByUsername };