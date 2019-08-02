import { Model } from 'objection';

export class Rune extends Model {
  id: string;

  static get tableName() {
    return 'runes';
  }
  static get idColumn() {
    return 'id';
  }
  // static get relationMappings() {
  //   return {
  //     items: {
  //       relation: Model.ManyToManyRelation,
  //       modelClass: Item,
  //       join: {
  //         from: 'maps.id',
  //         through: {
  //           from: 'mapItems.mapId',
  //           to: 'mapItems.itemId',
  //         },
  //         to: 'items.id',
  //       },
  //     },
  //   };
  // }
  static async fromAPI(maps: Object) {
    return null;
  }
}
