import { Kayn } from 'kayn';
import { Rune } from '../../models/rune.model';
import * as http from 'http';

const debug: any = require('debug')('riot-service:RuneService');

const kayn = Kayn(process.env.RIOT_API_KEY)({ debugOptions: { isEnabled: true } });

export class RuneService {
  static async patchRunes() {
    const runeJSON: Object = await kayn.DDragon.RunesReforged.list();
    //debug(runeJSON);
    // await http.get('http://ddragon.leagueoflegends.com/realms/na.json', (res) => {
    //   let data = '';

    //   // A chunk of data has been recieved.
    //   res.on('data', (chunk) => {
    //     data += chunk;
    //   });

    //   // The whole response has been received. Print out the result.
    //   res.on('end', () => {
    //     const jdata = JSON.parse(data);
    //     const { n: versions } = jdata;
    //     debug(versions);
    //   });
    // });
    // const apiRunes: Object = runeJSON.data;

    // const runes = await Rune.fromAPI(apiRunes);
    // await Rune.query().upsertGraph(
    //   runes,
    //   { insertMissing: true },
    // );
  }
}
