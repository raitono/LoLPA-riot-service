import { Model } from 'objection';

export class ItemStat extends Model {
  id: number;
  itemId: string;

  static get tableName() {
    return 'itemStats';
  }
  static get idColumn() {
    return 'id';
  }
}
