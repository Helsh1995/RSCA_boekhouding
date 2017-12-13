import {Component, Input, OnInit} from '@angular/core';
import {BusCost} from "../../domains/bus-cost.domain";
import {CompetitorsService} from "../../services/competitor.service";
import {ValidationError} from "class-validator";


@Component({
  selector: 'add-bus-cost',
  templateUrl: 'add-bus-cost.html'
})
export class AddBusCostComponent implements OnInit {

  @Input() busCost: BusCost;
  @Input() errors: ValidationError[] = [];

  public listOfCompetitors: string[];

  constructor(private competitorsService: CompetitorsService) {
    this.listOfCompetitors = [];


  }

  public ngOnInit(): void {
    this.competitorsService.getCompetitorsForAnderlecht((competitors: string[]) => {
      this.listOfCompetitors = competitors;

      if (this.listOfCompetitors.length && !this.busCost.competitor.length) {
        this.busCost.competitor = this.listOfCompetitors[0];
      }

    });
  }

  public getErrorMessage(property): string {
    if (this.errors) {

      let findError = this.errors.find(error => error.property == property);

      if (findError && findError.constraints) {
        return findError.constraints[Object.keys(findError.constraints)[0]];
      }
    }

    return null;
  }

}
