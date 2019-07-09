import { Model } from 'objection';

export class ItemStat extends Model {
  itemId: string;
  group: string;
  value: number;

  static get tableName() {
    return 'itemStats';
  }
  static get idColumn() {
    return ['itemId', 'group'];
  }
}
