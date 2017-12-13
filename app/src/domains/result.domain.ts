/**
 * Created by shawnhellinckx on 23/08/2017.
 */

export class MatchResult {

  home: number;
  away: number;
  matchEnded: boolean;

  constructor(data) {
    if (data) {
      this.home = data.home;
      this.away = data.away;
      this.matchEnded = data.ended;
    }
  }

}
