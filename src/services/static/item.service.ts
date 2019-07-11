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
    const apiItems: Object = itemJSON.data;

    // Grab all the tags from the API
    // Use a Set to prevent duplicates
    Object.keys(apiItems).forEach((itemId) => {
      const apiItem = apiItems[itemId];
      apiItem.tags.forEach((tag: string) => {
        apiTags.add(tag);
      });
    });

    await Tag.upsertGraphFromList(apiTags);

    const items = await Item.fromAPI(apiItems);
    // debug(apiItems['1001']);
    debug(items.filter(i => i.id === '1001'));

    try {
      const t = Item.query().upsertGraph(
        items.filter(i => i.id === '1001'),
        { relate: true, unrelate: true, insertMissing: true },
      ).debug(true);

      await t.execute();
    } catch (e) {
      debug(e);
    }
  }
}
