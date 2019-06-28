import * as Router from 'koa-router';

import { ItemService } from '../../services/static/item.service';

export class ItemController {
  static async patchItems(ctx:Router.RouterContext) {
    await ItemService.patchItems();
    ctx.status = 200;
  }
}
