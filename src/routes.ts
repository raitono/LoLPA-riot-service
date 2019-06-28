import * as Router from 'koa-router';

import { SummonerV4Controller } from './controllers/v4/summoner.controller';
import { ChampionController } from './controllers/static/champion.controller';
import { ItemController } from './controllers/static/item.controller';

const v4Router: Router = new Router({ prefix: '/v4' });
const summonerv4Router: Router = new Router({ prefix: '/summoner' });
const staticRouter: Router = new Router({ prefix: '/static' });
const championRouter: Router = new Router({ prefix: '/champion' });
const itemRouter: Router = new Router({ prefix: '/item' });

summonerv4Router.get('/:name', SummonerV4Controller.getByName);
summonerv4Router.get('/account/:accountId', SummonerV4Controller.getByAccountId);
summonerv4Router.put('/:name', SummonerV4Controller.upsertByName);

championRouter.get('/', ChampionController.getChampions);
championRouter.get('/patch', ChampionController.patchChampions);

itemRouter.get('/patch', ItemController.patchItems);

v4Router.use(
    summonerv4Router.routes(),
    summonerv4Router.allowedMethods(),
);

staticRouter.use(
    championRouter.routes(),
    championRouter.allowedMethods(),
    itemRouter.routes(),
    itemRouter.allowedMethods(),
);

export { v4Router, staticRouter };
