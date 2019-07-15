import * as Router from 'koa-router';
import { MapService } from '../../services/static/map.service';

const debug: any = require('debug')('riot-service:MapController');

export class MapController {
  static async patchMaps(ctx:Router.RouterContext, next) {
    debug('Begin patch');
    await MapService.patchMaps();
    ctx.status = 200;
    debug('End patch');
    next();
  }
}
