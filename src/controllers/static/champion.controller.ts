import * as Router from 'koa-router';

import { ChampionService } from '../../services/static/champion.service';

export class ChampionController {
  static async getChampions(ctx:Router.RouterContext) {
    ctx.body = await ChampionService.getChampions();
  }
  static async patchChampions(ctx:Router.RouterContext) {
    await ChampionService.patchChampions();
    ctx.status = 200;
  }
}
