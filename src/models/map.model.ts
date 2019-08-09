import { Model } from 'objection';
import { Item } from '../models/item.model';
import { DDragonMapDTO } from 'kayn/typings/dtos';

export class Map extends Model {
  id: string;
  name: string;
  imageFull: string;
  imageSprite: string;
  imageGroup: string;
  imageX: number;
  imageY: number;
  imageW: number;
  imageH: number;
  items: Item[];

  static get tableName() {
    return 'maps';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      items: {
        relation: Model.ManyToManyRelation,
        modelClass: Item,
        join: {
          from: 'maps.id',
          through: {
            from: 'mapItems.mapId',
            to: 'mapItems.itemId',
          },
          to: 'items.id',
        },
      },
    };
  }
  static async fromAPI(apiMaps: DDragonMapDTO) {
    const maps = apiMaps.data;
    return Promise.all(Object.keys(maps).map((id) => {
      const map = new Map();
      map.id = id;
      map.name = maps[id].MapName;
      map.imageFull = maps[id].image.full;
      map.imageSprite = maps[id].image.sprite;
      map.imageGroup = maps[id].image.group;
      map.imageX = maps[id].image.x;
      map.imageY = maps[id].image.y;
      map.imageW = maps[id].image.w;
      map.imageH = maps[id].image.h;
      return map;
    }));
  }
}
