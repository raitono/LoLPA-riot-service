import { Model } from 'objection';

export class Tag extends Model {
  id: number;
  name: string;

  static get tableName() {
    return 'tags';
  }
  static get idColumn() {
    return 'id';
  }
}
