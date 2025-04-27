const knex = require('knex');
const config = require('../knexfile').development;

const db = knex(config);

// Test the connection
db.raw('SELECT 1')
  .then(() => console.log('Database connected successfully'))
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

module.exports = db;