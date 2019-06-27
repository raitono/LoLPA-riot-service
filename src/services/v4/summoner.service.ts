import { Kayn } from 'kayn';

const debug: any = require('debug')('riot-service:SummonerV4Service');

const kayn = Kayn(process.env.RIOT_API_KEY)();

export class SummonerV4Service {
  static async getByName(name:string) {
    return kayn.Summoner.by.name(name);
  }
  static async getByAccountId(accountId:string) {
    return kayn.Summoner.by.accountID(accountId);
  }
}
