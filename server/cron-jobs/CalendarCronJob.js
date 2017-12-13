"use strict";

var cron = require('node-cron');
var moment = require('moment');
var CalendarController = require('../controllers/CalendarController');
var StandingController = require('../controllers/StandingController');

var CalendarCronJob = {

      cronJobs: [],
      calendar: {},

      getCalendar: function (callback) {
            CalendarController.reFetchCalendar(callback);
      },

      getStandings: function (callback) {
            StandingController.fetchStandings(callback);
      }

};

/*
 * todo: cron jobs dynamically: only fetch the results again when a match has ended
 * fetch calendar only once a week
 * fetch the result every time a match has ended ( +- 2h after the match has finished
 */
module.exports = {

      startCalendarCronJob: function () {

            CalendarCronJob.getCalendar(function (err, calendar) {

                  if (calendar) {

                        CalendarCronJob.calendar = calendar;
                        calendar.matches.forEach(function (calendarItem) {
                              var time = moment(calendarItem.time);
                              var cronJobString = time.second() + ' ' + time.minute() + ' ' + (time.hour() + 2) + ' ' + time.date() + ' ' + (time.month() + 1) + ' *';

                              var findCurrentCronJob = CalendarCronJob.cronJobs.find(function (item) {
                                    return item === cronJobString;
                              });

                              if (!findCurrentCronJob) {
                                    CalendarCronJob.cronJobs.push(cronJobString);
                                    cron.schedule(cronJobString, function () {

                                          console.log("=============== FETCH RESULTS ===============", cronJobString);

                                          CalendarCronJob.getCalendar(function () {
                                                setTimeout(function () {
                                                      CalendarCronJob.getStandings(function () {
                                                      });
                                                }, 1000);
                                          });

                                    });
                              }
                        });
                  }

            });


            /*

             seconds minutes hours dayOfTheMonth month dayOfTheWeek

             elke 0de seconde ==> elke minuut
             elke 0de minuut ==> elk uur

             * * * * * *
             */
      }

};