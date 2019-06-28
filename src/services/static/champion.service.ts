import { Kayn } from 'kayn';
import { Champion } from '../../models/champion.model';

const debug: any = require('debug')('riot-service:ChampionService');

const kayn = Kayn(process.env.RIOT_API_KEY)();

export class ChampionService {
  static async getChampions() {
    return await kayn.DDragon.Champion.listDataByIdWithParentAsId();
  }
  static async patchChampions() {
    const c: {[key:string]: Object} = (await this.getChampions()).data;
    const champions: Champion[] = [];

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

      champions.push(dbChampion);
    });

    await Promise.all(champions.map(async (champion) => {
      debug(`Pushing ${champion.name}`);
      await Champion.query().upsertGraph(champion, { insertMissing: true, noDelete: true });
    }));
    return 'Champions patched';
  }
}
