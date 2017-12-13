import {Team} from "./teams.domain";

export class Standing {

  teams: Team[];

  constructor(data) {

    this.teams = data.teams ? data.teams.map(team => new Team(team)) : [];

  }
}
