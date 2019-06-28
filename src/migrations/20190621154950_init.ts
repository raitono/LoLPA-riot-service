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
    })
    .createTable('champions', (table) => {
      table.integer('id').primary().notNullable();
      table.string('name').notNullable();
      table.string('title').notNullable();
      table.text('blurb').notNullable();
      table.integer('attack').notNullable();
      table.integer('defense').notNullable();
      table.integer('magic').notNullable();
      table.integer('difficulty').notNullable();
      table.string('imageFull').notNullable();
      table.string('imageSprite').notNullable();
      table.string('imageGroup').notNullable();
      table.integer('imageX').notNullable();
      table.integer('imageY').notNullable();
      table.integer('imageW').notNullable();
      table.integer('imageH').notNullable();
      table.string('partype').notNullable();
      table.decimal('hp', 6, 3).notNullable();
      table.decimal('hpperlevel', 6, 3).notNullable();
      table.decimal('mp', 6, 3).notNullable();
      table.decimal('mpperlevel', 6, 3).notNullable();
      table.decimal('movespeed', 6, 3).notNullable();
      table.decimal('armor', 6, 3).notNullable();
      table.decimal('armorperlevel', 6, 3).notNullable();
      table.decimal('spellblock', 6, 3).notNullable();
      table.decimal('spellblockperlevel', 6, 3).notNullable();
      table.decimal('attackrange', 6, 3).notNullable();
      table.decimal('hpregen', 6, 3).notNullable();
      table.decimal('hpregenperlevel', 6, 3).notNullable();
      table.decimal('mpregen', 6, 3).notNullable();
      table.decimal('mpregenperlevel', 6, 3).notNullable();
      table.decimal('crit', 6, 3).notNullable();
      table.decimal('critperlevel', 6, 3).notNullable();
      table.decimal('attackdamage', 6, 3).notNullable();
      table.decimal('attackdamageperlevel', 6, 3).notNullable();
      table.decimal('attackspeedperlevel', 6, 3).notNullable();
      table.decimal('attackspeed', 6, 3).notNullable();
    })
    .createTable('tags', (table) => {
      table.increments('id').primary().notNullable();
      table.string('name').notNullable();
    })
    .createTable('championTags', (table) => {
      table.integer('championId');
      table.integer('tagId');
      table.unique(['championId', 'tagId']);
    });
};

exports.down = async function (knex: Knex) {
  return knex.schema.dropTable('summoners').dropTable('championTags')
    .dropTable('champions').dropTable('tags');
};
