"use strict";

var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var CalendarSchema = Schema({

      matches: [{
            id: String,
            competitionId: String,
            time: Date, //time of the start of the match
            season: String, //year of the season
            competitors: [{
                  id: String,
                  name: String,
                  qualifier: String// HOME or AWAY
            }],
            result: {
                  home: Number,
                  away: Number,
                  ended: Boolean
            }
      }]

});

CalendarSchema.methods.sanitize = function () {

      var matches = [];

      this.matches.forEach(function (match) {

            var competitors = [];

            match.competitors.forEach(function (competitor) {
                  competitors.push({
                        id: competitor.id,
                        name: competitor.name,
                        qualifier: competitor.qualifier
                  })
            });

            matches.push({
                  id: match.id,
                  competitionId: match.competitionId,
                  time: match.time,
                  season: match.season,
                  competitors: competitors,
                  result: {
                        home: match.result.home,
                        away: match.result.away,
                        ended: match.result.ended
                  }
            })

      });

      matches.sort(function (a, b) {
            return new Date(a.time) - new Date(b.time);
      });

      return {
            id: this._id,
            matches: matches
      };

};

mongoose.model('Calendar', CalendarSchema);