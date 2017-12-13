import {Component, Input} from '@angular/core';
import {OtherCost} from "../../domains/other-cost.domain";
import {ValidationError} from "class-validator";

@Component({
  selector: 'add-other-cost',
  templateUrl: 'add-other-cost.html'
})
export class AddOtherCostComponent {

  @Input() otherCost: OtherCost;
  @Input() errors: ValidationError[];

  constructor() {
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
