import { Kayn } from 'kayn';
import { Rune } from '../../models/rune.model';
import { RuneStyle } from '../../models/runeStyle.model';

const debug: any = require('debug')('riot-service:RuneService');

const kayn = Kayn(process.env.RIOT_API_KEY)({ debugOptions: { isEnabled: true } });

export class RuneService {
  static async patchRunes() {
    const apiRuneJSON = await kayn.DDragon.RunesReforged.list()
      .version((await kayn.DDragon.Version.list())[0]);
    const runes = await Rune.fromAPI(apiRuneJSON);
    const dbRuneStyles = (await RuneStyle.query().select('runeStyles.id')).map(s => s.id);

    // Set up references used in upsert
    // Prevents duplicate keys on creation
    runes.map((r) => {
      const j = JSON.stringify(r.style);

      // If it's already in the database, we only need the id
      if (dbRuneStyles.includes(r.styleId)) {
        r.style = new RuneStyle();
        r.style['#dbRef'] = r.styleId;
      }
      else {
        // Only on the first rune of each style
        if (r.row === 0 && r.col === 0) {
          r.style['#id'] = r.styleId;
        }
        else {
          r.style = new RuneStyle();
          r.style['#ref'] = r.styleId;
        }
      }
    });

    await Rune.query().upsertGraph(
      runes,
      { insertMissing: true },
    );
  }
}
