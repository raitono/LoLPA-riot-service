import * as Router from 'koa-router';
import { SummonerSpellService } from '../../services/static/summonerSpell.service';

const debug: any = require('debug')('riot-service:SummonerSpellController');

export class SummonerSpellController {
  static async patchSpells(ctx:Router.RouterContext, next) {
    debug('Begin patch');
    await SummonerSpellService.patchSpells();
    ctx.status = 200;
    debug('End patch');
    next();
  }
}
