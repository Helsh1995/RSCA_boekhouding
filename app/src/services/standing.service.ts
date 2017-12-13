/**
 * Created by shawnhellinckx on 23/08/2017.
 */

import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {API_ENDPOINTS} from "../config/api_endpoints";
import {ERRORS} from "../config/common_errors";
import {Standing} from "../domains/standing.domain";

@Injectable()
export class StandingService {

  private _standing: Standing;

  constructor(private apiService: ApiService) {

  }

  public getStanding(callback): void {

    this.apiService.makeApiCall(API_ENDPOINTS.getStanding, {
      method: "GET"
    }).then((response) => {
      this._standing = new Standing(response)
      callback(null, this._standing);
    }).catch(() => {
      callback(ERRORS.GENERAL);
    });

  }

}
