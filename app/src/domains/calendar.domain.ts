import {Match} from "./match.domain";

export class Calendar {

  id: string;
  name: string;
  matches: Match[];

  constructor(data) {

    this.id = data.id;
    this.name = data.name;
    this.matches = data.matches.map(match => new Match(match));

  }

}
