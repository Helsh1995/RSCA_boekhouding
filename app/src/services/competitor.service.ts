import {CalendarService} from "./calendar.service";
import {Injectable} from "@angular/core";
import {Competitor} from "../domains/competitor.domain";
import {Calendar} from "../domains/calendar.domain";
import {Match} from "../domains/match.domain";
import {CONFIG} from "../config/config";

@Injectable()
export class CompetitorsService {

  constructor(private calendarService: CalendarService) {

  }

  public getCompetitorsForAnderlecht(callback): void {

    let output = [];

    this.calendarService.getCalendar((err, calendar: Calendar) => {

      if (calendar) {
        calendar.matches.forEach((match: Match) => {

          if (match.isAnderlechtMatch()) {

            let getCompetitorThatIsNotAnderlecht = match.competitors.find(competitor => competitor.id != CONFIG.ANDERLECHT_ID);

            if (getCompetitorThatIsNotAnderlecht) {
              let findCompetitorInOutput = output.find(competitor => competitor == getCompetitorThatIsNotAnderlecht.name);

              if (!findCompetitorInOutput) {
                output.push(getCompetitorThatIsNotAnderlecht.name);
              }
            }
          }
        });
      }

      output.sort((a: string, b: string) => {
        return a > b ? 1 : a < b ? -1 : 0;
      });

      callback(output);
    });
  }
}
