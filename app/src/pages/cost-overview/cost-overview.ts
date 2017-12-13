import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {NAVIGATIONKEYS} from "../../config/navigation_keys";
import {CostOverviewService} from "../../services/costs/cost-overview.service";
import {BusCost} from "../../domains/bus-cost.domain";
import {OtherCost} from "../../domains/other-cost.domain";
import {Cost} from "../../domains/cost-domain";

@IonicPage()
@Component({
  selector: 'page-cost-overview',
  templateUrl: 'cost-overview.html',
})
export class CostOverviewPage {

  public costs: Cost[];
  public totalResult: number;

  constructor(private navCtrl: NavController,
              private costService: CostOverviewService,
              private costOverviewService: CostOverviewService) {
    this.costs = [];
  }

  public goBack(): void {
    this.navCtrl.pop();
  }

  public addNewCost(): void {
    this.navCtrl.push(NAVIGATIONKEYS.addNewCost);
  }

  public removeCost(cost: Cost): void {
    this.costOverviewService.removeCost(cost, this._callbackGetCosts);
  }

  public editCost(cost: Cost): void {
    this.navCtrl.push(NAVIGATIONKEYS.addNewCost, {cost: cost});
  }

  public ionViewWillEnter(): void {
    this.costOverviewService.getCostOverview(this._callbackGetCosts);
  }


  private _callbackGetCosts = (err, costs) => {
    if (err) {
      return;
    }

    this.costs = costs;

    this.totalResult = 0;

    this.costs.forEach(cost => {
      this.totalResult += cost.getProfit();
    });

  };
}
