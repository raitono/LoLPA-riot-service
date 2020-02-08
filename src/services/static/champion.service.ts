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
    const c = (await this.getChampions()).data;
    const apiTags: Set<string> = new Set();

    // Grab all the tags from the API
    // Use a Set to prevent duplicates
    Object.keys(c).forEach((championId) => {
      const apiChampion = c[championId];
      apiChampion.tags.forEach((tag) => {
        apiTags.add(tag);
      });
    });

    await Tag.upsertGraphFromList(apiTags);

    const champions = await Champion.fromAPI(c);

    await Champion.query().upsertGraph(
      champions,
      { relate: true, insertMissing: true },
    );
  }
}
