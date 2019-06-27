import { Model } from 'objection';

export class Summoner extends Model {
  puuid: string;
  id: string;
  accountId: string;
  name: string;
  summonerLevel: number;
  profileIconId: number;
  revisionDate: Date;
  lastUpdated: Date;

  static get tableName() {
    return 'summoners';
  }
  static get idColumn() {
    return 'puuid';
  }
}
