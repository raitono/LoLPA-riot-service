import { Kayn, KaynClass } from 'kayn';

const debug: any = require('debug')('summoner-service:SummonerV4Service');

const kayn = Kayn(process.env.RIOT_API_KEY)();

export class SummonerV4Service {
  static async getByName(name:string) {
    return kayn.Summoner.by.name(name);
  }
}
