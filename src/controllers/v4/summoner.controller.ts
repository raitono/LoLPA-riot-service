import * as Router from 'koa-router';

import { SummonerV4Service } from '../../services/v4/summoner.service';

export class SummonerV4Controller {
  static async getByName(ctx:Router.RouterContext) {
    ctx.body = await SummonerV4Service.getByName(ctx.params['name']);
  }
  static async upsertByName(ctx:Router.RouterContext) {
    ctx.body = 'Not Implemented';
  }
  static async getByAccountId(ctx:Router.RouterContext) {
    ctx.body = await SummonerV4Service.getByAccountId(ctx.params['accountId']);
  }
}
