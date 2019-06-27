// Global setup
require('dotenv').config();
const debug: any = require('debug')('riot-service:app');

// Third party imports
import * as HttpStatus from 'http-status-codes';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as Koa from 'koa';
import Knex = require('knex');
import { Model } from 'objection';
const app:Koa = new Koa();

// My imports
import { v4Router } from './routes';

// Database setup
const knex: Knex = Knex(require('../knexfile')[process.env.NODE_ENV]);
Model.knex(knex);

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

app.use(bodyParser());
app.use(json());

// Route middleware
app.use(v4Router.routes());
app.use(v4Router.allowedMethods());

app.use(async (ctx:Koa.Context) => (ctx.body = { msg: 'Hello riot-service!' }));

// Application error logging.
app.on('error', console.error);

export default app;
