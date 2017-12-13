/**
 * Created by shawnhellinckx on 28/08/2017.
 */

import {Injectable} from "@angular/core";
import {ApiService} from "../api.service";
import {OtherCost} from "../../domains/other-cost.domain";
import {API_ENDPOINTS} from "../../config/api_endpoints";
import {RequestMethod} from "@angular/http";
import {BusCost} from "../../domains/bus-cost.domain";
import {sprintf} from 'sprintf-js';


@Injectable()
export class OtherCostService {

  constructor(private apiService: ApiService) {
  }

  public postNewOtherCost(otherCost: OtherCost, callback): void {

    this.apiService.makeApiCall(API_ENDPOINTS.postOtherCost, {
      method: RequestMethod.Post,
      body: otherCost.toServerObject()
    })
      .then(() => {
        callback(null, true);
      })
      .catch((error) => {
        callback(error);
      });

  }

  public postNewBusCost(busCost: BusCost, callback): void {
    this.apiService.makeApiCall(API_ENDPOINTS.postBusCost, {
      method: RequestMethod.Post,
      body: busCost.toServerObject()
    })
      .then(() => {
        callback(null, true);
      })
      .catch((error) => {
        callback(error);
      });

  }

  public putOtherCost(otherCost: OtherCost, callback): void {
    this.apiService.makeApiCall(sprintf(API_ENDPOINTS.putOtherCost, otherCost.id), {
      method: RequestMethod.Put,
      body: otherCost.toServerObject()
    })
      .then(() => {
        callback(null, true);
      })
      .catch((error) => {
        callback(error);
      });
  }

  public putBusCost(busCost: BusCost, callback): void {
    this.apiService.makeApiCall(sprintf(API_ENDPOINTS.putBusCost, busCost.id), {
      method: RequestMethod.Put,
      body: busCost.toServerObject()
    })
      .then(() => {
        callback(null, true);
      })
      .catch((error) => {
        callback(error);
      });
  }

}
