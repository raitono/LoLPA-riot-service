import { Model } from 'objection';
import { Rune } from './rune.model';

export class RuneStyle extends Model {
  '#id'?: number;
  '#ref'?: number;
  '#dbRef'?: number;
  id: number;
  key: string;
  icon: string;
  name: string;
  runes: Rune[];

  static get tableName() {
    return 'runeStyles';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      runes: {
        relation: Model.HasManyRelation,
        modelClass: Rune,
        join: {
          from: 'runeStyles.id',
          to: 'runes.styleId',
        },
      },
    };
  }
}
