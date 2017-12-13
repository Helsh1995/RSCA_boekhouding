import {Validatable} from "./validatable";
import {IsNotEmpty, validate, Matches, Min} from "class-validator";
import *as moment from 'moment';
import {CONFIG} from "../config/config";
import {Cost} from "./cost-domain";

export class OtherCost implements Validatable, Cost {

  id: string;

  @Matches(/(\d{4}-(0[1-9]|1[0-2])-([012]\d|3[01]))/)
  date: string;

  reason: string;

  @IsNotEmpty({message: "Mag niet leeg zijn"})
  @Min(0, {message: 'Moet minstens 0 zijn.'})
  amount: number;

  isProfit: boolean;

  constructor(data?) {
    this.date = moment().format(CONFIG.DATE_FORMAT_INPUT);
    this.reason = '';
    this.amount = 0;

    if (data) {
      this.id = data.id;

      this.date = moment(data.date).format(CONFIG.DATE_FORMAT_INPUT);
      this.reason = data.reason;

      let amount = data.amount;
      this.amount = Math.abs(amount);
      this.isProfit = amount > 0;

    }
  }

  public getProfit(): number {
    return this.isProfit ? this.amount : this.amount * -1;
  }

  public getDate(): string {
    return moment(this.date).format(CONFIG.DATE_FORMAT);
  }

  public getDisplayInformation(): string {
    return this.reason;
  }

  public validate(): Promise<any> {
    return validate(this);
  }

  public toServerObject(): any {
    return {

      date: moment(this.date).format(CONFIG.DATE_FORMAT_FOR_SERVER),
      reason: this.reason,
      amount: this.isProfit ? this.amount : this.amount * -1

    }
  }
}
