import { Kayn } from 'kayn';
import { Item } from '../../models/item.model';
import { Tag } from '../../models/tag.model';

const debug: any = require('debug')('riot-service:ItemService');

const kayn = Kayn(process.env.RIOT_API_KEY)();

export class ItemService {
  static async patchItems() {
    const itemJSON = await kayn.DDragon.Item.list();
    const basicItem: Item = itemJSON.basic;
    const items: Item[] = itemJSON.data;
  }
}
