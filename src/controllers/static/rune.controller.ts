import * as Router from 'koa-router';
import { RuneService } from '../../services/static/rune.service';

const debug: any = require('debug')('riot-service:RuneController');

export class RuneController {
  static async patchRunes(ctx:Router.RouterContext, next) {
    debug('Begin patch');
    await RuneService.patchRunes();
    ctx.status = 200;
    debug('End patch');
    next();
  }
}
