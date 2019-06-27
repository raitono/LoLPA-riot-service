require('dotenv').config();
import Knex = require('knex');

exports.up = async function (knex: Knex) {
  return knex.schema
    .createTable('summoners', (table) => {
      table.string('puuid', 100).primary().notNullable();
      table.string('id', 63).notNullable();
      table.string('accountId', 56).notNullable();
      table.string('name', 50).notNullable();
      table.integer('summonerLevel').notNullable();
      table.integer('profileIconId').notNullable();
      table.dateTime('revisionDate').notNullable();
      table.dateTime('lastUpdated').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = async function (knex: Knex) {
  return knex.schema.dropTable('summoners');
};
