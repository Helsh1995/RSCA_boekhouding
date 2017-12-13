import { Component } from '@angular/core';

/**
 * Generated class for the CostRowComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'cost-row',
  templateUrl: 'cost-row.html'
})
export class CostRowComponent {

  text: string;

  constructor() {
    console.log('Hello CostRowComponent Component');
    this.text = 'Hello World';
  }

}
