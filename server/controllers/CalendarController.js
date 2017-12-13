"use strict";

var apiService = require('../services/ApiService'),
      config = require('../config/config'),
      Calendar = require('mongoose').model('Calendar');

//once a day, and once every hour in the weekend, we will fetch the calender and its results from the api

var CalendarQueue = {

      queue: [],

      enqueue: function (queueElement) {
            CalendarQueue.queue.push(queueElement);
      },

      dequeue: function () {
            return CalendarQueue.queue.shift();
      },

      emptyTheQueue: function (callback) {

            var loopOverQueue = function (queueElement) {

                  if (!queueElement) {
                        Calendar.findOne().exec(function (err, calendar) {
                              if (err || !calendar) {
                                    return callback({msg: 'No calendar found'});
                              }

                              return callback(null, calendar);

                        });

                  } else {

                        setTimeout(function () {

                              queueElement()
                                    .then(function () {
                                          loopOverQueue(CalendarQueue.dequeue());
                                    })
                                    .catch(function (error) {
                                          loopOverQueue(CalendarQueue.dequeue());
                                    });

                        }, config.timeToWaitBetweenCalls);
                  }

            };

            loopOverQueue(CalendarQueue.dequeue());

      }


};

var CalendarHelper = {

      getCalendarOfCompetition: function (competition) {
            return function () {
                  return new Promise(function (resolve, reject) {

                        apiService.makeApiCall('/nl/tournaments/' + competition + '/schedule.json?api_key=' + config.api_key, 'GET', function (err, response) {

                              if (err || !response || !response.sport_events) {
                                    return reject({msg: 'No calendar found'});
                              }

                              Calendar.findOne().exec(function (err, calendar) {
                                    if (err || !calendar) {
                                          return reject({msg: 'No calendar found'});
                                    }

                                    response.sport_events.forEach(function (sportEvent) {

                                          var competitors = [];

                                          sportEvent.competitors.forEach(function (competitor) {
                                                competitors.push({
                                                      id: competitor.id,
                                                      name: competitor.name,
                                                      qualifier: competitor.qualifier
                                                });
                                          });

                                          calendar.matches.push({
                                                id: sportEvent.id,
                                                time: sportEvent.scheduled,
                                                season: sportEvent.season.year,
                                                competitors: competitors
                                          });
                                    });

                                    calendar.save();

                                    resolve();
                              });


                        });
                  });
            }
      },

      getResultsOfCompetition: function (competition) {
            return function () {
                  return new Promise(function (resolve, reject) {

                        apiService.makeApiCall('/nl/tournaments/' + competition + '/results.json?api_key=' + config.api_key, 'GET', function (err, response) {
                              if (err || !response || !response.results) {
                                    return reject({msg: 'No results found'});
                              }

                              Calendar.findOne().exec(function (err, calendar) {
                                    if (err || !calendar) {
                                          return reject({msg: 'No calendar found'});
                                    }
                                    for (var i = 0; i < response.results.length; i++) {

                                          var result = response.results[i];

                                          if (!result.sport_event || !result.sport_event.id) {
                                                continue;
                                          }

                                          var findIndexOfResultInCalendarMatch = calendar.matches.findIndex(function (match) {
                                                return match.id === result.sport_event.id;
                                          });

                                          if (findIndexOfResultInCalendarMatch == -1) {
                                                continue;
                                          }
                                          calendar.matches[findIndexOfResultInCalendarMatch].result = {
                                                home: result.sport_event_status.home_score,
                                                away: result.sport_event_status.away_score,
                                                ended: result.sport_event_status.match_status === "ended"
                                          }

                                    }
                                    calendar.save();
                                    resolve();

                              });

                        });
                  });
            }
      }

};

var CalenderController = {

      //calendar is every competition
      getCalendars: function (callback) {

            Calendar.remove({}).exec(); //remove all the rest calendars (should be one)

            var calendar = new Calendar();
            calendar.matches = [];

            calendar.save();

            for (var competition in config.competitions) {
                  CalendarQueue.enqueue(CalendarHelper.getCalendarOfCompetition(config.competitions[competition]));

                  CalendarQueue.enqueue(CalendarHelper.getResultsOfCompetition(config.competitions[competition]));
            }

            CalendarQueue.emptyTheQueue(callback);

      },

      //when no values in the db, fetch, else, return the values from the db
      returnCalendarForAllCompetitions: function (req, res) {

            Calendar.findOne().exec(function (err, calendar) {
                  if (calendar) {
                        return res.status(200).send(calendar.sanitize());
                  }

                  CalenderController.getCalendars(function () {
                        Calendar.findOne().exec(function (err, calendar) {

                              if (calendar) {
                                    return res.status(200).send(calendar.sanitize());
                              }
                              return res.status(400).send(err);
                        });
                  });

            });

      },

      returnCalendarFreshFromServer: function (req, res) {
            CalenderController.fetchCalendar(function (err, calendar) {
                  if (err) {
                        return req.status(400).send(err);
                  }
                  return res.status(200).send(calendar.sanitize());
            });
      }

};

module.exports = {

      getCalendar: CalenderController.returnCalendarForAllCompetitions,
      getCalendarFreshFromServer: CalenderController.returnCalendarFreshFromServer,

      reFetchCalendar: CalenderController.getCalendars
};