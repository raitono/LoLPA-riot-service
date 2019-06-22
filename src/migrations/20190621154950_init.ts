require('dotenv').config();
import Knex = require('knex');

exports.up = async function (knex: Knex) {
  return knex.schema
    .createTable('summoners', (table) => {
      table.increments('id');
      table.string('puuid', 100);
      table.string('');
    });
};

exports.down = async function (knex: Knex) {
  
};
