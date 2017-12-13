import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {API_ENDPOINTS} from "../config/api_endpoints";
import {ERRORS} from "../config/common_errors";
import {Calendar} from "../domains/calendar.domain";
import {Response} from "@angular/http";


@Injectable()
export class CalendarService {

  private _calendar: Calendar;

  constructor(private apiService: ApiService) {
  }

  public getCalendar(callback): void {
    this.apiService.makeApiCall(API_ENDPOINTS.getCalendar, {
      method: "GET"
    }).then((response: Response) => {

      if (!response) {
        return callback(ERRORS.GENERAL);
      }

      this._calendar = new Calendar(response);
      callback(null, this._calendar);

    }).catch((error) => {
      callback(ERRORS.GENERAL);
    });
  }

}
