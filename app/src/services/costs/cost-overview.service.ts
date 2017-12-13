/**
 * Created by shawnhellinckx on 28/08/2017.
 */

import {Injectable} from "@angular/core";
import {ApiService} from "../api.service";
import {API_ENDPOINTS} from "../../config/api_endpoints";
import {OtherCost} from "../../domains/other-cost.domain";
import {BusCost} from "../../domains/bus-cost.domain";
import {sprintf} from 'sprintf-js';
import {Cost} from "../../domains/cost-domain";
import {RequestMethod} from "@angular/http";

@Injectable()
export class CostOverviewService {

  constructor(private apiService: ApiService) {

  }

  public getCostOverview(callback): void {

    this.apiService.makeApiCall(API_ENDPOINTS.getCostOverview)
      .then((costs) => {

        callback(null, this._formatCosts(costs));

      })
      .catch((error) => {
        callback(error);
      });

  }

  public removeCost(cost: Cost, callback): void {

    this.apiService.makeApiCall(sprintf(API_ENDPOINTS.deleteCost, cost.id), {
      method: RequestMethod.Delete
    })
      .then((costs) => {
        callback(null, this._formatCosts(costs));
      })
      .catch((error) => {
        callback(error);
      });

  }


  private _formatCosts(costs): Cost[] {
    let allCosts: Cost[] = [];

    costs.forEach((cost) => {

      if (this._isOtherCost(cost)) {
        allCosts.push(new OtherCost(cost));
      }

      if (this._isBusCost(cost)) {
        allCosts.push(new BusCost(cost));
      }
    });

    return allCosts;
  }

  private _isOtherCost(cost): boolean {
    return cost.hasOwnProperty('amount') && cost.hasOwnProperty('reason');
  }

  private _isBusCost(cost): boolean {
    return cost.hasOwnProperty('competitor') && cost.hasOwnProperty('amountOfMembers');
  }

}
