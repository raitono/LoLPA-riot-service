import * as Router from 'koa-router';

import { SummonerV4Controller } from './controllers/v4/summoner.controller';

const v4Router: Router = new Router({ prefix: '/v4' });
const summonerv4Router: Router = new Router({ prefix: '/summoner' });

summonerv4Router.get('/:name', SummonerV4Controller.getByName);
summonerv4Router.put('/:name', SummonerV4Controller.upsertByName);

v4Router.use(
    summonerv4Router.routes(),
    summonerv4Router.allowedMethods(),
);

export { v4Router };
