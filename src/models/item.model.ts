import { Model } from 'objection';
import { Tag } from './tag.model';
import { Map } from './map.model';
import { ItemStat } from './itemStat.model';

export class Item extends Model {
  id: string;
  name: string;
  isRune: boolean;
  runeTier: number;
  runeType: string;
  goldBase: number;
  goldTotal: number;
  goldSell: number;
  purchasable: boolean;
  group: string;
  description: string;
  colloq: string;
  plaintext: string;
  consumed: boolean;
  stacks: number;
  depth: number;
  consumeOnFull: boolean;
  specialRecipe: number;
  inStore: boolean;
  hideFromAll: boolean;
  requiredChampion: string;
  requiredAlly: string;
  imageFull: string;
  imageSprite: string;
  imageGroup: string;
  imageX: number;
  imageY: number;
  imageW: number;
  imageH: number;
  tags: Tag[];
  maps: Map[];
  stats: ItemStat[];
  from: Item[];
  into: Item[];

  static get tableName() {
    return 'items';
  }
  static get idColumn() {
    return 'id';
  }
  static relationMappings = {
    tags: {
      relation: Model.ManyToManyRelation,
      modelClass: Tag,
      join: {
        from: 'items.id',
        through: {
          from: 'itemTags.itemId',
          to: 'itemTags.tagId',
        },
        to: 'tags.id',
      },
    },
    maps: {
      relation: Model.ManyToManyRelation,
      modelClass: Map,
      join: {
        from: 'items.id',
        through: {
          from: 'mapItems.itemId',
          to: 'mapItems.mapId',
        },
        to: 'maps.id',
      },
    },
    stats: {
      relation: Model.HasManyRelation,
      modelClass: ItemStat,
      join: {
        from: 'items.id',
        to: 'itemStats.itemId',
      },
    },
    from: {
      relation: Model.ManyToManyRelation,
      modelClass: Item,
      join: {
        from: 'items.id',
        through: {
          from: 'itemBuildPaths.intoId',
          to: 'itemBuildPaths.fromId',
        },
        to: 'items.id',
      },
    },
    into: {
      relation: Model.ManyToManyRelation,
      modelClass: Item,
      join: {
        from: 'items.id',
        through: {
          from: 'itemBuildPaths.fromId',
          to: 'itemBuildPaths.intoId',
        },
        to: 'items.id',
      },
    },
  };
  static async fromAPI(items: Object) {
    const id = '1001';
    const data: Object = items[id];

    const item = new Item();
    const tags = await Tag.query();

    item.id = id;
    item.name = data.name || '';
    item.isRune = data.rune ? data.rune.isRune || false : false;
    item.runeTier = data.rune ? data.rune.tier || 1 : 1;
    item.runeType = data.rune ? data.rune.type || 'red' : 'red';
    item.goldBase = data.gold ? data.gold.base || 0 : 0;
    item.goldTotal = data.gold ? data.gold.total || 0 : 0;
    item.goldSell = data.gold ? data.gold.sell || 0 : 0;
    item.purchasable = data.gold ? data.gold.purchasable || false : false;
    item.group = data.group || '';
    item.description = data.description || '';
    item.colloq = data.colloq || ';';
    item.plaintext = data.plaintext || '';
    item.consumed = data.consumed || false;
    item.stacks = data.stacks || 1;
    item.depth = data.depth || 1;
    item.consumeOnFull = data.consumeOnFull || false;
    item.specialRecipe = data.specialRecipe || 0;
    item.inStore = data.inStore || true;
    item.hideFromAll = data.hideFromAll || false;
    item.requiredChampion = data.requiredChampion || '';
    item.requiredAlly = data.requiredAlly || '';
    item.imageFull = data.image ? data.image.full || '' : '';
    item.imageSprite = data.image ? data.image.sprite || '' : '';
    item.imageGroup = data.image ? data.image.group || '' : '';
    item.imageX = data.image ? data.image.x || 0 : 0;
    item.imageY = data.image ? data.image.y || 0 : 0;
    item.imageW = data.image ? data.image.w || 0 : 0;
    item.imageH = data.image ? data.image.h || 0 : 0;
    item.tags = tags.filter(t => data.tags.includes(t.name));
    item.maps = Object.keys(data.maps).map((m) => {
      if (!data.maps[m]) return; // If map id is false, don't return anything.

      const map = new Map();
      map.id = m;
      return map;
    }).filter(Boolean); // Fancy trick to remove falsy values.
    item.stats = Object.keys(data.stats).map((s) => {
      const stat = new ItemStat();

      stat.itemId = item.id;
      stat.group = s;
      stat.value = data.stats[s];

      return stat;
    });
    return item;
    // return Object.keys(items).map((id) => {

    // });
  }
}
