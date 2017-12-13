import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {ApiService} from "../services/api.service";
import {CalendarService} from "../services/calendar.service";
import {StandingService} from "../services/standing.service";
import {CompetitorsService} from "../services/competitor.service";
import {CostOverviewService} from "../services/costs/cost-overview.service";
import {OtherCostService} from "../services/costs/other-cost.service";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    ApiService,
    CalendarService,
    StandingService,
    CompetitorsService,
    CostOverviewService,
    OtherCostService
  ]
})
export class AppModule {
}
