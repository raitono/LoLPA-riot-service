require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: 'summoner'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './out/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './out/seeds'
    }
  }
};
