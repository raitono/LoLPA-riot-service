import { Kayn } from 'kayn';
import { Item } from '../../models/item.model';
import { Tag } from '../../models/tag.model';

const debug: any = require('debug')('riot-service:ItemService');

const kayn = Kayn(process.env.RIOT_API_KEY)();

export class ItemService {
  static async patchItems() {
    const apiTags: Set<string> = new Set();
    const itemJSON: Object = await kayn.DDragon.Item.list();
    const basicItem: Object = itemJSON.basic;
    const items: Object = itemJSON.data;
    const boot: Object = items['1001'];

    // Grab all the tags from the API
    // Use a Set to prevent duplicates
    Object.keys(items).forEach((itemId) => {
      const apiItem = items[itemId];
      apiItem.tags.forEach((tag: string) => {
        apiTags.add(tag);
      });
    });

    await Tag.upsertGraphFromList(apiTags);

    const myBoot: Item = new Item('1001', boot);
    debug(boot);
    debug(myBoot);
  }
}
