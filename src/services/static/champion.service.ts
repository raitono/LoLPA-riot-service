import { Kayn } from 'kayn';
import { Champion } from '../../models/champion.model';
import { Tag } from '../../models/tag.model';

const debug: any = require('debug')('riot-service:ChampionService');

const kayn = Kayn(process.env.RIOT_API_KEY)();

export class ChampionService {
  static async getChampions() {
    return await kayn.DDragon.Champion.listDataByIdWithParentAsId();
  }
  static async patchChampions() {
    const c: {[key:string]: Object} = (await this.getChampions()).data;
    let dbTags: Tag[] = await Tag.query();
    const apiTags: Set<string> = new Set();
    const tags: Tag[] = [];
    const champions: Champion[] = [];

    // Grab all the tags from the API
    // Use a Set to prevent duplicates
    Object.keys(c).forEach((championId) => {
      const apiChampion = c[championId];
      apiChampion.tags.forEach((tag: string) => {
        apiTags.add(tag);
      });
    });

    // Collect all tags we already have, plus any we don't to get a complete list
    // First, find the union
    tags.push(...dbTags.filter(db => apiTags.has(db.name))
    // Then add the difference,
    .concat([...apiTags]
      // by finding any in the API not in the DB
      .filter(tag => !dbTags.find(t => t.name === tag))
        // Finally, convert the string only API names into a Tag object
        .map((name: string) => {
          const tag = new Tag();
          tag.id = null;
          tag.name = name;
          return tag;
        })));

    // Upsert the tags so we are ready for the Champion upsert
    await Tag.query().upsertGraph(tags);

    // Refresh our DB tags to get any new ones
    dbTags = await Tag.query();

    Object.keys(c).forEach((championId) => {
      const apiChampion = c[championId];
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
      dbChampion.tags = dbTags.filter(t => apiChampion.tags.includes(t.name));

      champions.push(dbChampion);
    });

    await Champion.query().upsertGraph(
      champions,
      { relate: true, unrelate: true },
    );
  }
}
