import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddCostPage} from './add-cost';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AddCostPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCostPage),
    ComponentsModule
  ],
})
export class AddCostPageModule {
}
