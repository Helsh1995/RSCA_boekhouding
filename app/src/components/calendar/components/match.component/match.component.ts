/**
 * Created by shawnhellinckx on 22/08/2017.
 */

import {Component, Input} from '@angular/core';
import {Match} from "../../../../domains/match.domain";
import {Competitor} from "../../../../domains/competitor.domain";
import {CONFIG} from "../../../../config/config";

@Component({
  selector: 'match',
  templateUrl: 'match.component.html'
})
export class MatchComponent {

  @Input() match: Match;

  constructor() {
  }

  public getDateInCorrectFormat(): string {
    return this.match.time.format('HH:mm');
  }

  public isAnderlecht(competitor: Competitor): boolean {
    return competitor.id == CONFIG.ANDERLECHT_ID;
  }

}
