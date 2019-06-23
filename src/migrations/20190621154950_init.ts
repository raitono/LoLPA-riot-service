require('dotenv').config();
import Knex = require('knex');

exports.up = async function (knex: Knex) {
  return knex.schema
    .createTable('summoners', (table) => {
      table.string('puuid', 100).primary();
      table.string('summonerId', 63);
      table.string('accountId', 56);
      table.string('name', 50);
      table.integer('summonerLevel');
      table.integer('profileIconId');
      table.dateTime('revisionDate');
      table.dateTime('lastUpdated');
    });
};

exports.down = async function (knex: Knex) {
  return knex.schema.dropTable('summoners');
};
