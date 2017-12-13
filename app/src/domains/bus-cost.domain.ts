/**
 * Created by shawnhellinckx on 24/08/2017.
 */

import *as moment from 'moment';
import {Validatable} from "./validatable";
import {IsNotEmpty, validate, Matches, IsPositive, Min} from "class-validator";
import {CONFIG} from "../config/config";
import {Cost} from "./cost-domain";


export class BusCost implements Validatable, Cost {

  id: string;

  @IsNotEmpty({message: "Mag niet leeg zijn"})
  @Matches(/(\d{4}-(0[1-9]|1[0-2])-([012]\d|3[01]))/)
  date: string;

  @IsNotEmpty({message: "Mag niet leeg zijn"})
  competitor: string;

  @IsNotEmpty({message: "Mag niet leeg zijn"})
  @Min(0, {message: 'Moet minstens 0 zijn.'})
  amountOfMembers: number;

  @IsNotEmpty({message: "Mag niet leeg zijn"})
  @IsPositive({message: "Moet positief zijn"})
  costMember: number;

  @IsNotEmpty({message: "Mag niet leeg zijn"})
  @Min(0, {message: 'Moet minstens 0 zijn.'})
  amountOfNoneMembers: number;

  @IsNotEmpty({message: "Mag niet leeg zijn"})
  @IsPositive({message: "Moet positief zijn"})
  costNoneMember: number;

  @IsNotEmpty({message: "Mag niet leeg zijn"})
  @Min(0, {message: 'Moet minstens 0 zijn.'})
  amountOfKids: number;

  @IsNotEmpty({message: "Mag niet leeg zijn"})
  @IsPositive({message: "Moet positief zijn"})
  costKid: number;

  @IsNotEmpty({message: "Mag niet leeg zijn"})
  @Min(0, {message: 'Moet minstens 0 zijn.'})
  amountOfJupilers: number;

  @IsNotEmpty({message: "Mag niet leeg zijn"})
  @IsPositive({message: "Moet positief zijn"})
  costJupiler: number;

  @IsNotEmpty({message: "Mag niet leeg zijn"})
  @Min(0, {message: 'Moet minstens 0 zijn.'})
  amountOfColas: number;

  @IsNotEmpty({message: "Mag niet leeg zijn"})
  @IsPositive({message: "Moet positief zijn"})
  costCola: number;

  @IsNotEmpty({message: "Mag niet leeg zijn"})
  @Min(0, {message: 'Moet minstens 0 zijn.'})
  driverCost: number;

  @IsNotEmpty({message: "Mag niet leeg zijn"})
  @Min(0, {message: 'Moet minstens 0 zijn.'})
  busCost: number;

  constructor(data?) {

    this.date = moment().format(CONFIG.DATE_FORMAT_INPUT);
    this.competitor = '';

    this.amountOfMembers = 0;
    this.costMember = 0;

    this.amountOfNoneMembers = 0;
    this.costNoneMember = 0;

    this.amountOfKids = 0;
    this.costKid = 0;

    this.amountOfJupilers = 0;
    this.costJupiler = 0;

    this.amountOfColas = 0;
    this.costCola = 0;

    this.driverCost = 0;
    this.busCost = 0;

    if (data) {
      this.id = data.id;
      this.date = moment(data.date).format(CONFIG.DATE_FORMAT_INPUT);
      this.competitor = data.competitor;

      this.amountOfMembers = data.amountOfMembers;
      this.costMember = data.costMember;

      this.amountOfNoneMembers = data.amountOfNoneMembers;
      this.costNoneMember = data.costNoneMember;

      this.amountOfKids = data.amountOfKids;
      this.costKid = data.costKid;

      this.amountOfJupilers = data.amountOfJupilers;
      this.costJupiler = data.costJupiler;

      this.amountOfColas = data.amountOfColas;
      this.costCola = data.costCola;

      this.driverCost = data.driverCost;
      this.busCost = data.busCost;
    }

  }

  public getProfit(): number {
    return Math.round((this._incomeGame() - this._costGame()) * 100) / 100;
  }

  public getDate(): string {
    return moment(this.date).format(CONFIG.DATE_FORMAT);
  }

  public getDisplayInformation(): string {
    return this.competitor;
  }

  public validate(): Promise<any> {
    return validate(this);
  }

  public toServerObject(): any {

    return {
      competitor: this.competitor,
      amountOfMembers: this.amountOfMembers,
      costMember: this.costMember,
      amountOfNoneMembers: this.amountOfNoneMembers,
      costNoneMember: this.costNoneMember,
      amountOfKids: this.amountOfKids,
      costKid: this.costKid,
      amountOfJupilers: this.amountOfJupilers,
      costJupiler: this.costJupiler,
      amountOfColas: this.amountOfColas,
      costCola: this.costCola,
      driverCost: this.driverCost,
      busCost: this.busCost,
      date: moment(this.date).format(CONFIG.DATE_FORMAT_FOR_SERVER)
    }

  }


  private _getProfitAllUsers(): number {
    return (this.amountOfMembers * this.costMember) + (this.amountOfNoneMembers * this.costNoneMember) + (this.amountOfKids * this.costKid);
  }

  private _incomeDrinks(): number {
    return (this.amountOfJupilers + this.amountOfColas) * 1.2;
  }

  private _costOfDrinks(): number {
    return (this.amountOfJupilers * this.costJupiler / 24) + (this.amountOfColas * this.costCola / 8);
  }

  private _incomeGame(): number {
    return this._incomeDrinks() + this._incomeBus();
  }

  private _costGame(): number {
    return this.busCost + this._costOfDrinks();
  }

  private _incomeBus(): number {
    return this._getProfitAllUsers() - this.driverCost;
  }
}
