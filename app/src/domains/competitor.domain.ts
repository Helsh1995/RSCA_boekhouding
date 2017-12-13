type Qualifier = 'home' | 'away';

export class Competitor {

  id: string;
  name: string;
  qualifier: Qualifier;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.qualifier = data.qualifier;
  }

}
