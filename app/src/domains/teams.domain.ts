/**
 * Created by shawnhellinckx on 23/08/2017.
 */

export class Team {

  id: string;
  name: string;
  rank: number;
  wins: number;
  draws: number;
  losses: number;
  goals: {
    made: number,
    against: number,
  };
  points: number;
  amountOfMatchesPlayed: number;

  constructor(data) {

    this.id = data.id;
    this.name = data.name;
    this.rank = data.rank;

    this.wins = data.wins;
    this.draws = data.draws;
    this.losses = data.losses;
    this.amountOfMatchesPlayed = this.wins + this.draws + this.losses;

    this.goals = data.goals;
    this.points = data.points;

  }

}
