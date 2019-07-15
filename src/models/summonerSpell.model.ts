import { Model } from 'objection';
import { Image } from './image.model';
import { Mode } from './mode.model';

export class SummonerSpell extends Model {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: Object;
  effect: number[][];
  effectBurn: string[];
  vars: Object[];
  key: string;
  summonerLevel: number;
  modes: Mode[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: Image;
  resource: string;

  static get tableName() {
    return 'summonerSpells';
  }
  static get idColumn() {
    return 'id';
  }
  static get jsonAttributes() {
    return ['cooldown', 'cost', 'datavalues', 'effect', 'effectBurn', 'vars', 'range'];
  }
  static get relationMappings() {
    return {
      modes: {
        relation: Model.ManyToManyRelation,
        modelClass: Mode,
        join: {
          from: 'summonerSpells.id',
          through: {
            from: 'summonerSpellModes.summonerSpellId',
            to: 'summonerSpellModes.modeId',
          },
          to: 'modes.id',
        },
      },
      image: {
        relation: Model.HasOneRelation,
        modelClass: Image,
        join: {
          from: 'summonerSpells.imageId',
          to: 'images.id',
        },
      },
    };
  }
  static async fromAPI(spells: Object) {
    const dbModes = await Mode.query();
    return Promise.all(Object.keys(spells).map(async (id) => {
      const spell = new SummonerSpell();
      const apiSpell: Object = spells[id];

      spell.id = apiSpell.id;
      spell.name = apiSpell.name;
      spell.description = apiSpell.description;
      spell.tooltip = apiSpell.tooltip;
      spell.maxrank = apiSpell.maxrank;
      spell.cooldown = apiSpell.cooldown;
      spell.cooldownBurn = apiSpell.cooldownBurn;
      spell.datavalues = apiSpell.datavalues
      spell.effect = apiSpell.effect;
      spell.effectBurn = apiSpell.effectBurn;
      spell.vars = apiSpell.vars
      spell.key = apiSpell.key;
      spell.summonerLevel = apiSpell.summonerLevel;
      spell.costType = apiSpell.costType;
      spell.maxammo = apiSpell.maxammo;
      spell.range = apiSpell.range;
      spell.rangeBurn = apiSpell.rangeBurn;
      spell.resource = apiSpell.resource;

      spell.modes = dbModes.filter(m => apiSpell.modes.includes(m.name))
        .concat(apiSpell.modes.filter((m: string) => !dbModes.find(dm => dm.name === m))
          .map((m: string) => {
            const mode = new Mode();
            mode.name = m;
            return mode;
          }));

      spell.image = await Image.fromAPI(apiSpell.image);

      return spell;
    }));
  }
}
