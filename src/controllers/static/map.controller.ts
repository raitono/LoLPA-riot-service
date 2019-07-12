import * as Router from 'koa-router';

import { MapService } from '../../services/static/map.service';

export class MapController {
  static async patchMaps(ctx:Router.RouterContext) {
    await MapService.patchMaps();
    ctx.status = 200;
  }
}
