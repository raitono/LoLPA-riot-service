import { Model } from 'objection';
import { Tag } from './tag.model';

export class Champion extends Model {
  id: number;
  name: string;
  title: string;
  blurb: string;
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
  imageFull: string;
  imageSprite: string;
  imageGroup: string;
  imageX: number;
  imageY: number;
  imageW: number;
  imageH: number;
  partype: string;
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
  tags: Tag[];

  static get tableName() {
    return 'champions';
  }
  static get idColumn() {
    return 'id';
  }
  static relationMappings = {
    tags: {
      relation: Model.ManyToManyRelation,
      modelClass: Tag,
      join: {
        from: 'champions.id',
        through: {
          from: 'championTags.championId',
          to: 'championTags.tagId',
        },
        to: 'tags.id',
      },
    },
  };
}
