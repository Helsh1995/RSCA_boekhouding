import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CostOverviewPage} from './cost-overview';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    CostOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CostOverviewPage),
    ComponentsModule
  ],
})
export class CostOverviewPageModule {
}
