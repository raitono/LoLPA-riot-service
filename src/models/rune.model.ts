import { Model } from 'objection';
import { RuneStyle } from './runeStyle.model';
import { DDragonRunesReforgedDTO } from 'kayn/typings/dtos';

const debug: any = require('debug')('riot-service:RuneModel');

export class Rune extends Model {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  row: number;
  col: number;
  styleId: number;
  style: RuneStyle;

  static get tableName() {
    return 'runes';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      style: {
        relation: Model.BelongsToOneRelation,
        modelClass: RuneStyle,
        join: {
          from: 'runes.styleId',
          to: 'runeStyles.id',
        },
      },
    };
  }
  static async fromAPI(dDragonRunes: DDragonRunesReforgedDTO[]) {
    const runes: Rune[] = [];

    dDragonRunes.map((apiRuneStyle) => {
      const runeStyle: RuneStyle = new RuneStyle();
      let row = 0;
      let col = 0;
      runeStyle.id = apiRuneStyle.id;
      runeStyle.key = apiRuneStyle.key;
      runeStyle.icon = apiRuneStyle.icon;
      runeStyle.name = apiRuneStyle.name;

      apiRuneStyle.slots.map((apiRuneSlot) => {
        apiRuneSlot.runes.map((apiRune) => {
          const rune = new Rune();
          rune.id = apiRune.id;
          rune.key = apiRune.key;
          rune.icon = apiRune.icon;
          rune.name = apiRune.name;
          rune.shortDesc = apiRune.shortDesc;
          rune.longDesc = apiRune.longDesc;
          rune.row = row;
          rune.col = col;
          rune.styleId = runeStyle.id;
          rune.style = runeStyle;

          runes.push(rune);
          col = col + 1;
        });
        row = row + 1;
      });
    });
    return runes;
  }
}
