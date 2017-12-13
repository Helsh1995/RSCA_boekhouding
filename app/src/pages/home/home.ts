import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {CalendarService} from "../../services/calendar.service";
import {NAVIGATIONKEYS} from "../../config/navigation_keys";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private navCtrl: NavController) {
  }

  public goToOverviewCost(): void {

    this.navCtrl.push(NAVIGATIONKEYS.costOverview);

  }
}
