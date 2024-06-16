const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
  }
});

module.exports = knex;
