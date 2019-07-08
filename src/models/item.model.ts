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
}
