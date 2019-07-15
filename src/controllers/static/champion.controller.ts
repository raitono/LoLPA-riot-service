import * as Router from 'koa-router';
import { ChampionService } from '../../services/static/champion.service';

const debug: any = require('debug')('riot-service:ChampionController');

export class ChampionController {
  static async getChampions(ctx:Router.RouterContext) {
    ctx.body = await ChampionService.getChampions();
  }
  static async patchChampions(ctx:Router.RouterContext, next) {
    debug('Begin patch');
    await ChampionService.patchChampions();
    ctx.status = 200;
    debug('End patch');
    next();
  }
}
