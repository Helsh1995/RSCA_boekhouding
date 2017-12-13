/**
 * Created by shawnhellinckx on 22/08/2017.
 */

import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Response} from "@angular/http";
import {CONFIG} from "../config/config";

@Injectable()
export class ApiService {

  constructor(private http: Http) {

  }

  public makeApiCall(url: string, options?: RequestOptionsArgs): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.http.request(CONFIG.API_URL + url, options).subscribe(
          (response: Response) => {
            let responseText = response.text();

            resolve(responseText.startsWith('[') || responseText.startsWith('{') ? response.json() : responseText);
          }, (error: any) => {
            reject(error);
          });
      } catch (err) {
        console.log(err);
      }
    });

  }


}
