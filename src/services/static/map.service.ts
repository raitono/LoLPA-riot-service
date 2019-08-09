import { Kayn } from 'kayn';
import { Map } from '../../models/map.model';

const debug: any = require('debug')('riot-service:MapService');

const kayn = Kayn(process.env.RIOT_API_KEY)();

export class MapService {
  static async patchMaps() {
    const apiMaps = await kayn.DDragon.Map.list();

    const maps = await Map.fromAPI(apiMaps);
    await Map.query().upsertGraph(
      maps,
      { insertMissing: true },
    );
  }
}
