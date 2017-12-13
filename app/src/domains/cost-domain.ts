/**
 * Created by shawnhellinckx on 28/08/2017.
 */

export interface Cost {

  id: string;

  getDate(): string;

  getDisplayInformation(): string;

  getProfit(): number;

}
