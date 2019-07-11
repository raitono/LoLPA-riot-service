import { Model } from 'objection';

export class ItemBuildPath extends Model {
  fromId: string;
  intoId: string;

  static get tableName() {
    return 'itemBuildPaths';
  }
  static get idColumn() {
    return ['fromId', 'intoId'];
  }
}
