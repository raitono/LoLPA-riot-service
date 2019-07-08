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

  constructor(id: string, data: Object) {
    super();
    this.id = id;
    this.name = data.name || '';
    this.isRune = data.rune ? data.rune.isRune || false : false;
    this.runeTier = data.rune ? data.rune.tier || 1 : 1;
    this.runeType = data.rune ? data.rune.type || 'red' : 'red';
    this.goldBase = data.gold ? data.gold.base || 0 : 0;
    this.goldTotal = data.gold ? data.gold.total || 0 : 0;
    this.goldSell = data.gold ? data.gold.sell || 0 : 0;
    this.purchasable = data.gold ? data.gold.purchasable || false : false;
    this.group = data.group || '';
    this.description = data.description || '';
    this.colloq = data.colloq || ';';
    this.plaintext = data.plaintext || '';
    this.consumed = data.consumed || false;
    this.stacks = data.stacks || 1;
    this.depth = data.depth || 1;
    this.consumeOnFull = data.consumeOnFull || false;
    this.specialRecipe = data.specialRecipe || 0;
    this.inStore = data.inStore || true;
    this.hideFromAll = data.hideFromAll || false;
    this.requiredChampion = data.requiredChampion || '';
    this.requiredAlly = data.requiredAlly || '';
    this.imageFull = data.image ? data.image.full || '' : '';
    this.imageSprite = data.image ? data.image.sprite || '' : '';
    this.imageGroup = data.image ? data.image.group || '' : '';
    this.imageX = data.image ? data.image.x || 0 : 0;
    this.imageY = data.image ? data.image.y || 0 : 0;
    this.imageW = data.image ? data.image.w || 0 : 0;
    this.imageH = data.image ? data.image.h || 0 : 0;
  }

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
