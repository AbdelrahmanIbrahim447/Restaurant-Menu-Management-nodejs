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

const findUserByEmail = async(email) => {
  return await db('users').where({email}).first();
}


const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

module.exports = { createUser, findUserByUsername,findUserByEmail,generateToken };