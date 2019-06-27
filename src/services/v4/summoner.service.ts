import { Kayn } from 'kayn';

const debug: any = require('debug')('riot-service:SummonerV4Service');

import { Summoner } from '../../models/summoner.model';

const kayn = Kayn(process.env.RIOT_API_KEY)();

export class SummonerV4Service {
  cache:{[key: string]: Summoner};
  timeout: number;

  constructor() {
    this.cache = {};
    this.timeout = Number.parseInt(process.env.REFRESH_COOLDOWN, 10) * 60 * 1000;
  }

  async getByName(name:string): Promise<Summoner> {
    if (!this.cache[name]) {
      const db = (await Summoner.query().where({ name }))[0];
      if (db) {
        this.cache[name] = db;
      }
    }

    this.timeoutCache();

    if (!this.cache[name]) {
      const api = await kayn.Summoner.by.name(name);
      this.cache[name] = new Summoner();
      this.cache[name].puuid = api.puuid;
      this.cache[name].profileIconId = api.profileIconId;
      this.cache[name].summonerLevel = api.summonerLevel;
      this.cache[name].name = api.name;
      this.cache[name].lastUpdated = new Date();

      await Summoner.query().upsertGraph({
        puuid: api.puuid,
        id: api.id,
        accountId: api.accountId,
        name: api.name,
        summonerLevel: api.summonerLevel,
        profileIconId: api.profileIconId,
        revisionDate: new Date(api.revisionDate),
        lastUpdated: new Date(),
      });
    }

    return this.cache[name];
  }

  async getByAccountId(accountId:string) {
    this.timeoutCache();
    return null;
  }

  timeoutCache() {
    Object.keys(this.cache).forEach((key) => {
      if (this.cache[key].lastUpdated &&
          this.cache[key].lastUpdated.getTime() + this.timeout < new Date().getTime()) {
        delete this.cache[key];
      }
    });
  }
}
