import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BusCost} from "../../domains/bus-cost.domain";
import {OtherCost} from "../../domains/other-cost.domain";
import {ValidationError} from "class-validator";
import {OtherCostService} from "../../services/costs/other-cost.service";

@IonicPage()
@Component({
  selector: 'page-add-cost',
  templateUrl: 'add-cost.html',
})
export class AddCostPage {

  public selectedTab: SelectedTab;

  public busCost: BusCost;
  private _isBusCostEdit: boolean;

  public otherCost: OtherCost;
  private _isOtherCostEdit: boolean;

  public errors: ValidationError[];

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private otherCostService: OtherCostService) {

    let cost = this.navParams.get('cost');

    this.busCost = new BusCost();
    this.otherCost = new OtherCost();

    if (cost) {

      if (cost instanceof BusCost) {
        this._isBusCostEdit = true;
        this.busCost = cost;
      }

      if (cost instanceof OtherCost) {
        this._isOtherCostEdit = true;
        this.otherCost = cost;
      }

    }

    this.selectedTab = 'bus';
    if (this._isOtherCostEdit) {
      this.selectedTab = 'other';
    }
  }

  public switchTab(tab: SelectedTab): void {
    if (!this._isBusCostEdit && !this._isOtherCostEdit) {
      this.selectedTab = tab;
    }
  }

  public goBack(): void {
    this.navCtrl.pop();
  }

  public saveCost(): void {

    let callbackSaveCost = (err, successful) => {
      if (err) {
        return;
      }

      this.navCtrl.pop();
    };

    if (this.selectedTab == 'bus') {

      this.busCost.validate().then((errors) => {

        this.errors = errors;
        if (errors.length) {
          return;
        }

        this._isBusCostEdit ? this.otherCostService.putBusCost(this.busCost, callbackSaveCost) : this.otherCostService.postNewBusCost(this.busCost, callbackSaveCost);

      });
    }

    if (this.selectedTab == 'other') {

      this.otherCost.validate().then((errors) => {
        this.errors = errors;

        if (errors.length) {
          return;
        }

        this._isOtherCostEdit ? this.otherCostService.putOtherCost(this.otherCost, callbackSaveCost) : this.otherCostService.postNewOtherCost(this.otherCost, callbackSaveCost);
      });

    }

  }

}

type SelectedTab = 'bus' | 'other';
