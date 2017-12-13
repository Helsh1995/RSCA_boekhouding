import {NgModule} from '@angular/core';
import {CalendarComponent} from './calendar/calendar';
import {MatchComponent} from "./calendar/components/match.component/match.component";
import {CommonModule} from "@angular/common";
import {IonicModule} from "ionic-angular";
import { StandComponent } from './stand/stand';
import { HeaderComponent } from './header/header';
import { AddBusCostComponent } from './add-bus-cost/add-bus-cost';
import { AddOtherCostComponent } from './add-other-cost/add-other-cost';
import { CostRowComponent } from './cost-row/cost-row';

@NgModule({
  declarations: [
    CalendarComponent,
    MatchComponent,
    StandComponent,
    HeaderComponent,
    AddBusCostComponent,
    AddOtherCostComponent,
    CostRowComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CalendarComponent,
    MatchComponent,
    StandComponent,
    HeaderComponent,
    AddBusCostComponent,
    AddOtherCostComponent,
    CostRowComponent
  ]
})
export class ComponentsModule {
}
