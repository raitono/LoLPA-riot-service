import { Model } from 'objection';
import { Tag } from './tag.model';
import { DDragonChampionListDataDTO } from 'kayn/typings/dtos';

export class Champion extends Model {
  id: string;
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
  static get relationMappings() {
    return {
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
  static async fromAPI(champs:{[key:string]: DDragonChampionListDataDTO}) {
    const tags = await Tag.query();
    return Promise.all(Object.keys(champs).map(async (id) => {
      const apiChampion = champs[id];
      const dbChampion = new Champion();

      dbChampion.id = apiChampion.id;
      dbChampion.name = apiChampion.name;
      dbChampion.title = apiChampion.title;
      dbChampion.blurb = apiChampion.blurb;
      dbChampion.attack = apiChampion.info.attack;
      dbChampion.defense = apiChampion.info.defense;
      dbChampion.magic = apiChampion.info.magic;
      dbChampion.difficulty = apiChampion.info.difficulty;
      dbChampion.imageFull = apiChampion.image.full;
      dbChampion.imageSprite = apiChampion.image.sprite;
      dbChampion.imageGroup = apiChampion.image.group;
      dbChampion.imageX = apiChampion.image.x;
      dbChampion.imageY = apiChampion.image.y;
      dbChampion.imageW = apiChampion.image.w;
      dbChampion.imageH = apiChampion.image.h;
      dbChampion.partype = apiChampion.partype;
      dbChampion.hp = apiChampion.stats.hp;
      dbChampion.hpperlevel = apiChampion.stats.hpperlevel;
      dbChampion.mp = apiChampion.stats.mp;
      dbChampion.mpperlevel = apiChampion.stats.mpperlevel;
      dbChampion.movespeed = apiChampion.stats.movespeed;
      dbChampion.armor = apiChampion.stats.armor;
      dbChampion.armorperlevel = apiChampion.stats.armorperlevel;
      dbChampion.spellblock = apiChampion.stats.spellblock;
      dbChampion.spellblockperlevel = apiChampion.stats.spellblockperlevel;
      dbChampion.attackrange = apiChampion.stats.attackrange;
      dbChampion.hpregen = apiChampion.stats.hpregen;
      dbChampion.hpregenperlevel = apiChampion.stats.hpregenperlevel;
      dbChampion.mpregen = apiChampion.stats.mpregen;
      dbChampion.mpregenperlevel = apiChampion.stats.mpregenperlevel;
      dbChampion.crit = apiChampion.stats.crit;
      dbChampion.critperlevel = apiChampion.stats.critperlevel;
      dbChampion.attackdamage = apiChampion.stats.attackdamage;
      dbChampion.attackdamageperlevel = apiChampion.stats.attackdamageperlevel;
      dbChampion.attackspeedperlevel = apiChampion.stats.attackspeedperlevel;
      dbChampion.attackspeed = apiChampion.stats.attackspeed;
      dbChampion.tags = tags.filter(t => apiChampion.tags.includes(t.name));

      return dbChampion;
    }));
  }
}
