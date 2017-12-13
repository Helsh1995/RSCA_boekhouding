import {Component, OnInit} from '@angular/core';
import {StandingService} from "../../services/standing.service";
import {Standing} from "../../domains/standing.domain";
import {Competitor} from "../../domains/competitor.domain";
import {CONFIG} from "../../config/config";

@Component({
  selector: 'stand',
  templateUrl: 'stand.html'
})
export class StandComponent implements OnInit {

  public standing: Standing;

  constructor(private standingService: StandingService) {
  }

  public ngOnInit(): void {

    this.standingService.getStanding((err, standing: Standing) => {
      this.standing = standing;
    });

  }

  public isAnderlecht(name: string): boolean {
    return name.toLowerCase().indexOf('anderlecht') > -1;
  }

}
