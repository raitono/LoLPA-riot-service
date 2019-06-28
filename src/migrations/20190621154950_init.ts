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
    })
    .createTable('items', (table) => {
      table.string('id').primary().notNullable();
      table.string('name').notNullable();
      table.boolean('isRune');
      table.integer('runeTier');
      table.string('runeType');
      table.integer('goldBase');
      table.integer('goldTotal');
      table.integer('goldSell');
      table.boolean('purchasable');
      table.string('group');
      table.text('description');
      table.text('colloq');
      table.text('plaintext');
      table.boolean('consumed');
      table.integer('stacks');
      table.integer('depth');
      table.boolean('consumeOnFull');
      table.integer('specialRecipe');
      table.boolean('inStore');
      table.boolean('hideFromAll');
      table.string('requiredChampion');
      table.string('requiredAlly');
      table.string('imageFull');
      table.string('imageSprite');
      table.string('imageGroup');
      table.integer('imageX');
      table.integer('imageY');
      table.integer('imageW');
      table.integer('imageH');
    })
    .createTable('itemTags', (table) => {
      table.integer('itemId');
      table.integer('tagId');
      table.unique(['itemId', 'tagId']);
    })
    .createTable('maps', (table) => {
      table.integer('id').primary().notNullable();
    })
    .createTable('itemStats', (table) => {
      table.integer('id').primary().notNullable();
      table.string('itemId');
    });
};

exports.down = async function (knex: Knex) {
  return knex.schema.dropTable('summoners').dropTable('championTags')
    .dropTable('champions').dropTable('itemTags').dropTable('tags').dropTable('items')
    .dropTable('maps').dropTable('itemstats');
};
