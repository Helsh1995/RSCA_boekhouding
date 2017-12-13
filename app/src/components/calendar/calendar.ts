import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../../services/calendar.service";
import {Calendar} from "../../domains/calendar.domain";
import {Match} from "../../domains/match.domain";
import * as moment from 'moment';
import {CONFIG} from "../../config/config";

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class CalendarComponent implements OnInit {

  public calendar: Calendar;
  public matches: CalenderMapToView[];

  public visibleMatches: CalenderMapToView[];

  public canGoToNextDay: boolean;
  public canGoToPrevDay: boolean;

  private _amount_of_days_to_show: number;

  constructor(private calendarService: CalendarService) {
    this.matches = [];
    this.visibleMatches = [];

    let self = this;

    window.onresize = function () {
      self._getAmountOfMatchDaysThatCanBeDisplayed();
      self._initVisibleMatches();
    }
  }

  //get the windows size: if the size of the window is SMALL, we will not show the content
  public ngOnInit(): void {
    this._getAmountOfMatchDaysThatCanBeDisplayed();
    this.fetchCalendar();
  }

  public fetchCalendar(): void {
    this.calendarService.getCalendar((err, calendar) => {
      if (err) {
        return;
      }
      this.calendar = calendar;

      this._mapMatchesToCalenderMapToView();
    });
  }

  private _mapMatchesToCalenderMapToView(): void {
    this.matches = [];

    if (this.calendar && this.calendar.matches) {

      this.calendar.matches.forEach((match) => {
        let findIndexDayInMatches = this.matches.findIndex(matchAndDay => matchAndDay.day.isSame(match.time, 'd'));

        //not yet added
        if (findIndexDayInMatches == -1) {
          this.matches.push({
            day: match.time,
            matches: [match]
          });
        }

        //already added, so add the match also
        if (findIndexDayInMatches != -1) {
          this.matches[findIndexDayInMatches].matches.push(match);
        }
      });
    }

    this._initVisibleMatches();
  }

  private _initVisibleMatches(): void {

    this.visibleMatches = [];

    for (let i = 0; i < this._amount_of_days_to_show; i++) {

      let findIndexOfTodayOrNextMatchToPlay = this.matches.findIndex(item => item.day.isSameOrAfter(moment(), 'd'));
      let index = findIndexOfTodayOrNextMatchToPlay > -1 ? findIndexOfTodayOrNextMatchToPlay + i : i;

      if (this.matches[index]) {
        this.visibleMatches.push(this.matches[index]);
      }
    }

    this._canGoToPrevOrToNext();
  }

  public showNext(): void {
    this._canGoToPrevOrToNext();

    if (this.canGoToNextDay) {

      let nextElementToAddInTheVisibleList = this._getNextItemToAddToTheVisbileList();

      if (nextElementToAddInTheVisibleList) {
        this.visibleMatches.shift();
        this.visibleMatches.push(nextElementToAddInTheVisibleList);

      }
    }

    this._canGoToPrevOrToNext();
  }

  public showPrev(): void {
    this._canGoToPrevOrToNext();

    if (this.canGoToPrevDay) {

      let prevElementToAddInTheVisibleList = this._getPrevItemToAddToTheVisbileList();

      if (prevElementToAddInTheVisibleList) {
        this.visibleMatches.pop();
        this.visibleMatches.unshift(prevElementToAddInTheVisibleList);
      }
    }

    this._canGoToPrevOrToNext();
  }

  public getDateInCorrectFormat(date: moment.Moment): string {
    return date.format(CONFIG.DATE_FORMAT);
  }

  private _canGoToPrevOrToNext(): void {

    this.canGoToPrevDay = this._getPrevItemToAddToTheVisbileList() != null;
    this.canGoToNextDay = this._getNextItemToAddToTheVisbileList() != null;
  }

  /*

   PREVIOUS: functions to determine the previous item to show

   */

  private _getIndexFirstVisibleItemInMatchesList(): number {
    let firstItemInTheVisibleList = this.visibleMatches[0];

    if (!firstItemInTheVisibleList) {
      return -1;
    }

    return this.matches.findIndex(item => item.day.isSame(firstItemInTheVisibleList.day, 'd'));
  }

  private _getPrevItemToAddToTheVisbileList(): CalenderMapToView {
    let index = this._getIndexFirstVisibleItemInMatchesList();

    if (index == -1) {
      return null;
    }
    return this.matches[index - 1];
  }

  /*

   NEXT: functions to determine the next item to show

   */

  private _getIndexLastVisibleItemInMatchesList(): number {
    let lastItemInTheVisibleList = this.visibleMatches[this.visibleMatches.length - 1];
    if (!lastItemInTheVisibleList) {
      return -1;
    }

    return this.matches.findIndex(item => item.day.isSame(lastItemInTheVisibleList.day, 'd'));
  }

  private _getNextItemToAddToTheVisbileList(): CalenderMapToView {
    let index = this._getIndexLastVisibleItemInMatchesList();

    if (index == -1) {
      return null;
    }
    return this.matches[index + 1];
  }

  private _getAmountOfMatchDaysThatCanBeDisplayed(): void {
    this._amount_of_days_to_show = Math.floor(window.innerWidth / CONFIG.MATCH_COMPONENT_WIDTH);
  }

}

interface CalenderMapToView {
  day: moment.Moment,
  matches: Match[]
}

