import { Model } from 'objection';

export class Map extends Model {
  id: string;

  static get tableName() {
    return 'maps';
  }
  static get idColumn() {
    return 'id';
  }
}
