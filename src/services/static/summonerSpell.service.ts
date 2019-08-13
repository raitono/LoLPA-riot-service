import { Kayn } from 'kayn';
import { SummonerSpell } from '../../models/summonerSpell.model';
import { Mode } from '../../models/mode.model';

const debug: any = require('debug')('riot-service:SummonerSpellService');

const kayn = Kayn(process.env.RIOT_API_KEY)();

export class SummonerSpellService {
  static async patchSpells() {
    const apiSpells = await kayn.DDragon.SummonerSpell.list();
    const apiModes: Set<string> = new Set();

    // Grab all the tags from the API
    // Use a Set to prevent duplicates
    Object.keys(apiSpells.data).forEach((spellId) => {
      const apiSpell = apiSpells.data[spellId];
      apiSpell.modes.forEach((mode) => {
        apiModes.add(mode);
      });
    });

    await Mode.upsertGraphFromList(apiModes);
    const spells = await SummonerSpell.fromAPI(apiSpells);

    await SummonerSpell.query().upsertGraph(
      spells,
      { relate: true, insertMissing: true },
    );
  }
}
