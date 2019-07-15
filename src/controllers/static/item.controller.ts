import * as Router from 'koa-router';
import { ItemService } from '../../services/static/item.service';

const debug: any = require('debug')('riot-service:ItemController');

export class ItemController {
  static async patchItems(ctx:Router.RouterContext, next) {
    debug('Begin patch');
    await ItemService.patchItems();
    ctx.status = 200;
    debug('End patch');
    next();
  }
}
