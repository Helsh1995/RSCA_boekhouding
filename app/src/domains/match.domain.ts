import * as moment from 'moment';
import {Competitor} from "./competitor.domain";
import {CONFIG} from "../config/config";
import {MatchResult} from "./result.domain";

export class Match {

  id: string;
  time: moment.Moment;
  season: string;
  competitors: Competitor[];
  result: MatchResult;

  constructor(data) {
    this.id = data.id;
    this.time = moment(data.time);
    this.season = data.season;
    this.competitors = data.competitors.map(competitor => new Competitor(competitor));
    this.result = new MatchResult(data.result);
  }

  public getTimeInCorrectFormat(): string {
    return this.time.format(CONFIG.DATE_FORMAT);
  }

  public isAnderlechtMatch(): boolean {
    return this.competitors.find(competitor => competitor.id == CONFIG.ANDERLECHT_ID) != null;
  }

}
