import { Model } from 'objection';

export class Summoner extends Model {
  puuid: string;
  profileIconId: number;
  summonerLevel: number;
  name: string;
  lastUpdated: Date;

  static get tableName() {
    return 'summoners';
  }
  static get idColumn() {
    return 'puuid';
  }
}
