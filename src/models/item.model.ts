import { Model } from 'objection';
import { Tag } from './tag.model';
import { Map } from './map.model';
import { ItemStat } from './itemStat.model';
import { DDragonItemWrapperDTO } from 'kayn/typings/dtos';

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
  from: string[];
  into: string[];
  tags: Tag[];
  maps: Map[];
  stats: ItemStat[];

  static get tableName() {
    return 'items';
  }
  static get idColumn() {
    return 'id';
  }
  static get jsonAttributes() {
    return ['from', 'into'];
  }
  static get relationMappings() {
    return {
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
    };
  }
  static async fromAPI(apiItems: DDragonItemWrapperDTO) {
    const tags = await Tag.query();
    const items = apiItems.data;
    return Promise.all(Object.keys(items).map(async (id) => {
      const item = new Item();
      const stats = await ItemStat.query().where('itemId', id);
      const data = items[id];
      const dataStatGroups = Object.keys(data.stats);

      item.id = id;
      item.name = data.name || '';
      item.isRune = data.rune ? data.rune.isrune || false : false;
      item.runeTier = data.rune ? data.rune.tier || 1 : null;
      item.runeType = data.rune ? data.rune.type || 'red' : null;
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
      item.into = data.into;
      item.from = data.from;
      item.tags = tags.filter(t => data.tags.includes(t.name));

      item.maps = Object.keys(data.maps).map((m) => {
        if (!data.maps[m]) return; // If map id is false, don't return anything.

        const map = new Map();
        map.id = m;
        return map;
      }).filter(Boolean); // Fancy trick to remove falsy values.

      item.stats = stats.filter(s =>
        // Find all the ones that didn't change
        dataStatGroups.includes(s.group) && data.stats[s.group] === s.value)
        // Add all the ones that have changed
        .concat(dataStatGroups.filter(d => stats.find(s => s.group === d))
          .map((group: string) => {
            const stat = new ItemStat();
            stat.itemId = id;
            stat.group = group;
            stat.value = data.stats[group];
            return stat;
          }))
          // Add all of the new ones
          .concat(dataStatGroups.filter(d => !stats.find(s => s.group === d))
            .map((group: string) => {
              const stat = new ItemStat();
              stat.itemId = id;
              stat.group = group;
              stat.value = data.stats[group];
              return stat;
            }));
      return item;
    }));
  }
}
